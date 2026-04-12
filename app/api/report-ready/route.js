import { NextResponse } from "next/server";
import { Resend } from "resend";
import { reportReadyEmail } from "@/app/utils/emailTemplates/reportReadyEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required." },
        { status: 400 }
      );
    }

    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Your FieldSight AI Report Is Ready",
      html: reportReadyEmail(name),
    });

    return NextResponse.json({
      message: "Report-ready email sent successfully.",
      data,
    });
  } catch (error) {
    console.error("Report-ready email error:", error);
    return NextResponse.json(
      { error: "Failed to send report-ready email." },
      { status: 500 }
    );
  }
}