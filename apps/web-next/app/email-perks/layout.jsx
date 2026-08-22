export const metadata = {
  title: "Student Discounts & Email Perks | Mimir Nest",
  description: "Discover and unlock verified free software, student benefits, and academic discounts using your university email.",
  alternates: {
    canonical: "https://mimirnest.vercel.app/email-perks",
  },
  openGraph: {
    title: "Student Discounts & Email Perks | Mimir Nest",
    description: "Discover and unlock verified free software, student benefits, and academic discounts using your university email.",
    url: "https://mimirnest.vercel.app/email-perks",
  },
  twitter: {
    title: "Student Discounts & Email Perks | Mimir Nest",
    description: "Discover and unlock verified free software, student benefits, and academic discounts using your university email.",
  },
};

export default function EmailPerksLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Student Discounts & Email Perks | Mimir Nest",
    "description": "Discover and unlock verified free software, student benefits, and academic discounts using your university email.",
    "url": "https://mimirnest.vercel.app/email-perks",
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
          "name": "Email Perks",
          "item": "https://mimirnest.vercel.app/email-perks"
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
