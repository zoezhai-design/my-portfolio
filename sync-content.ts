#!/usr/bin/env node
/**
 * sync-content.ts
 *
 * Fetches a Notion page and writes the structured content JSON used by
 * apps/portfolio/src/app/work/ai-resolution-center/page.tsx
 *
 * Usage:
 *   pnpm sync
 *
 * Env vars (copy .env.example → .env and fill in):
 *   NOTION_API_KEY   — your Notion integration token (secret_...)
 *   NOTION_PAGE_ID   — the Notion page ID (defaults to ai-resolution-center)
 */

import { Client } from '@notionhq/client';
import { writeFileSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';

// ─── inline .env loader (no dotenv dep needed) ───────────────────────────────

const envFile = join(process.cwd(), '.env');
if (existsSync(envFile)) {
  for (const line of readFileSync(envFile, 'utf8').split('\n')) {
    const m = line.match(/^([A-Z_][A-Z0-9_]*)\s*=\s*(.*)$/);
    if (m && !process.env[m[1]]) {
      process.env[m[1]] = m[2].trim().replace(/^["']|["']$/g, '');
    }
  }
}

// ─── config ──────────────────────────────────────────────────────────────────

const NOTION_API_KEY = process.env.NOTION_API_KEY;
const PAGE_ID        = process.env.NOTION_PAGE_ID ?? '35a779341fbf80f79c4dc56283f74c09';
const OUT_PATH       = join(process.cwd(), 'apps/portfolio/content/ai-resolution-center.content.json');

if (!NOTION_API_KEY) {
  console.error('❌  NOTION_API_KEY is not set. Copy .env.example → .env and fill in your key.');
  process.exit(1);
}

const notion = new Client({ auth: NOTION_API_KEY });

// ─── types ───────────────────────────────────────────────────────────────────

interface RichTextItem {
  plain_text: string;
  annotations?: { color?: string };
}

// ─── helpers ─────────────────────────────────────────────────────────────────

/**
 * Extract plain text from a Notion rich_text array.
 * Spans with any color annotation other than "default" are silently dropped
 * (matches the "colored spans are ignored" rule).
 */
function richToPlain(richText: RichTextItem[]): string {
  return richText
    .filter(s => !s.annotations?.color || s.annotations.color === 'default')
    .map(s => s.plain_text)
    .join('');
}

/**
 * Get the plain-text content from any Notion block that carries rich_text.
 * Returns an empty string for structural blocks (divider, image, etc.).
 */
function blockToText(block: Record<string, any>): string {
  const inner = block[block.type as string];
  if (!inner?.rich_text) return '';
  return richToPlain(inner.rich_text as RichTextItem[]);
}

/** Fetch ALL child blocks from a page, following Notion pagination. */
async function fetchAllBlocks(pageId: string): Promise<Record<string, any>[]> {
  const results: Record<string, any>[] = [];
  let cursor: string | undefined;
  do {
    const res = await notion.blocks.children.list({
      block_id: pageId,
      start_cursor: cursor,
      page_size: 100,
    });
    results.push(...(res.results as Record<string, any>[]));
    cursor = (res as any).next_cursor ?? undefined;
  } while (cursor);
  return results;
}

/** Read a single Notion property value into a plain JS value. */
function readProp(prop: Record<string, any>): any {
  if (!prop) return undefined;
  switch (prop.type) {
    case 'title':        return richToPlain(prop.title);
    case 'rich_text':    return richToPlain(prop.rich_text);
    case 'select':       return prop.select?.name ?? null;
    case 'multi_select': return (prop.multi_select as any[]).map(s => s.name);
    case 'date':         return prop.date?.start ?? null;
    case 'number':       return prop.number;
    case 'url':          return prop.url;
    default:             return undefined;
  }
}

// ─── project parser ──────────────────────────────────────────────────────────

/**
 * Build the `project` object.
 *
 * Priority 1 — Notion database properties (typed fields, available when the
 *   page lives inside a database).
 * Priority 2 — First body section (plain key: value lines before the first
 *   divider, used when the page is a standalone doc).
 */
function parseProject(
  page: Record<string, any>,
  firstSection: string[],
): Record<string, any> {
  const props: Record<string, any> = page.properties ?? {};

  // Helper: look up a property by name (case-insensitive)
  const get = (name: string): any => {
    const key = Object.keys(props).find(k => k.toLowerCase() === name.toLowerCase());
    return key ? readProp(props[key]) : undefined;
  };

  // Database page — at least a title + one other property
  if (Object.keys(props).length > 1) {
    const impact = get('impact');
    return {
      title:    get('title') ?? get('name') ?? '',
      slug:     get('slug')  ?? '',
      category: get('category') ?? '',
      role:     get('role')  ?? '',
      team:     get('team')  ?? '',
      year:     get('year')  ?? '',
      status:   get('status') ?? '',
      impact:   Array.isArray(impact) ? impact : (impact ? [impact] : []),
    };
  }

  // Standalone page — parse first section as key: value lines
  const project: Record<string, any> = {};
  for (const line of firstSection) {
    const colonIdx = line.indexOf(':');
    if (colonIdx <= 0) continue;
    const key = line.slice(0, colonIdx).trim();
    const val = line.slice(colonIdx + 1).trim();
    if (key === 'impact') {
      // Allow pipe-separated values: impact: A | B | C
      project.impact = val.split('|').map(s => s.trim()).filter(Boolean);
    } else {
      project[key] = val;
    }
  }
  return project;
}

// ─── block parser ─────────────────────────────────────────────────────────────

/**
 * Block types whose children are an `items` array, each anchored by an
 * `image:` line.  All other blocks use flat key-value fields.
 */
const ARRAY_BLOCKS = new Set(['GraphicLayoutX2', 'GraphicLayoutX3', 'GraphicLayoutX4']);

/**
 * Returns true if `line` looks like a key: value pair where `key` is a
 * camelCase identifier (no spaces, no special chars, < 25 chars).
 */
function isKeyValue(line: string): [string, string] | null {
  const colonIdx = line.indexOf(':');
  if (colonIdx <= 0 || colonIdx >= 25) return null;
  const key = line.slice(0, colonIdx).trim();
  if (!/^[a-zA-Z][a-zA-Z0-9]*$/.test(key)) return null;
  const val = line.slice(colonIdx + 1).trim();
  return [key, val];
}

/**
 * Parse a single content section (the lines between two dividers) into a
 * block object.  The first non-empty line is the block type name.
 *
 * Lines starting with "NOTE:" are ignored.
 */
function parseSection(lines: string[]): Record<string, any> | null {
  const nonEmpty = lines.map(l => l.trim()).filter(Boolean);
  if (!nonEmpty.length) return null;

  // First line = block type
  const blockType = nonEmpty[0];
  const rest = nonEmpty.slice(1).filter(l => !l.startsWith('NOTE:'));

  const block: Record<string, any> = { block: blockType };

  if (ARRAY_BLOCKS.has(blockType)) {
    // Group into items[], each starting when an `image:` key is encountered
    const items: Record<string, any>[] = [];
    let current: Record<string, any> | null = null;
    let lastItemKey = '';

    for (const line of rest) {
      const kv = isKeyValue(line);
      if (kv) {
        const [key, val] = kv;
        if (key === 'image') {
          if (current) items.push(current);
          current = { image: val };
          lastItemKey = 'image';
        } else if (current) {
          current[key] = val;
          lastItemKey = key;
        } else {
          // top-level field before any image line
          block[key] = val;
          lastItemKey = '';
        }
      } else if (current && lastItemKey) {
        // Continuation of the last field value
        current[lastItemKey] += '\n\n' + line;
      }
    }
    if (current) items.push(current);
    block.items = items;

  } else {
    // Flat key-value fields
    let lastKey = '';
    for (const line of rest) {
      const kv = isKeyValue(line);
      if (kv) {
        const [key, val] = kv;
        block[key] = val;
        lastKey = key;
      } else if (lastKey) {
        // Continuation of previous field
        block[lastKey] += '\n\n' + line;
      }
    }
  }

  return block;
}

// ─── main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log(`⬇  Fetching Notion page ${PAGE_ID} …`);

  const [page, rawBlocks] = await Promise.all([
    notion.pages.retrieve({ page_id: PAGE_ID }) as Promise<Record<string, any>>,
    fetchAllBlocks(PAGE_ID),
  ]);

  // Split blocks into sections on dividers; collect plain-text lines per section
  const sections: string[][] = [[]];
  for (const b of rawBlocks) {
    if (b.type === 'divider') {
      sections.push([]);
      continue;
    }
    const text = blockToText(b);
    if (!text) continue;
    if (text.trimStart().startsWith('NOTE:')) continue;
    sections[sections.length - 1].push(text);
  }

  // First section → project metadata
  const project = parseProject(page, sections[0]);

  // Remaining sections → content blocks (skip empty sections)
  const blocks = sections
    .slice(1)
    .map(s => parseSection(s))
    .filter((b): b is Record<string, any> => b !== null);

  const output = { project, blocks };
  writeFileSync(OUT_PATH, JSON.stringify(output, null, 2) + '\n');

  console.log(`✅  Written → ${OUT_PATH}`);
  console.log(`   ${blocks.length} block(s) synced.`);
}

main().catch(err => {
  console.error('❌  Sync failed:', (err as Error).message ?? err);
  process.exit(1);
});
