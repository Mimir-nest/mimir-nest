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

    return NextResponse.json({
      success: true,
      data: question,
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
