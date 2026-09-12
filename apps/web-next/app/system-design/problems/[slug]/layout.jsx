import { getProblemBySlug } from "../../data/problems";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const problem = getProblemBySlug(slug);

  if (!problem) {
    return {
      title: "System Design Problem Not Found | Mimir Nest",
    };
  }

  return {
    title: `${problem.title} — System Design Challenge | Mimir Nest`,
    description: problem.description,
    openGraph: {
      title: `${problem.title} (${problem.company}) | System Design Problem`,
      description: problem.description,
    },
  };
}

export default function ProblemDetailLayout({ children }) {
  return <>{children}</>;
}
