export const metadata = {
  title: "Mimir Nest Privacy Policy",
  description: "Understand how Mimir Nest handles your information. Learn about our user account options, bookmarks, learning progress, and data protection practices.",
  alternates: {
    canonical: "https://mimirnest.vercel.app/privacy",
  },
  openGraph: {
    title: "Mimir Nest Privacy Policy",
    description: "Understand how Mimir Nest handles your information. Learn about our user account options, bookmarks, learning progress, and data protection practices.",
    url: "https://mimirnest.vercel.app/privacy",
  },
  twitter: {
    title: "Mimir Nest Privacy Policy",
    description: "Understand how Mimir Nest handles your information. Learn about our user account options, bookmarks, learning progress, and data protection practices.",
  },
};

export default function PrivacyLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Mimir Nest Privacy Policy",
    "description": "Understand how Mimir Nest handles your information. Learn about our user account options, bookmarks, learning progress, and data protection practices.",
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
