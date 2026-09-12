import { questionsRepository } from "@/lib/db/questionsRepository";
import { findCompanyBySlug } from "@/lib/interviewPrepUtils";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const company = findCompanyBySlug(slug);
  const companyName = company?.name || slug;

  return {
    title: `${companyName} Non-Technical Interview Practice Mode | Mimir Nest`,
    description: `Interactive sequential interview practice mode for ${companyName} with STAR response blueprints, thinking workspace, and answer calibration.`,
  };
}

export default function PracticeLayout({ children }) {
  return <>{children}</>;
}
