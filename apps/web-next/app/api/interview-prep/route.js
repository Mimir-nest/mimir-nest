import { NextResponse } from "next/server";
import { questionsRepository } from "@/lib/db/questionsRepository";

export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    const company = searchParams.get("company") || undefined;
    const category = searchParams.get("category") || undefined;
    const difficulty = searchParams.get("difficulty") || undefined;
    const industry = searchParams.get("industry") || undefined;
    const role = searchParams.get("role") || undefined;
    const interview_stage = searchParams.get("interview_stage") || undefined;
    const q = searchParams.get("q") || undefined;
    const limit = parseInt(searchParams.get("limit") || "50", 10);
    const offset = parseInt(searchParams.get("offset") || "0", 10);
    const sort = searchParams.get("sort") || "question_id ASC";

    const result = questionsRepository.queryQuestions({
      company,
      category,
      difficulty,
      industry,
      role,
      interview_stage,
      q,
      limit,
      offset,
      sort,
    });

    const filterOptions = questionsRepository.getFilterOptions();

    return NextResponse.json({
      success: true,
      data: result.questions,
      pagination: {
        total: result.total,
        limit: result.limit,
        offset: result.offset,
        hasMore: result.offset + result.limit < result.total,
      },
      filters: filterOptions,
      meta: {
        disclaimer:
          "These interview questions represent draft scenario frameworks contextualized for company domains. Quality status is draft_review_required.",
      },
    });
  } catch (error) {
    console.error("API /api/interview-prep error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error querying questions" },
      { status: 500 }
    );
  }
}
