# Contributing to the Design System

This design system powers my portfolio — and it's open for anyone to build on.

## Philosophy

- Components consume tokens, never raw values
- One component = one file
- Props should be obvious without reading the code

## Adding a component

1. Fork the repo
2. Create your component in `packages/design-system/components/`
3. It must consume tokens from `tokens/tokens.css` — no hardcoded colors, spacing, or radii
4. Export it from `packages/design-system/src/index.ts`
5. Open a PR with a short description of what it does and a screenshot

## Token structure

Tokens follow a two-layer system:

- **Primitives** — raw values (`--primitive-gray-900`, `--primitive-space-4`)
- **Semantics** — purpose-mapped aliases that components use (`--color-background`, `--space-4`)

Always consume semantic tokens in components, never primitives directly.
