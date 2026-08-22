export const metadata = {
  title: "Privacy Policy & Local-First Data | Mimir Nest",
  description: "Read our privacy policy. Mimir Nest processes all calculation formulas and timer configurations locally in your browser.",
  alternates: {
    canonical: "https://mimirnest.vercel.app/privacy",
  },
  openGraph: {
    title: "Privacy Policy & Local-First Data | Mimir Nest",
    description: "Read our privacy policy. Mimir Nest processes all calculation formulas and timer configurations locally in your browser.",
    url: "https://mimirnest.vercel.app/privacy",
  },
  twitter: {
    title: "Privacy Policy & Local-First Data | Mimir Nest",
    description: "Read our privacy policy. Mimir Nest processes all calculation formulas and timer configurations locally in your browser.",
  },
};

export default function PrivacyLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Privacy Policy & Local-First Data | Mimir Nest",
    "description": "Read our privacy policy. Mimir Nest processes all calculation formulas and timer configurations locally in your browser.",
    "url": "https://mimirnest.vercel.app/privacy",
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
          "name": "Privacy Policy",
          "item": "https://mimirnest.vercel.app/privacy"
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
