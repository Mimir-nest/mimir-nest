import { questionsRepository } from "@/lib/db/questionsRepository";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const id = resolvedParams?.id;
  const q = questionsRepository.getQuestionById(id);

  const canonicalUrl = `https://mimirnest.vercel.app/interview-prep/${id}`;

  if (q) {
    const cleanQuestion = q.question.replace(/\s+/g, " ").trim();
    const title = `${cleanQuestion.slice(0, 55)}... — ${q.company} Interview | Mimir Nest`;
    const description = `Practice ${q.company} ${q.category} interview question #${q.question_id}: "${cleanQuestion.slice(0, 140)}..." on Mimir Nest with STAR framework evaluation guidelines.`;

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
        type: "article",
        siteName: "Mimir Nest",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
      },
    };
  }

  return {
    title: `Interview Question #${id} | Mimir Nest`,
    description: `Company-contextualized non-technical interview practice question #${id} on Mimir Nest.`,
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function QuestionDetailLayout({ children, params }) {
  const resolvedParams = await params;
  const id = resolvedParams?.id;

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
        "name": `Question #${id}`,
        "item": `https://mimirnest.vercel.app/interview-prep/${id}`
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
