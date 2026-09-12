export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const rawSlug = resolvedParams?.slug || "company";
  const formattedName = rawSlug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return {
    title: `${formattedName} Non-Technical Interview Questions | Mimir Nest`,
    description: `Practice non-technical, behavioral, leadership, and strategy interview questions for ${formattedName}. Real interview scenario frameworks with evaluation criteria.`,
    alternates: {
      canonical: `https://mimirnest.vercel.app/interview-prep/company/${rawSlug}`,
    },
    openGraph: {
      title: `${formattedName} Non-Technical Interview Questions | Mimir Nest`,
      description: `Practice non-technical, behavioral, leadership, and strategy interview questions for ${formattedName}.`,
      url: `https://mimirnest.vercel.app/interview-prep/company/${rawSlug}`,
    },
  };
}

export default function CompanyLayout({ children }) {
  return <>{children}</>;
}
