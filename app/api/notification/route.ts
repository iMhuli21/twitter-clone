import prisma from "@/app/utils/Db";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  try {
    const url = new URL(req.url);

    const notiId = url.searchParams.get("id");

    if (!notiId) throw new Error("No noti Id");

    const updateNoti = await prisma.notification.update({
      where: {
        id: notiId,
      },
      data: {
        status: "seen",
      },
    });

    if (!updateNoti)
      throw new Error("Something went wrong, try again after a few minutes");

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    let msg;
    if (error instanceof Error) {
      msg = error.message;
    }

    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
