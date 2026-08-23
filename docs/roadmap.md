# Mimir Nest Project Roadmap

This document outlines the planned milestones and architectural roadmap for the Mimir Nest platform.

---

## Current Roadmap Milestones

### 1. Complete Content API Integration
- Migrate any remaining local frontend JSON reads over to dynamic API queries served by [apps/api/](../apps/api/).
- Standardize all API response wrappers across the client integration layers.

### 2. Pagination & Search Scaling
- Implement paginated queries (`limit`, `offset`) on large datasets (such as `/perks` and `/courses`).
- Optimize database-like indexing and search queries on the Express backend.

### 3. Database Migration
- Replace the in-memory JSON file-system repository layer in [apps/api/](../apps/api/) with a persistent relational database (such as PostgreSQL) utilizing a Query Builder or ORM.
- Keep the `@mimir/shared` schema interfaces intact to avoid breaking client-side contracts.

### 4. Authentication & Admin Tools
- Add role-based authentication (such as JWT/OAuth) for admin users.
- Construct administrative interfaces on the Next.js client to manage, add, or verify student perks, courses, and placement DSA archives.
