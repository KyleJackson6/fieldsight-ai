import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "capstone-super-secret");

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    const { payload } = await jwtVerify(token, JWT_SECRET);
    return NextResponse.json({ user: payload });
  } catch (error) {
    // Graceful reject on expired/invalid payload
    return NextResponse.json({ user: null }, { status: 401 });
  }
}
