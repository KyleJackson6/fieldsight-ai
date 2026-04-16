import { NextResponse } from "next/server";

import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import { Resend } from "resend";
import { welcomeEmail } from "@/app/utils/emailTemplates/welcomeEmail";
import { cookies } from "next/headers";

import { prisma } from "@/lib/prisma";
const resend = new Resend(process.env.RESEND_API_KEY || 're_mock'); 
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "capstone-super-secret");

export async function POST(request) {
  try {
    const { name, email, password } = await request.json();

    if (!email || !password || !name) {
      return NextResponse.json({ error: "Name, email, and password are required." }, { status: 400 });
    }

    const existingUser = await prisma.farmer.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: "Email already in use." }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.farmer.create({
      data: {
        fullName: name,
        email,
        password: hashedPassword,
      },
    });

    const token = await new SignJWT({ id: user.id, email: user.email, name: user.fullName })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("7d")
      .sign(JWT_SECRET);

    const cookieStore = await cookies();
    cookieStore.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    });

    // Trigger onboarding email gracefully
    if (process.env.RESEND_API_KEY) {
      resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Welcome to FieldSight AI",
        html: welcomeEmail(name),
      }).catch(console.error);
    }

    return NextResponse.json({ message: "Account setup successfully." });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}