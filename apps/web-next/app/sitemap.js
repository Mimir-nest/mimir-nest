import fs from "fs";
import path from "path";

export default async function sitemap() {
  const baseUrl = "https://mimirnest.vercel.app";

  const routes = [
    "",
    "/about",
    "/cgpa",
    "/courses",
    "/email-perks",
    "/faq",
    "/placement-dsa",
    "/pomodoro",
    "/privacy",
    "/projects",
    "/roadmaps",
    "/typing",
    "/blog",
    "/system-design",
    "/system-design-guide",
  ];

  try {
    const filePath = path.join(process.cwd(), "public", "content", "blog", "articles.json");
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const articles = JSON.parse(fileContent);
      if (Array.isArray(articles)) {
        articles.forEach((article) => {
          if (article.slug) {
            routes.push(`/blog/${article.slug}`);
          }
        });
      }
    }
  } catch (error) {
    console.error("Error generating sitemap routes for blog articles:", error);
  }

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : route.startsWith("/blog/") ? 0.7 : 0.8,
  }));
}
