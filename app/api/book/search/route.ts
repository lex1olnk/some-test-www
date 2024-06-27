import db from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query");
    if (!query)
      return NextResponse.json({ statusCode: 409, message: "field is empty" });

    const books = await db.book.findMany({
      select: {
        id: true,
        name: true,
        originalName: true,
        type: true,
        images: {
          take: 1,
        },
        Rating: true,
      },
      where: {
        name: {
          contains: query,
        },
      },
      take: 10,
    });

    const booksWithRating = books.map((book) => ({
      ...book,
      Rating:
        book.Rating &&
        book.Rating.reduce((sum, { rating }) => sum + rating, 0) /
          book.Rating.length,
    }));
    return NextResponse.json(booksWithRating);
  } catch (e) {
    return NextResponse.json({ message: "something gone wrong" });
  }
}
