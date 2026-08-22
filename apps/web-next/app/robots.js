export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: "https://mimirnest.vercel.app/sitemap.xml",
  };
}
