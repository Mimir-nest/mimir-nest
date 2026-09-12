import { NextResponse } from "next/server";
import { questionsRepository } from "@/lib/db/questionsRepository";

export const dynamic = "force-dynamic";

export async function GET(request, context) {
  try {
    const params = await context.params;
    const { id } = params;

    const question = questionsRepository.getQuestionById(id);

    if (!question) {
      return NextResponse.json(
        { success: false, error: `Question with ID '${id}' not found` },
        { status: 404 }
      );
    }

    // Fetch related questions and sequence within the same company or category
    const companyRes = questionsRepository.queryQuestions({
      company: question.company,
      limit: 100,
    });
    const companyList = companyRes.questions || [];
    const currentIndex = companyList.findIndex(
      (q) =>
        q.question_id?.toLowerCase() === question.question_id?.toLowerCase() ||
        String(q.id) === String(question.id)
    );

    const prevQuestion =
      currentIndex > 0
        ? {
            question_id: companyList[currentIndex - 1].question_id,
            question: companyList[currentIndex - 1].question,
            category: companyList[currentIndex - 1].category,
            difficulty: companyList[currentIndex - 1].difficulty,
          }
        : null;

    const nextQuestion =
      currentIndex >= 0 && currentIndex < companyList.length - 1
        ? {
            question_id: companyList[currentIndex + 1].question_id,
            question: companyList[currentIndex + 1].question,
            category: companyList[currentIndex + 1].category,
            difficulty: companyList[currentIndex + 1].difficulty,
          }
        : null;

    // 3-4 related questions (same company or same category, not current)
    let related = companyList.filter(
      (q) =>
        q.question_id?.toLowerCase() !== question.question_id?.toLowerCase() &&
        String(q.id) !== String(question.id)
    );

    if (related.length < 4) {
      const categoryRes = questionsRepository.queryQuestions({
        category: question.category,
        limit: 10,
      });
      const catList = categoryRes.questions || [];
      const additional = catList.filter(
        (q) =>
          q.question_id?.toLowerCase() !== question.question_id?.toLowerCase() &&
          !related.some((r) => r.question_id === q.question_id)
      );
      related = [...related, ...additional];
    }

    const relatedQuestions = related.slice(0, 4).map((q) => ({
      question_id: q.question_id,
      company: q.company,
      category: q.category,
      difficulty: q.difficulty,
      question: q.question,
      expected_time: q.expected_time,
    }));

    return NextResponse.json({
      success: true,
      data: question,
      relatedQuestions,
      prevQuestion,
      nextQuestion,
      meta: {
        provenance: {
          source: question.source,
          license_usage_rights: question.license_usage_rights,
          quality_status: question.quality_status,
          last_reviewed: question.last_reviewed,
        },
      },
    });
  } catch (error) {
    console.error("API /api/interview-prep/[id] error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error fetching question detail" },
      { status: 500 }
    );
  }
}
