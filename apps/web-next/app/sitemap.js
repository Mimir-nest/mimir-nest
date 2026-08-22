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
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));
}
