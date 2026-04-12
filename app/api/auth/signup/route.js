import { NextResponse } from "next/server";
import { Resend } from "resend";
import { welcomeEmail } from "@/app/utils/emailTemplates/welcomeEmail";

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
      subject: "Welcome to FieldSight AI",
      html: welcomeEmail(name),
    });

    return NextResponse.json({
      message: "Signup successful and welcome email sent.",
      data,
    });
  } catch (error) {
    console.error("Signup email error:", error);
    return NextResponse.json(
      { error: "Failed to send welcome email." },
      { status: 500 }
    );
  }
}