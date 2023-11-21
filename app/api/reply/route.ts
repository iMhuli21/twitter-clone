import prisma from "@/app/utils/Db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.formData();

    const commentId = data.get("commentId") as string;

    const userId = data.get("userId") as string;

    if (!userId) throw new Error("No user id provided");

    const reply = await prisma.reply.create({
      data: {
        userId,
        comment: {
          connect: {
            id: commentId,
          },
        },
      },
    });

    if (!reply)
      throw new Error("Something went wrong, try again after a few minutes");

    return NextResponse.json(
      { success: "Replied to comment" },
      { status: 200 }
    );
  } catch (error) {
    let msg;
    if (error instanceof Error) {
      msg = error.message;
    }

    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
