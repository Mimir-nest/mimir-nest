# Mimir Nest

Mimir Nest is an open-source web application for system design practice, placement preparation, and student utilities. It provides interactive architecture problem solving, placement DSA questions, course roadmaps, portfolio project templates, and productivity tools.

## Features

- System Design Playground: Interactive canvas built with React Flow (`@xyflow/react`) to construct system design diagrams, validate architectural constraints, and view reference solution workflows.
- System Design Problems & Guide: Catalog of system design problems and interview questions covering foundational to advanced distributed systems concepts.
- Placement DSA Vault: Searchable collection of data structures and algorithms questions organized by company, difficulty, and topic.
- Interview Prep: Company-specific practice questions and interview preparation tracks.
- Learning Resources: Curated computer science course lists, career roadmaps, and resume project ideas.
- Student Tools: CGPA calculator, Pomodoro focus timer, typing speed tester, and student discount directory.

## Tech Stack

- Frontend: Next.js 15 (App Router), React 18, React Flow (`@xyflow/react`), Tailwind CSS, Zustand, Framer Motion
- Backend: Express 4, Zod
- Monorepo & Tooling: pnpm Workspaces, TypeScript, ESLint 9

## Repository Structure

```text
mimir-nest/
├── apps/
│   ├── web-next/         # Next.js 15 frontend client
│   └── api/              # Express.js Content API server
├── packages/
│   └── shared/           # Shared TypeScript types and schemas
├── docs/                 # Documentation and architecture specs
├── .env.example          # Environment variable template
├── CODE_OF_CONDUCT.md    # Contributor code of conduct
├── CONTRIBUTING.md       # Development setup and contribution guidelines
├── LICENSE               # MIT License
├── SECURITY.md           # Security policy and disclosure process
└── package.json          # Root workspace configuration
```

## Getting Started

### Prerequisites

- Node.js 18 or higher
- pnpm 9 or higher

### Installation

Clone the repository and install workspace dependencies:

```bash
git clone https://github.com/Mimir-nest/mimir-nest.git
cd mimir-nest
pnpm install
```

### Running Locally

Start the Next.js web client (runs at http://localhost:3000):

```bash
pnpm dev
```

Start the Express API server (runs at http://localhost:4000):

```bash
pnpm dev:api
```

## Commands

Run these workspace commands from the root directory:

| Command | Action |
| --- | --- |
| `pnpm dev` | Start web application dev server |
| `pnpm dev:web` | Start web application dev server |
| `pnpm dev:api` | Start Express API dev server |
| `pnpm build` | Build both web application and API |
| `pnpm build:web` | Build Next.js web application |
| `pnpm build:api` | Build Express API |
| `pnpm lint` | Run ESLint across workspace |
| `pnpm typecheck` | Run TypeScript type checks across workspace |

## Environment Variables

Copy `.env.example` to set up environment variables:

- `NEXT_PUBLIC_API_URL`: Express API URL for the frontend (default: `http://localhost:4000`)
- `PORT`: Port for the Express server (default: `4000`)
- `CORS_ORIGIN`: Allowed CORS origin for the API (default: `http://localhost:3000`)
- `CONTENT_DIR`: Data directory path relative to `apps/api` (default: `content`)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for local setup, development guidelines, and pull request requirements.

## Code of Conduct

See [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

## Open Source Programs

Mimir Nest is part of the Mintlify Open Source Program, which supports open-source projects with documentation infrastructure.

## License

[MIT License](LICENSE).
