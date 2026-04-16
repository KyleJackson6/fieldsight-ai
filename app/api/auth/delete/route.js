import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { prisma } from "@/lib/prisma";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "capstone-super-secret");

export async function DELETE() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify token to get user ID
    const { payload } = await jwtVerify(token, JWT_SECRET);
    
    // Delete the user from the database.
    // Thanks to relation(onDelete: Cascade) in Prisma schema, all their Field and AnalysisReports are deleted too.
    await prisma.farmer.delete({
      where: { id: payload.id }
    });

    // Clear the authenticated cookie session to log them out instantly
    cookieStore.delete("auth_token");

    return NextResponse.json({ message: "Account entirely wiped completely and permanently." });
  } catch (error) {
    console.error("Deletion error:", error);
    return NextResponse.json({ error: "Failed to delete account" }, { status: 500 });
  }
}
