import { NextResponse } from "next/server";
import { questionsRepository } from "@/lib/db/questionsRepository";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const companies = questionsRepository.getCompanies();
    return NextResponse.json({
      success: true,
      total: companies.length,
      data: companies,
    });
  } catch (error) {
    console.error("API /api/interview-prep/companies error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error fetching companies" },
      { status: 500 }
    );
  }
}
