export const metadata = {
  title: "Open-Source Projects & Build Guides | Mimir Nest",
  description: "Get inspired for your next software project. Browse curated open-source projects, beginner guides, and build templates.",
  alternates: {
    canonical: "https://mimirnest.vercel.app/projects",
  },
  openGraph: {
    title: "Open-Source Projects & Build Guides | Mimir Nest",
    description: "Get inspired for your next software project. Browse curated open-source projects, beginner guides, and build templates.",
    url: "https://mimirnest.vercel.app/projects",
  },
  twitter: {
    title: "Open-Source Projects & Build Guides | Mimir Nest",
    description: "Get inspired for your next software project. Browse curated open-source projects, beginner guides, and build templates.",
  },
};

export default function ProjectsLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Open-Source Projects & Build Guides | Mimir Nest",
    "description": "Get inspired for your next software project. Browse curated open-source projects, beginner guides, and build templates.",
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
