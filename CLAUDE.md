# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Angel Funds - fullstack crowdfunding platform for tech entrepreneurs. Monorepo with Next.js frontend and Express/Apollo GraphQL backend.

## Architecture

```
client/          # Next.js 16, React 19, Chakra UI, Apollo Client
backend/         # Express 5, Apollo Server, TypeGraphQL, Prisma ORM
```

**Data flow**: React → Apollo Client → GraphQL → Prisma → PostgreSQL
**Sessions**: Express Session + Redis
**Payments**: Stripe (both client and server)

## Development Commands

### Backend (port 7777)
```bash
cd backend/
pnpm dev              # nodemon with auto-restart
pnpm watch            # TypeScript watcher (run alongside dev)
pnpm build            # compile to dist/
```

### Frontend (port 3000)
```bash
cd client/
pnpm dev              # Next.js dev server
pnpm gen              # regenerate GraphQL types (requires backend running)
pnpm build            # production build
```

### Code Quality (both directories)
```bash
pnpm lint             # lint with oxlint
pnpm lint:fix         # auto-fix lint issues
pnpm format           # check formatting with oxfmt
pnpm format:fix       # format code with oxfmt
pnpm check            # lint + format check (oxlint && oxfmt --check)
pnpm check:fix        # lint --fix + format
```

Linting config is `.oxlintrc.json`; formatting config is `.oxfmtrc.json` (per workspace).

## Key Patterns

**Path aliases** (client): `@/components/*`, `@/graphql/*`, `@/hooks/*`, `@/utils/*`, `@/types/*`, `@/generated/*`

**GraphQL codegen**: Backend schema at localhost:7777/graphql → client runs `pnpm gen` → generates `client/generated/graphql.tsx`

**DataLoaders**: Backend uses DataLoader pattern in `backend/src/dataloaders/` for N+1 query prevention

**Authentication**: Argon2 password hashing, Redis session storage, `isAuthed` middleware decorator

## Database

Prisma schema at `backend/prisma/schema.prisma`. Models: User, Project, Donation, Upvote, Reward.

## Environment Setup

Copy example env files and configure:
- `client/.example.env` → `.env` (NEXT_PUBLIC_BACKEND, Stripe keys)
- `backend/example.env` → `.env` (DATABASE_URL, Redis, Stripe, email credentials)
