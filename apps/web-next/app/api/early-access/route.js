import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, github, message } = body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const payload = {
      access_key: "6c49d875-0cc9-4761-95ce-8cfc5ec1b4d1",
      name: name?.trim() || "Mimir Candidate",
      email: email.trim().toLowerCase(),
      message:
        message ||
        `Mimir Interview Early Access Application\nName: ${name || "N/A"}\nEmail: ${email}\nGitHub: ${github || "N/A"}\nTimestamp: ${new Date().toISOString()}`,
    };

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}
