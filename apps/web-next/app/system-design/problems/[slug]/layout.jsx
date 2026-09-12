import { getProblemBySlug } from "../../data/problems";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;
  const problem = getProblemBySlug(slug);

  if (!problem) {
    return {
      title: "System Design Problem Not Found | Mimir Nest",
      robots: { index: false },
    };
  }

  const title = `${problem.title} — System Design Problem | Mimir Nest`;
  const description = `${problem.title} system design challenge for ${problem.company}. ${problem.description} Scale: ${problem.scale}.`;
  const canonicalUrl = `https://mimirnest.vercel.app/system-design/problems/${problem.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${problem.title} (${problem.company}) | System Design Problem`,
      description,
      url: canonicalUrl,
      type: "article",
      siteName: "Mimir Nest",
    },
    twitter: {
      card: "summary_large_image",
      title: `${problem.title} — System Design Problem`,
      description,
    },
  };
}

export default async function ProblemDetailLayout({ children, params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;
  const problem = getProblemBySlug(slug);

  if (!problem) {
    return <>{children}</>;
  }

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
        "name": "System Design",
        "item": "https://mimirnest.vercel.app/system-design"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Problems",
        "item": "https://mimirnest.vercel.app/system-design/problems"
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": problem.title,
        "item": `https://mimirnest.vercel.app/system-design/problems/${problem.slug}`
      }
    ]
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": `${problem.title} System Design Problem`,
    "description": problem.description,
    "url": `https://mimirnest.vercel.app/system-design/problems/${problem.slug}`,
    "proficiencyLevel": problem.difficulty,
    "publisher": {
      "@type": "Organization",
      "name": "Mimir Nest",
      "logo": {
        "@type": "ImageObject",
        "url": "https://mimirnest.vercel.app/logo/logo.png"
      }
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {children}
    </>
  );
}
