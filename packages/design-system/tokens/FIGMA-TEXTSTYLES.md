# Figma Text Styles Sync

Paste this into Claude Code to create all typography as Figma Text Styles.
Run AFTER the Variables are already in Figma.

---

## Prompt — paste into Claude Code

```
Using the Figma MCP, open my file "AI Native Design System" and create
a full set of Local Text Styles organized into three categories.

Use the font "Inter" for all styles. Use "JetBrains Mono" for mono styles.
All line heights must be even numbers. All styles should be named with
slash notation for grouping.

─────────────────────────────────────────
DISPLAY styles — font weight 600
─────────────────────────────────────────
Display/2XL  →  48px, line height 56px, letter spacing -3%, weight 600
Display/XL   →  40px, line height 48px, letter spacing -3%, weight 600
Display/L    →  32px, line height 40px, letter spacing -2%, weight 600
Display/M    →  24px, line height 32px, letter spacing -2%, weight 600

─────────────────────────────────────────
BODY styles — font weight 400
─────────────────────────────────────────
Body/L  →  18px, line height 28px, letter spacing 0%, weight 400
Body/M  →  16px, line height 24px, letter spacing 0%, weight 400
Body/S  →  14px, line height 22px, letter spacing 0%, weight 400

─────────────────────────────────────────
LABEL styles
─────────────────────────────────────────
Label/L  →  12px, line height 16px, letter spacing 0%,  weight 500
Label/M  →  11px, line height 16px, letter spacing 4%,  weight 500
Label/S  →  10px, line height 14px, letter spacing 8%,  weight 700, ALL CAPS

─────────────────────────────────────────
MONO styles — font "JetBrains Mono"
─────────────────────────────────────────
Mono/M  →  12px, line height 18px, letter spacing 0%, weight 400
Mono/S  →  11px, line height 16px, letter spacing 0%, weight 400

─────────────────────────────────────────

After creating the text styles:
- Confirm how many were created
- List any fonts that couldn't be found (Inter or JetBrains Mono may need
  to be added to Figma manually via the font picker if not already available)
```
