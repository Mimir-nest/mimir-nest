export const metadata = {
  title: "Contact Mimir Nest",
  description: "Get in touch with the creator of Mimir Nest. Email us for support, general questions, bug reports, and contributions.",
  alternates: {
    canonical: "https://mimirnest.vercel.app/contact",
  },
  openGraph: {
    title: "Contact Mimir Nest",
    description: "Get in touch with the creator of Mimir Nest. Email us for support, general questions, bug reports, and contributions.",
    url: "https://mimirnest.vercel.app/contact",
  },
  twitter: {
    title: "Contact Mimir Nest",
    description: "Get in touch with the creator of Mimir Nest. Email us for support, general questions, bug reports, and contributions.",
  },
};

export default function ContactLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Contact Mimir Nest",
    "description": "Get in touch with the creator of Mimir Nest. Email us for support, general questions, bug reports, and contributions.",
    "url": "https://mimirnest.vercel.app/contact",
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
          "name": "Contact",
          "item": "https://mimirnest.vercel.app/contact"
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
