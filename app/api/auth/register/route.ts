import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcrypt";
import db from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();

    const hashedPassword = await hash(password, 10);

    const existingEmail = await db.user.findFirst({
      where: {
        email,
      },
    });

    if (existingEmail)
      return NextResponse.json({
        message: "user already exists!",
        statusCode: 409,
      });

    const newUser = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
  } catch (e) {
    console.log({ e });
  }

  return NextResponse.json({ message: "user created", statusCode: 200 });
}
