export const metadata = {
  title: "About Mimir Nest — Open-Source Platform for Students",
  description: "Learn about MimirNest, an open-source platform built to help students learn, build, and launch.",
  alternates: {
    canonical: "https://mimirnest.vercel.app/about",
  },
  openGraph: {
    title: "About Mimir Nest — Open-Source Platform for Students",
    description: "Learn about MimirNest, an open-source platform built to help students learn, build, and launch.",
    url: "https://mimirnest.vercel.app/about",
  },
  twitter: {
    title: "About Mimir Nest — Open-Source Platform for Students",
    description: "Learn about MimirNest, an open-source platform built to help students learn, build, and launch.",
  },
};

export default function AboutLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Mimir Nest — Everything You Need to Learn, Build & Launch",
    "description": "Learn about Mimir Nest, a free platform providing academic, career prep, and learning tools built directly for students.",
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
