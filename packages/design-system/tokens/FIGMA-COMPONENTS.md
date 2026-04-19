# Figma Components

Paste this into Claude Code to create the base component set.
Run AFTER Variables and Text Styles are already in Figma.

Context: This is a product designer's AI-native portfolio.
Hiring managers are the audience. Components should feel frontier
AI company quality — dark, minimal, precise (Linear/Vercel/Anthropic level).

---

## Prompt — paste into Claude Code

```
Using the Figma MCP, open my file "AI Native Design System" and create
a Components page. On that page, build the following components using
the Variables and Text Styles already in the file.

All components must:
- Use color Variables (not hardcoded hex values)
- Use Text Styles from the type system
- Be auto-layout based
- Have proper padding using spacing values from the Variables
- Be dark mode by default

─────────────────────────────────────────
1. BUTTON
─────────────────────────────────────────
Three variants: Primary, Secondary, Ghost

Primary:
  - Background: color/accent (brand-400 in dark)
  - Text: color/accent-on (white)
  - Height: 36px, padding horizontal: 16px
  - Border radius: radius-md (8px)
  - Label/L text style, weight 500

Secondary:
  - Background: transparent
  - Border: 1px, color/border-strong
  - Text: color/text-primary
  - Same size as Primary

Ghost:
  - Background: transparent, no border
  - Text: color/text-secondary
  - On hover: color/surface-hover background

─────────────────────────────────────────
2. BADGE / STATUS CHIP
─────────────────────────────────────────
Four variants: Success, Warning, Error, Info

Each badge:
  - Background: color/[status]-surface
  - Text + dot: color/[status]-text
  - Height: 22px, padding horizontal: 10px
  - Border radius: radius-full (999px)
  - Small dot (6px) on left + Label/M text style
  - Filled style only (no outline)

─────────────────────────────────────────
3. TAG
─────────────────────────────────────────
Simple neutral label for categorizing work/skills

  - Background: color/surface
  - Border: 1px color/border-subtle
  - Text: color/text-secondary
  - Height: 22px, padding horizontal: 8px
  - Border radius: radius-full
  - Label/M text style

─────────────────────────────────────────
4. CARD
─────────────────────────────────────────
Case study card for the portfolio homepage

  - Background: color/surface
  - Border: 1px color/border-subtle
  - Border radius: radius-xl (16px)
  - Padding: 24px
  - Width: 360px, auto height
  - Auto layout vertical, gap: 16px
  - Contains:
      · Image placeholder (full width, 200px tall, radius-lg, bg: color/surface-raised)
      · Company label (Label/S, color/text-tertiary)
      · Title (Display/M text style, color/text-primary)
      · Description (Body/S, color/text-secondary, 2 lines max)
      · Bottom row: Tag(s) on left, arrow icon on right

─────────────────────────────────────────
5. INPUT
─────────────────────────────────────────
Text input for any forms or search

  - Background: color/bg-sunken
  - Border: 1px color/border, on focus: color/accent
  - Text: color/text-primary, placeholder: color/text-tertiary
  - Height: 36px, padding horizontal: 12px
  - Border radius: radius-md (8px)
  - Body/S text style

─────────────────────────────────────────
6. AVATAR
─────────────────────────────────────────
User avatar — circle with initials fallback

  - Shape: circle (border-radius full)
  - Size: 32px × 32px
  - Background: color/accent-surface
  - Text: color/accent-text, Label/M style
  - Show "ZZ" as default initials

─────────────────────────────────────────
7. DIVIDER
─────────────────────────────────────────
Horizontal separator

  - Height: 1px
  - Width: fill container
  - Color: color/border-subtle

─────────────────────────────────────────
8. NAV
─────────────────────────────────────────
Top navigation bar for the portfolio site

  - Background: color/bg with blur backdrop suggestion
  - Border bottom: 1px color/border-subtle
  - Height: 56px, padding horizontal: 40px
  - Auto layout horizontal, space-between
  - Left: "Zoe Zhai" in Body/M weight 500, color/text-primary
  - Right: Ghost buttons — "Work", "System", "Contact"
  - Rightmost: Primary button "Resume"

─────────────────────────────────────────

After building all components:
1. Confirm component count
2. List component names exactly as created in Figma
3. Note any Variables or Text Styles that were missing and had to be hardcoded
```
