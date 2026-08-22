# Contributing

## Local Workflow

1. Make changes in the appropriate workspace package.
2. Keep content changes in `content/` and code changes in `apps/web-next` or `apps/api`.
3. Re-run the relevant workspace build or type-check command before opening a PR.

## Structure Rules

- UI and routing belong in `apps/web-next`.
- REST APIs, repositories, and validation belong in `apps/api`.
- Shared interfaces belong in `packages/shared`.
- JSON content stays in `content/` until the backend is migrated to a database.
