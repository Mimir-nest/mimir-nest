# Developer Note: SEO & Crawlability Architecture

This guide explains how Search Engine Optimization (SEO), Answer Engine Optimization (AEO), sitemaps, canonicals, and metadata are handled in Mimir Nest.

---

## 1. Metadata Generation
- **Static Pages**: Handled via `export const metadata` in route `layout.jsx` files (e.g., `app/system-design/layout.jsx`, `app/placement-dsa/layout.jsx`).
- **Dynamic Pages**: Handled via `export async function generateMetadata({ params })` in dynamic route `layout.jsx` files:
  - System Design Problems: `app/system-design/problems/[slug]/layout.jsx`
  - Company Interview Tracks: `app/interview-prep/company/[slug]/layout.jsx`
  - Question Detail Pages: `app/interview-prep/[id]/layout.jsx`
  - Blog Articles: `app/blog/[slug]/page.jsx`

---

## 2. Sitemap Generation (`app/sitemap.js`)
The sitemap is generated dynamically at `/sitemap.xml` using Next.js App Router metadata conventions:
- **Static Hubs**: Includes `/`, `/system-design`, `/system-design/problems`, `/system-design-guide`, `/interview-prep`, `/placement-dsa`, `/courses`, `/projects`, `/roadmaps`, `/email-perks`, `/blog`, etc.
- **Dynamic Entries**: Programmatically appends system design problem slugs from `systemDesignProblems` (`problems.ts`), company tracks, and blog articles.

---

## 3. Canonical URLs & Domain
- Production base URL is `https://mimirnest.vercel.app`.
- Every indexable route specifies `alternates: { canonical: "https://mimirnest.vercel.app/..." }`.
- Dynamic routes resolve canonicals directly to clean, parameter-free page URLs.

---

## 4. Non-Indexable Routes (`noindex`)
The following areas are intentionally NOT indexed to prevent duplicate content or low-value indexing:
- **`app/playground/layout.jsx`**: Marked `robots: { index: false, follow: true }` so stateful URLs like `/playground?challenge=gmail-spam-filter` do not create duplicate indexed entries.
- **API Endpoints**: Disallowed in `app/robots.js` (`disallow: ["/api/", "/playground?*"]`).

---

## 5. Structured Data (Schema.org)
- **WebSite & Organization**: Embedded in root `layout.jsx`.
- **BreadcrumbList**: Embedded in `layout.jsx` files for System Design, Problems, Interview Prep, and Company routes.
- **TechArticle / BlogPosting**: Embedded in dynamic System Design problem and blog post layouts.
