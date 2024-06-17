import db from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    const existingUserByEmail = await db.user.findUnique({
      where: {
        email: { email },
      },
    });

    if (existingUserByEmail) {
      return NextResponse;
    }

    return NextResponse.json(body);
  } catch (error) {}
}
