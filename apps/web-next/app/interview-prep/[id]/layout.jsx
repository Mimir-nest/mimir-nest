export async function generateMetadata({ params }) {
  const { id } = await params;
  return {
    title: `Interview Question #${id} | Mimir Nest`,
    description: `Company-contextualized non-technical interview practice question #${id} on Mimir Nest.`,
  };
}

export default function QuestionDetailLayout({ children }) {
  return <>{children}</>;
}
