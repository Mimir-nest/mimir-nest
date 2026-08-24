export const metadata = {
  title: "Blog | Mimir Nest",
  description: "Useful, original articles on student life, software engineering, programming, placements, and open source.",
  alternates: {
    canonical: "https://mimirnest.vercel.app/blog",
  },
  openGraph: {
    title: "Blog | Mimir Nest",
    description: "Useful, original articles on student life, software engineering, programming, placements, and open source.",
    url: "https://mimirnest.vercel.app/blog",
    type: "website",
  },
  twitter: {
    title: "Blog | Mimir Nest",
    description: "Useful, original articles on student life, software engineering, programming, placements, and open source.",
  },
};

export default function BlogLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Blog | Mimir Nest",
    "description": "Useful, original articles on student life, software engineering, programming, placements, and open source.",
    "url": "https://mimirnest.vercel.app/blog",
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
          "name": "Blog",
          "item": "https://mimirnest.vercel.app/blog"
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
