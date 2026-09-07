export const metadata = {
  title: "Mimir Interview — AI Mock Interviews Based on Your GitHub | Mimir Nest",
  description:
    "Practice personalized technical interviews based on the projects you've actually built. Mimir Interview is an upcoming AI mock interview experience from Mimir Nest.",
  alternates: {
    canonical: "https://mimirnest.vercel.app/interview",
  },
  openGraph: {
    title: "Mimir Interview — AI Mock Interviews Based on Your GitHub | Mimir Nest",
    description:
      "Practice personalized technical interviews based on the projects you've actually built. Mimir Interview is an upcoming AI mock interview experience from Mimir Nest.",
    url: "https://mimirnest.vercel.app/interview",
    type: "website",
    siteName: "Mimir Nest",
    images: [
      {
        url: "/logo/logo.png",
        width: 512,
        height: 512,
        alt: "Mimir Interview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mimir Interview — AI Mock Interviews Based on Your GitHub | Mimir Nest",
    description:
      "Practice personalized technical interviews based on the projects you've actually built. Mimir Interview is an upcoming AI mock interview experience from Mimir Nest.",
    images: ["/logo/logo.png"],
  },
};

export default function InterviewLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Mimir Interview — AI Mock Interviews Based on Your GitHub | Mimir Nest",
    "description":
      "Practice personalized technical interviews based on the projects you've actually built. Mimir Interview is an upcoming AI mock interview experience from Mimir Nest.",
    "url": "https://mimirnest.vercel.app/interview",
    "breadcrumb": {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://mimirnest.vercel.app",
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "AI Interview",
          "item": "https://mimirnest.vercel.app/interview",
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
