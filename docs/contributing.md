# Contributing to Mimir Nest

This guide outlines the local workflow, structure rules, and scripts for contributing code or content to Mimir Nest.

---

## Local Development Workflow

### Prerequisites
- Node.js (v18+)
- pnpm package manager

### Initial Setup
1. Clone the repository and navigate to the project root.
2. Install dependencies:
   ```bash
   pnpm install
   ```

### Running Locally
To launch development environments across packages:
- **Next.js Client** (`http://localhost:3000`):
  ```bash
  pnpm dev:web
  ```
- **Express API Backend** (`http://localhost:4000`):
  ```bash
  pnpm dev:api
  ```
- **Run Everything** (Runs the Next.js client by default):
  ```bash
  pnpm dev
  ```

---

## Project Structure Rules

When making changes, adhere to the following architecture boundary rules:

- **UI and Routing**: All frontend pages, layouts, and hooks belong in [apps/web-next/](../apps/web-next/).
- **REST APIs, Controllers, and Repositories**: All backend endpoints, middleware, and request validation schemas belong in [apps/api/](../apps/api/).
- **Shared Types & Contracts**: Shared models and TypeScript interfaces belong in [packages/shared/](../packages/shared/).
- **JSON Content**: Core static data files belong in [apps/api/content/](../apps/api/content/).

---

## Testing & Quality Checks

Before submitting any Pull Request (PR), ensure your changes pass the build, lint, and type checks:

### 1. Run Type Checks
Runs TypeScript validation without emitting files on both frontend and backend workspaces:
```bash
pnpm typecheck
```

### 2. Run Lint Checks
Runs ESLint styling and validation across all files:
```bash
pnpm lint
```

### 3. Run Production Build
Verifies that both Next.js static page generation and backend assets compile cleanly:
```bash
pnpm build
```
