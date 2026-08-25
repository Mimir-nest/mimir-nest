export const metadata = {
  title: "500+ System Design Interview Questions & Answers | Mimir Nest",
  description: "Prepare for system design interviews with 500+ questions and concise answers covering scalability, databases, caching, distributed systems, networking, APIs, HLD, LLD, and advanced architecture.",
  alternates: {
    canonical: "https://mimirnest.vercel.app/system-design",
  },
  openGraph: {
    title: "500+ System Design Interview Questions & Answers | Mimir Nest",
    description: "Prepare for system design interviews with 500+ questions and concise answers covering scalability, databases, caching, distributed systems, networking, APIs, HLD, LLD, and advanced architecture.",
    url: "https://mimirnest.vercel.app/system-design",
    type: "website",
  },
  twitter: {
    title: "500+ System Design Interview Questions & Answers | Mimir Nest",
    description: "Prepare for system design interviews with 500+ questions and concise answers covering scalability, databases, caching, distributed systems, networking, APIs, HLD, LLD, and advanced architecture.",
  },
};

export default function SystemDesignLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "500+ System Design Interview Questions & Answers | Mimir Nest",
    "description": "Prepare for system design interviews with 500+ questions and concise answers covering scalability, databases, caching, distributed systems, networking, APIs, HLD, LLD, and advanced architecture.",
    "url": "https://mimirnest.vercel.app/system-design",
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
          "name": "System Design Prep",
          "item": "https://mimirnest.vercel.app/system-design"
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
