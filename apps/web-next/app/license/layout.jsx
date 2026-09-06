export const metadata = {
  title: "Mimir Nest License | MIT Open Source License",
  description: "Understand the MIT License terms and conditions for MimirNest, an open-source platform built to help students learn, build, and launch.",
  alternates: {
    canonical: "https://mimirnest.vercel.app/license",
  },
  openGraph: {
    title: "Mimir Nest License | MIT Open Source License",
    description: "Understand the MIT License terms and conditions for MimirNest, an open-source platform built to help students learn, build, and launch.",
    url: "https://mimirnest.vercel.app/license",
  },
  twitter: {
    title: "Mimir Nest License | MIT Open Source License",
    description: "Understand the MIT License terms and conditions for MimirNest, an open-source platform built to help students learn, build, and launch.",
  },
};

export default function LicenseLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Mimir Nest License | MIT License",
    "description": "Understand the MIT License terms and conditions for Mimir Nest, a free college student platform.",
    "url": "https://mimirnest.vercel.app/license",
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
          "name": "License",
          "item": "https://mimirnest.vercel.app/license"
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
