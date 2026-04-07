#!/bin/bash
# Run this from ~/Desktop/my-portfolio in Claude Code
# Creates the full monorepo scaffold

set -e
echo "🏗  Scaffolding my-portfolio monorepo..."

# ── Directory structure ──
mkdir -p apps/portfolio/src/app
mkdir -p packages/design-system/tokens
mkdir -p packages/design-system/src

# ── Root package.json ──
cat > package.json << 'EOF'
{
  "name": "my-portfolio",
  "private": true,
  "scripts": {
    "dev": "pnpm --filter portfolio dev",
    "build": "pnpm --filter portfolio build",
    "lint": "pnpm -r lint"
  },
  "engines": {
    "node": ">=18",
    "pnpm": ">=9"
  }
}
EOF

# ── pnpm workspace ──
cat > pnpm-workspace.yaml << 'EOF'
packages:
  - "apps/*"
  - "packages/*"
EOF

# ── .gitignore ──
cat > .gitignore << 'EOF'
node_modules
.pnp
apps/portfolio/.next/
apps/portfolio/out/
dist/
build/
*.tsbuildinfo
.env
.env.local
.env.*.local
.DS_Store
.turbo
.vercel
EOF

# ── README ──
cat > README.md << 'EOF'
# Zoe Zhai — Portfolio

AI-native portfolio built as a product, with an open design system at its core.

## Structure

```
my-portfolio/
├── apps/
│   └── portfolio/          # Next.js portfolio site
└── packages/
    └── design-system/      # Tokens + components
        ├── tokens/tokens.css   # Auto-generated from Figma Variables
        └── src/                # React components
```

## Getting started

```bash
pnpm install
pnpm dev
```
EOF

# ── CONTRIBUTING ──
cat > CONTRIBUTING.md << 'EOF'
# Contributing to the Design System

Components consume tokens, never raw values.
Always use semantic tokens (`--color-*`, `--space-*`) — never primitives directly.

## Adding a component
1. Fork the repo
2. Create component in `packages/design-system/src/components/`
3. Export from `packages/design-system/src/index.ts`
4. Open a PR with a screenshot
EOF

# ── apps/portfolio/package.json ──
cat > apps/portfolio/package.json << 'EOF'
{
  "name": "portfolio",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "^14.2.3",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "@my-portfolio/design-system": "workspace:*"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "typescript": "^5.4.5",
    "tailwindcss": "^3.4.3",
    "postcss": "^8",
    "autoprefixer": "^10"
  }
}
EOF

# ── next.config.js ──
cat > apps/portfolio/next.config.js << 'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@my-portfolio/design-system"],
};
module.exports = nextConfig;
EOF

# ── tsconfig ──
cat > apps/portfolio/tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
EOF

# ── tailwind.config.ts ──
cat > apps/portfolio/tailwind.config.ts << 'EOF'
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/design-system/src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg:             "var(--color-bg)",
        surface:        "var(--color-surface)",
        border:         "var(--color-border)",
        "text-primary": "var(--color-text-primary)",
        "text-secondary":"var(--color-text-secondary)",
        "text-tertiary": "var(--color-text-tertiary)",
        accent:         "var(--color-accent)",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      borderRadius: {
        sm:   "var(--radius-sm)",
        md:   "var(--radius-md)",
        lg:   "var(--radius-lg)",
        full: "var(--radius-full)",
      },
    },
  },
  plugins: [],
};
export default config;
EOF

# ── postcss ──
cat > apps/portfolio/postcss.config.js << 'EOF'
module.exports = { plugins: { tailwindcss: {}, autoprefixer: {} } };
EOF

# ── globals.css ──
cat > apps/portfolio/src/app/globals.css << 'EOF'
/* Design tokens — auto-generated from Figma Variables */
@import "@my-portfolio/design-system/tokens/tokens.css";

@tailwind base;
@tailwind components;
@tailwind utilities;

html {
  background-color: var(--color-bg);
  color: var(--color-text-primary);
  font-family: var(--font-sans), system-ui, sans-serif;
}
EOF

# ── layout.tsx ──
cat > apps/portfolio/src/app/layout.tsx << 'EOF'
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zoe Zhai — Product Designer",
  description: "Product designer specializing in AI-native workflows, enterprise tools, and design systems.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
EOF

# ── page.tsx ──
cat > apps/portfolio/src/app/page.tsx << 'EOF'
export default function Home() {
  return (
    <main style={{ padding: "80px 40px" }}>
      <h1>Zoe Zhai</h1>
      <p>Product Designer</p>
    </main>
  );
}
EOF

# ── design-system package.json ──
cat > packages/design-system/package.json << 'EOF'
{
  "name": "@my-portfolio/design-system",
  "version": "0.1.0",
  "private": true,
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "exports": {
    ".": "./src/index.ts",
    "./tokens/tokens.css": "./tokens/tokens.css"
  },
  "peerDependencies": {
    "react": "^18.0.0"
  }
}
EOF

# ── design-system tsconfig ──
cat > packages/design-system/tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "esnext"],
    "strict": true,
    "declaration": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*.ts", "src/**/*.tsx"],
  "exclude": ["node_modules", "dist"]
}
EOF

# ── tokens.css ──
cat > packages/design-system/tokens/tokens.css << 'EOF'
/* ─────────────────────────────────────────────────────────
   Design Tokens — @my-portfolio/design-system
   Aesthetic: frontier AI / dark minimal (Linear · Vercel · Anthropic)
   ───────────────────────────────────────────────────────── */

:root {

  /* ══ PRIMITIVES ══ */

  /* Color · Gray */
  --p-gray-0:    #ffffff;
  --p-gray-50:   #f9f9f9;
  --p-gray-100:  #f2f2f2;
  --p-gray-200:  #e0e0e0;
  --p-gray-300:  #c2c2c2;
  --p-gray-400:  #a0a0a0;
  --p-gray-500:  #7d7d7d;
  --p-gray-600:  #5c5c5c;
  --p-gray-700:  #3d3d3d;
  --p-gray-800:  #242424;
  --p-gray-850:  #1a1a1a;
  --p-gray-900:  #141414;
  --p-gray-925:  #111111;
  --p-gray-950:  #0d0d0d;
  --p-gray-975:  #080808;

  /* Color · Accent */
  --p-blue-400:  #60a5fa;
  --p-green-400: #4ade80;
  --p-red-400:   #f87171;
  --p-amber-400: #fbbf24;

  /* Spacing · 4px base */
  --p-space-1:  4px;  --p-space-2:  8px;  --p-space-3:  12px;
  --p-space-4:  16px; --p-space-5:  20px; --p-space-6:  24px;
  --p-space-8:  32px; --p-space-10: 40px; --p-space-12: 48px;
  --p-space-16: 64px; --p-space-20: 80px; --p-space-24: 96px;

  /* Radius */
  --p-radius-xs:   3px;  --p-radius-sm: 5px;
  --p-radius-md:   8px;  --p-radius-lg: 12px;
  --p-radius-xl:   16px; --p-radius-full: 9999px;

  /* Typography */
  --p-font-sans: "Inter", system-ui, -apple-system, sans-serif;
  --p-font-mono: "JetBrains Mono", "Fira Code", monospace;

  --p-text-xs:   11px; --p-text-sm:   12px; --p-text-base: 13px;
  --p-text-md:   14px; --p-text-lg:   16px; --p-text-xl:   18px;
  --p-text-2xl:  20px; --p-text-3xl:  24px; --p-text-4xl:  32px;
  --p-text-5xl:  40px; --p-text-6xl:  48px;

  --p-weight-regular:  400; --p-weight-medium:   500;
  --p-weight-semibold: 600; --p-weight-bold:     700;

  --p-leading-tight:  1.2; --p-leading-snug:   1.35;
  --p-leading-normal: 1.5; --p-leading-relaxed:1.65;

  /* Motion */
  --p-duration-fast:   100ms; --p-duration-base: 150ms;
  --p-duration-slow:   250ms; --p-duration-slower: 400ms;
  --p-ease-out:    cubic-bezier(0, 0, 0.2, 1);
  --p-ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --p-ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);

  /* ══ SEMANTICS — Dark mode ══ */

  /* Surface */
  --color-bg:             var(--p-gray-975);
  --color-bg-subtle:      var(--p-gray-950);
  --color-surface:        var(--p-gray-925);
  --color-surface-raised: var(--p-gray-900);
  --color-surface-hover:  var(--p-gray-800);

  /* Border */
  --color-border:         var(--p-gray-800);
  --color-border-subtle:  var(--p-gray-850);
  --color-border-strong:  var(--p-gray-700);

  /* Text */
  --color-text-primary:   var(--p-gray-50);
  --color-text-secondary: var(--p-gray-400);
  --color-text-tertiary:  var(--p-gray-600);

  /* Accent */
  --color-accent:         var(--p-gray-0);
  --color-accent-hover:   var(--p-gray-200);
  --color-accent-on:      var(--p-gray-975);

  /* Status */
  --color-success: var(--p-green-400);
  --color-warning: var(--p-amber-400);
  --color-error:   var(--p-red-400);
  --color-info:    var(--p-blue-400);

  /* Spacing */
  --space-1: var(--p-space-1);   --space-2: var(--p-space-2);
  --space-3: var(--p-space-3);   --space-4: var(--p-space-4);
  --space-5: var(--p-space-5);   --space-6: var(--p-space-6);
  --space-8: var(--p-space-8);   --space-10: var(--p-space-10);
  --space-12: var(--p-space-12); --space-16: var(--p-space-16);
  --space-20: var(--p-space-20); --space-24: var(--p-space-24);

  /* Radius */
  --radius-xs:   var(--p-radius-xs);  --radius-sm:  var(--p-radius-sm);
  --radius-md:   var(--p-radius-md);  --radius-lg:  var(--p-radius-lg);
  --radius-xl:   var(--p-radius-xl);  --radius-full: var(--p-radius-full);

  /* Typography */
  --font-sans: var(--p-font-sans);
  --font-mono: var(--p-font-mono);

  --text-xs:   var(--p-text-xs);  --text-sm:   var(--p-text-sm);
  --text-base: var(--p-text-base);--text-md:   var(--p-text-md);
  --text-lg:   var(--p-text-lg);  --text-xl:   var(--p-text-xl);
  --text-2xl:  var(--p-text-2xl); --text-3xl:  var(--p-text-3xl);
  --text-4xl:  var(--p-text-4xl); --text-5xl:  var(--p-text-5xl);
  --text-6xl:  var(--p-text-6xl);

  --weight-regular:  var(--p-weight-regular);
  --weight-medium:   var(--p-weight-medium);
  --weight-semibold: var(--p-weight-semibold);
  --weight-bold:     var(--p-weight-bold);

  --leading-tight:   var(--p-leading-tight);
  --leading-snug:    var(--p-leading-snug);
  --leading-normal:  var(--p-leading-normal);
  --leading-relaxed: var(--p-leading-relaxed);

  /* Motion */
  --duration-fast:   var(--p-duration-fast);
  --duration-base:   var(--p-duration-base);
  --duration-slow:   var(--p-duration-slow);
  --duration-slower: var(--p-duration-slower);
  --ease-out:        var(--p-ease-out);
  --ease-in-out:     var(--p-ease-in-out);
  --ease-spring:     var(--p-ease-spring);

  /* Shadow */
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.4);
  --shadow-md: 0 2px 8px rgba(0,0,0,0.5), 0 1px 2px rgba(0,0,0,0.3);
  --shadow-lg: 0 8px 24px rgba(0,0,0,0.6), 0 2px 4px rgba(0,0,0,0.3);
  --shadow-xl: 0 16px 48px rgba(0,0,0,0.7);

  /* Z-index */
  --z-base: 0; --z-raised: 10; --z-overlay: 100;
  --z-modal: 200; --z-toast: 300; --z-tooltip: 400;
}
EOF

# ── design-system index ──
cat > packages/design-system/src/index.ts << 'EOF'
// @my-portfolio/design-system
// Components exported here as they're built in P1
export {};
EOF

echo ""
echo "✅ Scaffold complete. Now run:"
echo ""
echo "  git init"
echo "  git add ."
echo "  git commit -m 'chore: scaffold monorepo'"
echo "  git branch -M main"
echo "  git remote add origin https://github.com/zoezhai-design/my-portfolio.git"
echo "  git push -u origin main"
echo ""
echo "Then: pnpm install && pnpm dev"
