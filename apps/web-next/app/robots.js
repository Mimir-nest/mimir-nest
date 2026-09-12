export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/playground?*"],
      },
    ],
    sitemap: "https://mimirnest.vercel.app/sitemap.xml",
  };
}
