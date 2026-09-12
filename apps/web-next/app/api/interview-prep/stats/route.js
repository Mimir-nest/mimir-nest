import { NextResponse } from "next/server";
import { questionsRepository } from "@/lib/db/questionsRepository";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const stats = questionsRepository.getStats();
    return NextResponse.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error("API /api/interview-prep/stats error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error fetching stats" },
      { status: 500 }
    );
  }
}
