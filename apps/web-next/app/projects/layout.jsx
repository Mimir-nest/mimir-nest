export const metadata = {
  title: "Projects & Build Guides | Mimir Nest",
  description: "Get inspired for your next software project. Browse curated project ideas, beginner guides, and build templates.",
  alternates: {
    canonical: "https://mimirnest.vercel.app/projects",
  },
  openGraph: {
    title: "Projects & Build Guides | Mimir Nest",
    description: "Get inspired for your next software project. Browse curated project ideas, beginner guides, and build templates.",
    url: "https://mimirnest.vercel.app/projects",
  },
  twitter: {
    title: "Projects & Build Guides | Mimir Nest",
    description: "Get inspired for your next software project. Browse curated project ideas, beginner guides, and build templates.",
  },
};

export default function ProjectsLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Projects & Build Guides | Mimir Nest",
    "description": "Get inspired for your next software project. Browse curated project ideas, beginner guides, and build templates.",
    "url": "https://mimirnest.vercel.app/projects",
    "breadcrumb": {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://mimirnest.vercel.app"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Projects",
          "item": "https://mimirnest.vercel.app/projects"
        }
      ]
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
