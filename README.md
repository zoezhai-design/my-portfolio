# Zoe Zhai — Portfolio

An AI-native portfolio built as a product, with an open design system at its core.

## Structure

```
my-portfolio/
├── apps/
│   └── portfolio/          # Next.js portfolio site
└── packages/
    └── design-system/      # Tokens + components (the shareable system)
        ├── tokens/
        │   └── tokens.css  # Auto-generated from Figma Variables via MCP
        ├── components/     # React components consuming tokens
        └── src/
```

## Stack

- **Monorepo**: pnpm workspaces
- **Portfolio site**: Next.js 14, TypeScript, Tailwind CSS
- **Design system**: CSS custom properties (tokens) + React components
- **Token pipeline**: Figma Variables → Figma MCP → Claude Code → `tokens.css`

## Getting started

```bash
# Install dependencies
pnpm install

# Run portfolio site locally
pnpm dev

# Sync design tokens from Figma (requires Figma MCP setup)
pnpm --filter design-system tokens:sync
```

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) — the design system is intentionally open.
Anyone can build on it.
