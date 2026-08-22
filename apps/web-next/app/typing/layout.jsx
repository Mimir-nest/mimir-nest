export const metadata = {
  title: "Developer Coding & Typing Speed Test | Mimir Nest",
  description: "Assess your Words Per Minute (WPM) and accuracy with our developer-centric typing practice and coding syntax speed test.",
  alternates: {
    canonical: "https://mimirnest.vercel.app/typing",
  },
  openGraph: {
    title: "Developer Coding & Typing Speed Test | Mimir Nest",
    description: "Assess your Words Per Minute (WPM) and accuracy with our developer-centric typing practice and coding syntax speed test.",
    url: "https://mimirnest.vercel.app/typing",
  },
  twitter: {
    title: "Developer Coding & Typing Speed Test | Mimir Nest",
    description: "Assess your Words Per Minute (WPM) and accuracy with our developer-centric typing practice and coding syntax speed test.",
  },
};

export default function TypingLayout({ children }) {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Mimir Nest Typing Speed Practice",
      "description": "Assess your Words Per Minute (WPM) and accuracy with our developer-centric typing practice and coding syntax speed test.",
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
          "name": "Typing Speed Test",
          "item": "https://mimirnest.vercel.app/typing"
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
