export const metadata = {
  title: "About Mimir Nest | Mission & Core Values",
  description: "Learn about the mission, values, and origin of Mimir Nest. Empowering college students with free, open-source academic tools.",
  alternates: {
    canonical: "https://mimirnest.vercel.app/about",
  },
  openGraph: {
    title: "About Mimir Nest | Mission & Core Values",
    description: "Learn about the mission, values, and origin of Mimir Nest. Empowering college students with free, open-source academic tools.",
    url: "https://mimirnest.vercel.app/about",
  },
  twitter: {
    title: "About Mimir Nest | Mission & Core Values",
    description: "Learn about the mission, values, and origin of Mimir Nest. Empowering college students with free, open-source academic tools.",
  },
};

export default function AboutLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "About Mimir Nest | Mission & Core Values",
    "description": "Learn about the mission, values, and origin of Mimir Nest. Empowering college students with free, open-source academic tools.",
    "url": "https://mimirnest.vercel.app/about",
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
          "name": "About",
          "item": "https://mimirnest.vercel.app/about"
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
