export const metadata = {
  title: "Non-Technical Interview Prep — Q&A Bank | Mimir Nest",
  description:
    "A curated, filterable non-technical interview question bank for Consulting, Product Management, Investment Banking, Marketing, Strategy, Finance, and HR. Prep smarter with structured Q&A, follow-ups, and evaluation rubrics.",
  alternates: {
    canonical: "https://mimirnest.vercel.app/interview-prep",
  },
  openGraph: {
    title: "Non-Technical Interview Prep — Q&A Bank | Mimir Nest",
    description:
      "Filterable by role, category, difficulty, and industry. Covers Consulting, PM, IB, Marketing, Strategy, Finance, and HR interview preparation.",
    url: "https://mimirnest.vercel.app/interview-prep",
    type: "website",
  },
  twitter: {
    title: "Non-Technical Interview Prep — Q&A Bank | Mimir Nest",
    description:
      "Curated Q&A bank for Consulting, PM, IB, Marketing, Strategy, Finance, and HR interviews — with detailed answers, follow-ups, and evaluation rubrics.",
  },
};

export default function InterviewPrepLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Non-Technical Interview Prep — Q&A Bank | Mimir Nest",
    description:
      "Filterable non-technical interview question bank covering Consulting, Product Management, Investment Banking, Marketing, Strategy, Finance, and HR.",
    url: "https://mimirnest.vercel.app/interview-prep",
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
          name: "Interview Prep",
          item: "https://mimirnest.vercel.app/interview-prep",
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
