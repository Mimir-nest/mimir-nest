export const metadata = {
  title: "Placement Prep & DSA Problem Archives | Mimir Nest",
  description: "Ace technical coding interviews with curated DSA archives from 190+ companies. Filter by topic and difficulty.",
  alternates: {
    canonical: "https://mimirnest.vercel.app/placement-dsa",
  },
  openGraph: {
    title: "Placement Prep & DSA Problem Archives | Mimir Nest",
    description: "Ace technical coding interviews with curated DSA archives from 190+ companies. Filter by topic and difficulty.",
    url: "https://mimirnest.vercel.app/placement-dsa",
  },
  twitter: {
    title: "Placement Prep & DSA Problem Archives | Mimir Nest",
    description: "Ace technical coding interviews with curated DSA archives from 190+ companies. Filter by topic and difficulty.",
  },
};

export default function PlacementDsaLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Placement Prep & DSA Problem Archives | Mimir Nest",
    "description": "Ace technical coding interviews with curated DSA archives from 190+ companies. Filter by topic and difficulty.",
    "url": "https://mimirnest.vercel.app/placement-dsa",
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
          "name": "Placement DSA",
          "item": "https://mimirnest.vercel.app/placement-dsa"
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
