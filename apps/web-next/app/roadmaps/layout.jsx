export const metadata = {
  title: "Developer & Career Roadmaps | Mimir Nest",
  description: "Master software engineering with detailed, flexible developer roadmaps and step-by-step career pathways.",
  alternates: {
    canonical: "https://mimirnest.vercel.app/roadmaps",
  },
  openGraph: {
    title: "Developer & Career Roadmaps | Mimir Nest",
    description: "Master software engineering with detailed, flexible developer roadmaps and step-by-step career pathways.",
    url: "https://mimirnest.vercel.app/roadmaps",
  },
  twitter: {
    title: "Developer & Career Roadmaps | Mimir Nest",
    description: "Master software engineering with detailed, flexible developer roadmaps and step-by-step career pathways.",
  },
};

export default function RoadmapsLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Developer & Career Roadmaps | Mimir Nest",
    "description": "Master software engineering with detailed, flexible developer roadmaps and step-by-step career pathways.",
    "url": "https://mimirnest.vercel.app/roadmaps",
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
          "name": "Roadmaps",
          "item": "https://mimirnest.vercel.app/roadmaps"
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
