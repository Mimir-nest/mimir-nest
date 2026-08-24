// In-memory cache to guarantee instantaneous (0ms) page loads on revisit
const cache = new Map();

// API Base URL - default to empty unless explicitly specified
const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";

/**
 * Fast-fetching helper with in-memory caching and optional short API attempt
 */
const request = async (apiPath, jsonPath) => {
  const cacheKey = `${apiPath}::${jsonPath}`;
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  // Try API endpoints in this order: custom base URL -> local /api route -> direct static JSON
  const tryApi = async (url) => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 1200);
      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);
      if (response.ok) {
        const payload = await response.json();
        if (payload?.data) {
          cache.set(cacheKey, payload.data);
          return payload.data;
        }
        // If no wrapper, return raw
        cache.set(cacheKey, payload);
        return payload;
      }
    } catch (e) {
      // ignore and fallthrough
    }
    return null;
  };

  if (apiBaseUrl) {
    const fromBase = await tryApi(`${apiBaseUrl}${apiPath}`);
    if (fromBase) return fromBase;
  }

  // Try local Next.js API route first (server-side friendly)
  const fromLocalApi = await tryApi(apiPath);
  if (fromLocalApi) return fromLocalApi;

  // Fast direct load from local static JSON as last resort
  try {
    const response = await fetch(jsonPath);
    if (!response.ok) {
      throw new Error(`Failed to load ${jsonPath}`);
    }
    const data = await response.json();
    cache.set(cacheKey, data);
    return data;
  } catch (error) {
    console.error(`Error loading data from ${jsonPath}:`, error);
    return [];
  }
};

export const contentApi = {
  getProjects: (query = "") =>
    request(`/api/projects${query}`, "/content/projects/projects.json"),
  getCourses: (query = "") =>
    request(`/api/courses${query}`, "/content/courses/courses.json"),
  getPerks: (query = "") =>
    request(`/api/perks${query}`, "/content/perks/perks.json"),
  getPlacement: () =>
    request("/api/placement", "/content/placement/placement.json"),
  getRoadmaps: () =>
    request("/api/roadmaps", "/content/roadmaps/roadmaps.json"),
  getBlogArticles: () =>
    request("/api/blog", "/content/blog/articles.json"),
};
