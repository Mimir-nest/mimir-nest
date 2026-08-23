export const metadata = {
  title: "Mimir Nest Security",
  description: "Responsible disclosure guidelines, security practices, and reporting instructions for Mimir Nest.",
  alternates: {
    canonical: "https://mimirnest.vercel.app/security",
  },
  openGraph: {
    title: "Mimir Nest Security",
    description: "Responsible disclosure guidelines, security practices, and reporting instructions for Mimir Nest.",
    url: "https://mimirnest.vercel.app/security",
  },
  twitter: {
    title: "Mimir Nest Security",
    description: "Responsible disclosure guidelines, security practices, and reporting instructions for Mimir Nest.",
  },
};

export default function SecurityLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Mimir Nest Security",
    "description": "Responsible disclosure guidelines, security practices, and reporting instructions for Mimir Nest.",
    "url": "https://mimirnest.vercel.app/security",
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
          "name": "Security",
          "item": "https://mimirnest.vercel.app/security"
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
