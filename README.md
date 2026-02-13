# Shells Retirement Advisor

AI-powered retirement planning application built with Next.js, TypeScript, and Claude.

## Features

- 📊 Portfolio projection with Monte Carlo simulation
- 🏥 Healthcare cost estimation (pre/post Medicare)
- 🌍 Location-based cost of living analysis
- 🤖 AI-generated lifestyle descriptions
- 📈 Multiple withdrawal strategy modeling
- 🔄 Scenario comparison tools

## Tech Stack

- **Frontend**: Next.js 14, React, Tailwind CSS, shadcn/ui
- **Backend**: tRPC, NextAuth.js
- **Database**: PostgreSQL (Supabase), Prisma ORM
- **AI**: Anthropic Claude 3.5 Sonnet
- **Monorepo**: Turborepo, pnpm

## Getting Started

```bash
# Install dependencies
pnpm install

# Set up environment
cp .env.example .env.local
# Edit .env.local with your credentials

# Generate Prisma client
pnpm db:generate

# Run database migrations
pnpm db:migrate

# Seed database
pnpm db:seed

# Start development server
pnpm dev
```

## Project Structure

```
├── apps/web/                 # Next.js web application
├── packages/
│   ├── types/               # Shared TypeScript types
│   ├── database/            # Prisma schema and client
│   ├── api/                 # tRPC API routes
│   ├── calculations/        # Financial calculation engine
│   └── ai/                  # AI integration (Claude)
└── docs/                    # Documentation
```

## Development

```bash
# Run all tests
pnpm test

# Type check
pnpm type-check

# Lint
pnpm lint

# Build for production
pnpm build
```

## License

MIT
