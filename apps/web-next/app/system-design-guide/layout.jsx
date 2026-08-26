export const metadata = {
  title: "System Design Guide — Concepts & Theory | Mimir Nest",
  description:
    "A complete, chapter-by-chapter system design learning guide covering IP, OSI, DNS, Load Balancing, Caching, Databases, Distributed Systems, Microservices, and more. Built for interview prep.",
  alternates: {
    canonical: "https://mimirnest.vercel.app/system-design-guide",
  },
  openGraph: {
    title: "System Design Guide — Concepts & Theory | Mimir Nest",
    description:
      "A complete, chapter-by-chapter system design learning guide covering IP, OSI, DNS, Load Balancing, Caching, Databases, Distributed Systems, Microservices, and more.",
    url: "https://mimirnest.vercel.app/system-design-guide",
    type: "website",
  },
  twitter: {
    title: "System Design Guide — Concepts & Theory | Mimir Nest",
    description:
      "A complete, chapter-by-chapter system design learning guide covering IP, OSI, DNS, Load Balancing, Caching, Databases, Distributed Systems, Microservices, and more.",
  },
};

export default function SystemDesignGuideLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "System Design Guide — Concepts & Theory | Mimir Nest",
    description:
      "A complete system design learning guide covering networking, databases, distributed systems, and more.",
    url: "https://mimirnest.vercel.app/system-design-guide",
    breadcrumb: {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://mimirnest.vercel.app",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "System Design Guide",
          item: "https://mimirnest.vercel.app/system-design-guide",
        },
      ],
    },
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
