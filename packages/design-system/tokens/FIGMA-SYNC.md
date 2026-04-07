# Figma Variables Sync

Paste this prompt into Claude Code (with Figma MCP connected) to push
the full token system into your Figma file as Variables.

Run whenever `tokens.css` changes.

---

## Prompt — paste into Claude Code

```
Using the Figma MCP, open my Figma file and create a complete Variables
system from the design tokens below. Structure them across two collections:

─────────────────────────────────────────
COLLECTION 1: "Primitives"
─────────────────────────────────────────
Use slash-notation groups. All values are raw hex or px numbers.

Group: Color/Gray
  gray-0: #ffffff    gray-50: #f9f9f9    gray-100: #f2f2f2
  gray-200: #e0e0e0  gray-300: #c2c2c2  gray-400: #a0a0a0
  gray-500: #7d7d7d  gray-600: #5c5c5c  gray-700: #3d3d3d
  gray-800: #242424  gray-850: #1a1a1a  gray-900: #141414
  gray-925: #111111  gray-950: #0d0d0d  gray-975: #080808

Group: Color/Brand (Violet)
  brand-50: #f3f1ff   brand-100: #e8e4ff  brand-200: #d4ccff
  brand-300: #b8acff  brand-400: #9986fd  brand-500: #7c6af7
  brand-600: #6455e0  brand-700: #4f42b8  brand-800: #3a3088
  brand-900: #251f58  brand-950: #16123a

Group: Color/Status
  green-400: #4ade80  green-700: #15803d  green-950: #031a0a  green-50: #f0fdf4
  amber-400: #fbbf24  amber-700: #b45309  amber-950: #1a0f00  amber-50: #fffbeb
  red-400: #f87171    red-700: #b91c1c    red-950: #1a0404    red-50: #fef2f2
  blue-400: #60a5fa   blue-700: #1d4ed8   blue-950: #030e24   blue-50: #eff6ff

Group: Spacing (number type, value in px)
  4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96

Group: Radius (number type)
  sm: 4   md: 8   lg: 12   xl: 16   2xl: 24   full: 999

Group: Font/Size (number type)
  display-2xl: 48   display-xl: 40   display-l: 32   display-m: 24
  body-l: 18        body-m: 16       body-s: 14
  label-l: 12       label-m: 11      label-s: 10
  mono-m: 12        mono-s: 11

Group: Font/LineHeight (number type)
  display-2xl: 56   display-xl: 48   display-l: 40   display-m: 32
  body-l: 28        body-m: 24       body-s: 22
  label-l: 16       label-m: 16      label-s: 14
  mono-m: 18        mono-s: 16

Group: Font/Weight (number type)
  regular: 400   medium: 500   semibold: 600   bold: 700

Group: Motion/Duration (number type, ms)
  fast: 150   base: 250   slow: 400

─────────────────────────────────────────
COLLECTION 2: "Semantics"
─────────────────────────────────────────
Each variable should ALIAS the corresponding Primitive variable
(not store a raw value). Create two modes in this collection:
Mode 1: "Dark" (default)
Mode 2: "Light"

Group: Color/Background
  bg            → Dark: gray-975        Light: #ffffff (raw)
  bg-sunken     → Dark: #050505 (raw)   Light: #f5f5f5 (raw)

Group: Color/Surface
  surface        → Dark: gray-925       Light: #fafafa (raw)
  surface-raised → Dark: gray-900       Light: #f2f2f2 (raw)
  surface-hover  → Dark: gray-800       Light: #e8e8e8 (raw)

Group: Color/Border
  border         → Dark: gray-800       Light: #e0e0e0 (raw)
  border-subtle  → Dark: gray-850       Light: #ebebeb (raw)
  border-strong  → Dark: gray-700       Light: #c2c2c2 (raw)

Group: Color/Text
  text-primary   → Dark: gray-50        Light: #0d0d0d (raw)
  text-secondary → Dark: gray-400       Light: #5c5c5c (raw)
  text-tertiary  → Dark: gray-600       Light: #a0a0a0 (raw)

Group: Color/Accent
  accent         → Dark: brand-400      Light: brand-600
  accent-surface → Dark: brand-950      Light: brand-50
  accent-text    → Dark: brand-300      Light: brand-700
  accent-on      → Dark: gray-0         Light: #ffffff (raw)

Group: Color/Status
  success-text    → Dark: green-400     Light: green-700
  success-surface → Dark: green-950     Light: green-50
  warning-text    → Dark: amber-400     Light: amber-700
  warning-surface → Dark: amber-950     Light: amber-50
  error-text      → Dark: red-400       Light: red-700
  error-surface   → Dark: red-950       Light: red-50
  info-text       → Dark: blue-400      Light: blue-700
  info-surface    → Dark: blue-950      Light: blue-50

Group: Spacing (alias all primitives 1:1)
  space-4 → Spacing/4 … space-96 → Spacing/96

Group: Radius
  radius-sm → Radius/sm … radius-full → Radius/full

After creating all variables, confirm:
- Total count in Primitives collection
- Total count in Semantics collection (with both Dark + Light modes)
- Flag any variables that couldn't be expressed as aliases
```

---

## What this produces

- ~80 Primitive variables (raw values, no modes)
- ~50 Semantic variables × 2 modes (Dark + Light)
- Full Variable panel, organized by group, ready to apply in any component

## Workflow

1. You make a design decision (e.g. change brand color)
2. Update `tokens.css` in the repo
3. Run this prompt in Claude Code → Figma Variables update automatically
4. Commit the `tokens.css` change to GitHub

GitHub = source of truth. Figma = live reflection.
