export const metadata = {
  title: "Contribute to Mimir Nest — Everything You Need to Learn, Build & Launch",
  description: "Find out how to contribute to Mimir Nest. Guide on setup, development commands, reporting bugs, and submitting pull requests.",
  alternates: {
    canonical: "https://mimirnest.vercel.app/contributing",
  },
  openGraph: {
    title: "Contribute to Mimir Nest — Everything You Need to Learn, Build & Launch",
    description: "Find out how to contribute to Mimir Nest. Guide on setup, development commands, reporting bugs, and submitting pull requests.",
    url: "https://mimirnest.vercel.app/contributing",
  },
  twitter: {
    title: "Contribute to Mimir Nest — Everything You Need to Learn, Build & Launch",
    description: "Find out how to contribute to Mimir Nest. Guide on setup, development commands, reporting bugs, and submitting pull requests.",
  },
};

export default function ContributingLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Contribute to Mimir Nest — Everything You Need to Learn, Build & Launch",
    "description": "Find out how to contribute to Mimir Nest. Guide on setup, development commands, reporting bugs, and submitting pull requests.",
    "url": "https://mimirnest.vercel.app/contributing",
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
          "name": "Contributing",
          "item": "https://mimirnest.vercel.app/contributing"
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
