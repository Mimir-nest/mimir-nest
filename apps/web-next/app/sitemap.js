import { systemDesignProblems } from "./system-design/data/problems";
import fs from "fs";
import path from "path";

export default async function sitemap() {
  const baseUrl = "https://mimirnest.vercel.app";

  const staticRoutes = [
    "",
    "/system-design",
    "/system-design/problems",
    "/system-design-guide",
    "/interview-prep",
    "/placement-dsa",
    "/courses",
    "/projects",
    "/roadmaps",
    "/email-perks",
    "/blog",
    "/about",
    "/contact",
    "/faq",
    "/license",
    "/privacy",
    "/security",
    "/contributing",
    "/cgpa",
    "/pomodoro",
    "/typing",
  ];

  const entries = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : route.startsWith("/system-design") ? 0.9 : 0.8,
  }));

  // Dynamic System Design Problem Routes
  try {
    if (Array.isArray(systemDesignProblems)) {
      systemDesignProblems.forEach((problem) => {
        if (problem?.slug) {
          entries.push({
            url: `${baseUrl}/system-design/problems/${problem.slug}`,
            lastModified: new Date().toISOString(),
            changeFrequency: "weekly",
            priority: 0.85,
          });
        }
      });
    }
  } catch (error) {
    console.error("Error generating sitemap for system design problems:", error);
  }

  // Dynamic Interview Prep Company Routes
  const companies = [
    "adobe", "amazon", "apple", "google", "meta", "microsoft", "nvidia", "tcs", "bosch", "intel", "oracle", "salesforce"
  ];
  companies.forEach((company) => {
    entries.push({
      url: `${baseUrl}/interview-prep/company/${company}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 0.8,
    });
  });

  // Dynamic Blog Article Routes
  try {
    const filePath = path.join(process.cwd(), "public", "content", "blog", "articles.json");
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const articles = JSON.parse(fileContent);
      if (Array.isArray(articles)) {
        articles.forEach((article) => {
          if (article?.slug) {
            entries.push({
              url: `${baseUrl}/blog/${article.slug}`,
              lastModified: new Date().toISOString(),
              changeFrequency: "monthly",
              priority: 0.7,
            });
          }
        });
      }
    }
  } catch (error) {
    console.error("Error generating sitemap routes for blog articles:", error);
  }

  return entries;
}
