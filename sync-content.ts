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
 *
 * Notion page conventions:
 *   • Page database properties → project object
 *   • Horizontal rules (---) separate content blocks
 *   • First line of each section = block type  (e.g. "Graphic X1", "Diagram X1")
 *   • Remaining lines = field: value pairs      (e.g. "image 1: landing-2.png")
 *   • Lines starting with NOTE: are ignored
 *   • Colored text spans are stripped
 *   • Multi-line paragraphs (Shift+Enter) are split on \n automatically
 */

import { Client } from '@notionhq/client';
import { writeFileSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';

// ─── inline .env loader ──────────────────────────────────────────────────────

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

// ─── field name mapping ──────────────────────────────────────────────────────
// Maps Notion label text (lowercase) → JSON field name.
// Handles space-separated labels with optional trailing numbers.

const FIELD_MAP: Record<string, string> = {
  // image (all numbered variants trigger a new item in array blocks)
  'image':           'image',
  'image 1':         'image',
  'image 2':         'image',
  'image 3':         'image',
  'image 4':         'image',
  // label / title
  'label':           'label',
  'label title':     'labelTitle',
  'label title 1':   'labelTitle',
  'title':           'title',
  // body variants
  'body':            'body',
  'body text 1':     'body1',
  'body text 2':     'body2',
  'body text 3':     'body3',
  'body text 4':     'body4',
  'body 1':          'body1',
  'body 2':          'body2',
  'body 3':          'body3',
  'body 4':          'body4',
  'body 5':          'body5',
  'body text 5':     'body5',
  // subtitle variants
  'subtitle':        'subtitle',
  'subtitle 1':      'subtitle1',
  'subtitle 2':      'subtitle2',
  'subtitle 3':      'subtitle3',
  'subtitle 4':      'subtitle4',
  'subtitle 5':      'subtitle5',
  // misc
  'caption':         'caption',
  'alt':             'alt',
  'alt text':        'alt',
  'slug':            'slug',
};

/** Fallback: convert "Body Text 1" → "bodyText1" */
function autoCamel(raw: string): string {
  const parts = raw.trim().split(/\s+/);
  const last = parts[parts.length - 1];
  const isNum = /^\d+$/.test(last);
  const words = isNum ? parts.slice(0, -1) : parts;
  const num   = isNum ? last : '';
  return words.map((w, i) => i === 0 ? w.toLowerCase() : w[0].toUpperCase() + w.slice(1).toLowerCase()).join('') + num;
}

function normalizeFieldName(raw: string): string {
  return FIELD_MAP[raw.trim().toLowerCase()] ?? autoCamel(raw);
}

// ─── block type normalization ─────────────────────────────────────────────────
// "Graphic X1" → "GraphicX1",  "Graphic Layout X4" → "GraphicLayoutX4"

function normalizeBlockType(raw: string): string {
  return raw.trim().split(/\s+/).map(w => w[0].toUpperCase() + w.slice(1)).join('');
}

// ─── Notion rich-text helpers ─────────────────────────────────────────────────

interface RichSpan { plain_text: string; annotations?: { color?: string } }

/** Strip color-annotated spans, return plain text. */
function richToPlain(spans: RichSpan[]): string {
  return spans
    .filter(s => !s.annotations?.color || s.annotations.color === 'default')
    .map(s => s.plain_text)
    .join('');
}

/** Extract plain text from any Notion block that has rich_text. */
function blockToText(b: Record<string, any>): string {
  const inner = b[b.type as string];
  if (!inner?.rich_text) return '';
  return richToPlain(inner.rich_text as RichSpan[]);
}

// ─── Notion pagination helper ─────────────────────────────────────────────────

async function fetchAllBlocks(pageId: string): Promise<Record<string, any>[]> {
  const results: Record<string, any>[] = [];
  let cursor: string | undefined;
  do {
    const res = await notion.blocks.children.list({ block_id: pageId, start_cursor: cursor, page_size: 100 });
    results.push(...(res.results as Record<string, any>[]));
    cursor = (res as any).next_cursor ?? undefined;
  } while (cursor);
  return results;
}

// ─── property reader ─────────────────────────────────────────────────────────

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

function parseProject(page: Record<string, any>, firstLines: string[]): Record<string, any> {
  const props: Record<string, any> = page.properties ?? {};

  const get = (name: string): any => {
    const key = Object.keys(props).find(k => k.toLowerCase() === name.toLowerCase());
    return key ? readProp(props[key]) : undefined;
  };

  // Database page (has typed properties beyond just title)
  if (Object.keys(props).length > 1) {
    const rawImpact = get('impact');
    // impact may be a rich_text string with \n-separated values
    const impact: string[] = Array.isArray(rawImpact)
      ? rawImpact
      : typeof rawImpact === 'string'
        ? rawImpact.split('\n').map((s: string) => s.trim()).filter(Boolean)
        : [];

    return {
      title:    get('title') ?? get('name') ?? '',
      slug:     get('slug')  ?? '',
      category: get('category') ?? '',
      role:     get('role')  ?? '',
      team:     get('team')  ?? '',
      year:     get('year')  ?? '',
      status:   get('status') ?? '',
      impact,
    };
  }

  // Standalone page — parse first section lines as key: value
  const project: Record<string, any> = {};
  for (const line of firstLines) {
    const colonIdx = line.indexOf(':');
    if (colonIdx <= 0) continue;
    const key = normalizeFieldName(line.slice(0, colonIdx));
    const val = line.slice(colonIdx + 1).trim();
    project[key] = key === 'impact'
      ? val.split(/[|\n]/).map((s: string) => s.trim()).filter(Boolean)
      : val;
  }
  return project;
}

// ─── image value cleaner ─────────────────────────────────────────────────────
// Handles Notion pages where the image filename and the next field are on the
// same line with no Shift+Enter between them, e.g.:
//   "flow-diagram.pngcaption : every path to resolution"
//   "happy-path.png Label Title 1: Happy path"

function splitImageVal(val: string): [string, string | null] {
  const m = val.match(/^(.+?\.(png|jpg|jpeg|webp|gif|svg|avif))\s*(.*)/i);
  if (!m || !m[3].trim()) return [val, null];
  return [m[1].trim(), m[3].trim()];
}

// ─── key:value line detector ─────────────────────────────────────────────────

/**
 * Returns [normalizedKey, value] if the line looks like a field definition,
 * or null if it's body text / continuation.
 *
 * A field key must:
 *   - Start with a letter
 *   - Contain only letters, digits, and spaces
 *   - Be ≤ 40 characters before the colon
 */
function parseKV(line: string): [string, string] | null {
  const colonIdx = line.indexOf(':');
  if (colonIdx <= 0 || colonIdx > 40) return null;
  const rawKey = line.slice(0, colonIdx).trim();
  if (!/^[a-zA-Z][\w\s]*$/.test(rawKey)) return null;
  const key = normalizeFieldName(rawKey);
  const val = line.slice(colonIdx + 1).trim();
  return [key, val];
}

// ─── block types that produce an items[] array ────────────────────────────────

const ARRAY_BLOCKS = new Set(['GraphicLayoutX2', 'GraphicLayoutX3', 'GraphicLayoutX4']);

// ─── section → block parser ───────────────────────────────────────────────────

function parseSection(lines: string[]): Record<string, any> | null {
  const rows = lines.map(l => l.trim()).filter(l => l && !l.startsWith('NOTE:'));
  if (!rows.length) return null;

  const blockType = normalizeBlockType(rows[0]);
  const rest = rows.slice(1);
  const block: Record<string, any> = { block: blockType };

  if (ARRAY_BLOCKS.has(blockType)) {
    // Group into items[], each starting on an `image` key
    const items: Record<string, any>[] = [];
    let current: Record<string, any> | null = null;
    let lastItemKey = '';

    for (const line of rest) {
      const kv = parseKV(line);
      if (kv) {
        const [key, val] = kv;
        if (key === 'image') {
          if (current) items.push(current);
          const [imgFile, extra] = splitImageVal(val);
          current = { image: imgFile };
          lastItemKey = 'image';
          if (extra) {
            const extraKV = parseKV(extra);
            if (extraKV) { current[extraKV[0]] = extraKV[1]; lastItemKey = extraKV[0]; }
          }
        } else if (current) {
          // Within an item, bodyN → body (each item has one body field)
          const itemKey = /^body\d+$/.test(key) ? 'body' : key;
          current[itemKey] = val;
          lastItemKey = itemKey;
        } else {
          block[key] = val;
          lastItemKey = '';
        }
      } else if (current && lastItemKey && lastItemKey !== 'image') {
        current[lastItemKey] += '\n\n' + line;
      }
    }
    if (current) items.push(current);
    block.items = items;

  } else {
    // Flat key-value fields; body text continuation appended to last key
    let lastKey = '';
    for (const line of rest) {
      const kv = parseKV(line);
      if (kv) {
        const [key, val] = kv;
        if (key === 'image') {
          const [imgFile, extra] = splitImageVal(val);
          block.image = imgFile;
          lastKey = 'image';
          if (extra) {
            const extraKV = parseKV(extra);
            if (extraKV) { block[extraKV[0]] = extraKV[1]; lastKey = extraKV[0]; }
          }
        } else {
          block[key] = val;
          lastKey = key;
        }
      } else if (lastKey && lastKey !== 'image') {
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

  // Collect text lines per section, split on dividers.
  // Multi-line Notion paragraphs (Shift+Enter) are expanded by splitting on \n.
  const sections: string[][] = [[]];

  for (const b of rawBlocks) {
    if (b.type === 'divider') {
      sections.push([]);
      continue;
    }
    const text = blockToText(b);
    if (!text) continue;

    // Expand multi-line paragraphs into individual lines
    for (const line of text.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed) continue;
      if (trimmed.startsWith('NOTE:')) continue;
      sections[sections.length - 1].push(trimmed);
    }
  }

  const project = parseProject(page, sections[0]);

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
