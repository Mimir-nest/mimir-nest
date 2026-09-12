import { questionsRepository } from "@/lib/db/questionsRepository";

export async function generateMetadata({ params }) {
  const { id, slug } = await params;
  const q = questionsRepository.getQuestionById(id);

  if (q) {
    const cleanQuestion = q.question.replace(/\s+/g, " ").trim();
    const title = `${cleanQuestion.slice(0, 55)}... — ${q.company} Interview Question | Mimir Nest`;
    return {
      title,
      description: `Practice ${q.company} ${q.category} interview question #${q.question_id}: "${cleanQuestion.slice(0, 140)}..." on Mimir Nest with STAR framework and response blueprints.`,
    };
  }

  return {
    title: `Interview Question #${id} | Mimir Nest`,
    description: `Company-contextualized non-technical interview practice question #${id} on Mimir Nest.`,
  };
}

export default function CompanyQuestionLayout({ children }) {
  return <>{children}</>;
}
