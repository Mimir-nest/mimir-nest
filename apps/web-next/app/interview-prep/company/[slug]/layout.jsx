export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const rawSlug = resolvedParams?.slug || "company";
  const formattedName = rawSlug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  const canonicalUrl = `https://mimirnest.vercel.app/interview-prep/company/${rawSlug}`;
  const title = `${formattedName} Non-Technical Interview Questions & Prep | Mimir Nest`;
  const description = `Practice non-technical, behavioral, leadership, and strategy interview questions for ${formattedName}. Real interview scenario frameworks with evaluation criteria.`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "website",
      siteName: "Mimir Nest",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function CompanyLayout({ children, params }) {
  const resolvedParams = await params;
  const rawSlug = resolvedParams?.slug || "company";
  const formattedName = rawSlug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  const breadcrumbJsonLd = {
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
        "name": "Interview Prep",
        "item": "https://mimirnest.vercel.app/interview-prep"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": formattedName,
        "item": `https://mimirnest.vercel.app/interview-prep/company/${rawSlug}`
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {children}
    </>
  );
}
