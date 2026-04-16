import { NextResponse } from "next/server";

import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import { cookies } from "next/headers";

import { prisma } from "@/lib/prisma";
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "capstone-super-secret");

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
    }

    const user = await prisma.farmer.findFirst({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
    }

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

    return NextResponse.json({ message: "Login successful.", user: { name: user.fullName, email: user.email }});
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
