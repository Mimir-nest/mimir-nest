# Contributing to Mimir Nest

Thank you for your interest in contributing to **Mimir Nest**! We welcome contributions from developers, students, and open-source enthusiasts. 

Mimir Nest is an open-source student learning and interview-preparation platform built to help students learn system design, practice data structures and algorithms, build projects, and prepare for software engineering placements.

---

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [Development Setup](#development-setup)
4. [Running Locally](#running-locally)
5. [Project Structure](#project-structure)
6. [Making Changes](#making-changes)
7. [Pull Requests](#pull-requests)
8. [Educational Content Contributions](#educational-content-contributions)
9. [Reporting Bugs & Feature Requests](#reporting-bugs--feature-requests)
10. [Code Quality & Testing](#code-quality--testing)

---

## Code of Conduct

All contributors are expected to adhere to our [Code of Conduct](CODE_OF_CONDUCT.md). Please read it before participating in our community or submitting pull requests.

---

## Getting Started

To start contributing, fork the repository and clone it locally:

```bash
git clone https://github.com/Mimir-nest/mimir-nest.git
cd mimir-nest
```

Create a new branch for your feature or bug fix:

```bash
git checkout -b feature/your-feature-name
```

---

## Development Setup

### Prerequisites

- **Node.js**: Version `18.x` or higher (`node -v`)
- **pnpm**: Version `9.x` or higher (`pnpm -v`)

### Installing Dependencies

Run `pnpm install` at the root of the workspace to install all monorepo dependencies:

```bash
pnpm install
```

---

## Running Locally

Execute scripts from the repository root:

* **Next.js Web Client** (runs on [http://localhost:3000](http://localhost:3000)):
  ```bash
  pnpm dev
  ```
  or explicitly:
  ```bash
  pnpm dev:web
  ```

* **Express Content API Server** (runs on [http://localhost:4000](http://localhost:4000)):
  ```bash
  pnpm dev:api
  ```

---

## Project Structure

Mimir Nest uses a `pnpm` monorepo workspace structure:

```text
mimir-nest/
├── apps/
│   ├── web-next/                   # Next.js 15 App Router web application
│   │   ├── app/                    # Routes (system-design, playground, placement-dsa, etc.)
│   │   │   ├── system-design/      # System Design problems & guide routes
│   │   │   ├── playground/         # Interactive System Design Canvas & Solution Mode
│   │   │   ├── placement-dsa/      # Placement DSA question vault
│   │   │   ├── interview-prep/     # Interview preparation modules & company tracks
│   │   │   ├── courses/            # Computer science course roadmaps
│   │   │   ├── projects/           # Resume portfolio project ideas
│   │   │   ├── roadmaps/           # Career roadmaps
│   │   │   ├── pomodoro/           # Pomodoro focus timer
│   │   │   ├── cgpa/               # CGPA calculator
│   │   │   └── typing/             # Typing speed test tool
│   │   ├── components/             # Reusable UI components & System Design Canvas widgets
│   │   │   ├── system-design/      # Flow Canvas components (Nodes, Edges, Inspectors)
│   │   │   └── ui/                 # Radix UI primitives & custom UI components
│   │   ├── public/                 # Static assets and local offline fallback datasets
│   │   └── services/               # API clients & data fetching services
│   │
│   └── api/                        # Express.js Content API backend
│       ├── content/                # JSON datasets (courses, interview-prep, perks, etc.)
│       └── src/                    # API routes, controllers, and validation schemas
│
├── packages/
│   └── shared/                     # Shared TypeScript interfaces and contracts
│
├── docs/                           # Architecture, API specifications, and roadmap
├── CODE_OF_CONDUCT.md              # Community guidelines
├── CONTRIBUTING.md                 # Contribution guidelines
├── LICENSE                         # MIT License
└── package.json                    # Workspace scripts configuration
```

---

## Making Changes

1. Keep your changes focused and scoped to the task at hand. Avoid mixing refactoring, code formatting changes, or unrelated fixes in a single pull request.
2. Maintain clean architecture boundaries:
   - **Frontend UI & Routing**: Place in `apps/web-next/`.
   - **API Endpoints & Controllers**: Place in `apps/api/`.
   - **Shared Types & Schemas**: Place in `packages/shared/`.
   - **Educational Datasets**: Place under `apps/api/content/` and `apps/web-next/public/content/`.

---

## Pull Requests

When creating a Pull Request (PR):

1. **Title**: Use a concise, descriptive title (e.g., `feat(system-design): add solution mode canvas toggle`).
2. **Description**: Clear explanation of what changed, why, and any context or design decisions.
3. **Screenshots**: Include screenshots or GIF recordings for visual/UI updates.
4. **Clean Commits**: Avoid committing temporary debug code (`console.log`, `debugger`, temporary test files).
5. **Quality Checks**: Ensure your PR passes all static type checks, linting, and builds locally.

---

## Educational Content Contributions

Mimir Nest maintains openly accessible educational content without requiring external database setups for basic local contributions.

* **System Design Problems & Workflows**: Located in [`apps/web-next/app/system-design/data/problems.ts`](apps/web-next/app/system-design/data/problems.ts).
* **Placement DSA Vault Data**: Located in [`apps/api/content/interview-prep/`](apps/api/content/interview-prep/).
* **Course & Roadmap Data**: Located in [`apps/api/content/courses.json`](apps/api/content/courses.json) and [`apps/api/content/roadmaps.json`](apps/api/content/roadmaps.json).

To add or update educational questions, problems, or solutions, modify the corresponding JSON or TypeScript definition file and submit a pull request detailing your additions.

---

## Reporting Bugs & Feature Requests

If you find a bug or have a suggestion:

1. Check existing [GitHub Issues](https://github.com/Mimir-nest/mimir-nest/issues) to avoid duplicate reports.
2. If opening a new issue, include:
   - Clear description of the bug or feature proposal
   - Reproduction steps (for bugs)
   - Expected vs actual behavior
   - System details (Browser, OS version)

*For security vulnerability disclosures, please refer to our [Security Policy](SECURITY.md) and report privately to **mimirnest@gmail.com**.*

---

## Code Quality & Testing

Before submitting a pull request, run the following verification commands from the repository root:

### 1. Static Type Checking
Verifies TypeScript signatures across frontend and backend workspaces:
```bash
pnpm typecheck
```

### 2. Code Linting
Runs ESLint across all apps and packages:
```bash
pnpm lint
```

### 3. Production Build Verification
Verifies that Next.js static pages and Express server compile without build errors:
```bash
pnpm build
```

---

Thank you for helping make **Mimir Nest** better for students and developers everywhere!
