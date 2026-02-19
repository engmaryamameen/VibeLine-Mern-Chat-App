# VibeLine Architecture

## Monorepo boundaries

- `apps/web`: end-user chat product (Next.js App Router)
- `apps/admin`: internal moderation and analytics surface
- `apps/server`: HTTP + WebSocket gateway with domain modules
- `packages/ui`: shared component primitives and theme tokens
- `packages/types`: cross-app contracts (DTOs, socket event maps)
- `packages/constants`: event names and route constants
- `packages/utils`: shared UI and domain utility helpers

## Server layering

Each module follows `controller -> service -> repository`.

- Controller: transport concerns (request/response)
- Service: business decisions and policy
- Repository: persistence access boundary

The current repository implementation is in-memory for bootstrapping. The `prisma` schema defines the persistence model for migration to Postgres.

## Realtime architecture

- Socket authentication uses JWT from handshake auth payload.
- HTTP and WebSocket share message service logic to keep behavior consistent.
- Event names are centralized in shared constants/types.
- `REDIS_URL` is reserved for Socket.IO adapter fanout in multi-node deployment.

## Scaling model

- Stateless API shape and token auth support horizontal replicas.
- Runtime configs are fully environment-driven.
- Docker compose includes Postgres and Redis primitives used in production topology.
- CI runs lint, typecheck, and build at workspace level.
