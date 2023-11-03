import prisma from "@/app/utils/Db";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);

    const id = url.searchParams.get("id") as string;

    if (!id) throw new Error("No id provided");

    const user = await prisma.user.delete({
      where: {
        id,
      },
    });

    if (!user) throw new Error("User does not exist");

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    let msg;
    if (error instanceof Error) {
      msg = error.message;
    }

    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
