export const metadata = {
  title: "CGPA Calculator & Semester Predictor | Mimir Nest",
  description: "Calculate and predict your university CGPA with our mathematically rigorous credit-weighted grade calculator.",
  alternates: {
    canonical: "https://mimirnest.vercel.app/cgpa",
  },
  openGraph: {
    title: "CGPA Calculator & Semester Predictor | Mimir Nest",
    description: "Calculate and predict your university CGPA with our mathematically rigorous credit-weighted grade calculator.",
    url: "https://mimirnest.vercel.app/cgpa",
  },
  twitter: {
    title: "CGPA Calculator & Semester Predictor | Mimir Nest",
    description: "Calculate and predict your university CGPA with our mathematically rigorous credit-weighted grade calculator.",
  },
};

export default function CgpaLayout({ children }) {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Mimir Nest CGPA Calculator & Predictor",
      "description": "Calculate and predict your university CGPA with our mathematically rigorous credit-weighted grade calculator.",
      "applicationCategory": "EducationalApplication",
      "operatingSystem": "All",
      "browserRequirements": "Requires HTML5 support",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    },
    {
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
          "name": "CGPA Calculator",
          "item": "https://mimirnest.vercel.app/cgpa"
        }
      ]
    }
  ];

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
