/**
 * Utility functions for Non-Technical Interview Prep routing and formatting
 */

export function companyToSlug(companyName = "") {
  return companyName
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function findCompanyBySlug(slug = "", companies = []) {
  if (!slug) return null;
  const cleanSlug = slug.toLowerCase().trim();

  // Exact slug match
  const match = companies.find((c) => {
    const compSlug = companyToSlug(c.name || c.company || "");
    return compSlug === cleanSlug;
  });
  if (match) return match;

  // Partial or normalized fallback match
  return companies.find((c) => {
    const norm = (c.name || c.company || "").toLowerCase().replace(/[^a-z0-9]/g, "");
    const normSlug = cleanSlug.replace(/[^a-z0-9]/g, "");
    return norm === normSlug || norm.includes(normSlug) || normSlug.includes(norm);
  }) || null;
}

export const difficultyMeta = {
  Easy: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    border: "border-emerald-500/20",
    dot: "bg-emerald-400",
  },
  Medium: {
    bg: "bg-amber-500/10",
    text: "text-amber-400",
    border: "border-amber-500/20",
    dot: "bg-amber-400",
  },
  Hard: {
    bg: "bg-[#FF5A36]/10",
    text: "text-[#FF5A36]",
    border: "border-[#FF5A36]/20",
    dot: "bg-[#FF5A36]",
  },
  Expert: {
    bg: "bg-purple-500/10",
    text: "text-purple-400",
    border: "border-purple-500/20",
    dot: "bg-purple-400",
  },
};
