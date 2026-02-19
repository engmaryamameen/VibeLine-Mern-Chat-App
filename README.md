# VibeLine Monorepo

Production-oriented chat platform scaffold with a domain-first monorepo layout.

## Workspace

```txt
vibeline/
  apps/
    web/      Next.js chat app
    admin/    Next.js operations console
    server/   Fastify API + Socket.IO gateway
  packages/
    ui/       Shared component primitives
    config/   Shared tsconfig/eslint/prettier presets
    types/    Shared DTO and socket contracts
    utils/    Shared helpers
    constants/ Shared constants
  infra/
    docker/
    nginx/
    ci/
  docs/
  scripts/
```

## Quick Start

1. Install dependencies:

```bash
pnpm install
```

2. Copy env file:

```bash
cp .env.example .env
```

3. Run all apps:

```bash
pnpm dev
```

## Commands

- `pnpm dev`: Run all apps in watch mode
- `pnpm build`: Build workspace
- `pnpm lint`: Lint workspace
- `pnpm typecheck`: Strict typecheck
- `pnpm format:fix`: Prettier write

## Architecture Notes

- HTTP and WebSocket transport share service-layer behavior.
- Server modules enforce `controller/service/repository` boundaries.
- Auth is JWT based with role checks for admin routes.
- Frontend uses App Router and feature-driven composition.

More detail: `docs/architecture.md`
