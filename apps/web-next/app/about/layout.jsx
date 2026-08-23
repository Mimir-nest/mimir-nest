export const metadata = {
  title: "Mimir Nest — About the Open-Source Student Platform",
  description: "Learn about Mimir Nest, a free and open-source platform providing academic, career prep, and learning tools built directly for students.",
  alternates: {
    canonical: "https://mimirnest.vercel.app/about",
  },
  openGraph: {
    title: "Mimir Nest — About the Open-Source Student Platform",
    description: "Learn about Mimir Nest, a free and open-source platform providing academic, career prep, and learning tools built directly for students.",
    url: "https://mimirnest.vercel.app/about",
  },
  twitter: {
    title: "Mimir Nest — About the Open-Source Student Platform",
    description: "Learn about Mimir Nest, a free and open-source platform providing academic, career prep, and learning tools built directly for students.",
  },
};

export default function AboutLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Mimir Nest — About the Open-Source Student Platform",
    "description": "Learn about Mimir Nest, a free and open-source platform providing academic, career prep, and learning tools built directly for students.",
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
