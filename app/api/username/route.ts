import prisma from "@/app/utils/Db";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body: { username: string; id: string } = await req.json();

    if (!body.username || !body.id)
      throw new Error("No username or id provided");

    //get the users current info
    const user = await prisma.user.findUnique({
      where: {
        id: body.id,
      },
    });

    if (!user) throw new Error("User does not exist");

    //check if the updated username is the same as the current one
    if (user.username === body.username)
      throw new Error("Cannot change username to the same one");

    const updateUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        username: body.username,
      },
    });

    if (!updateUser) throw new Error("Something went wrong, try again");

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    let msg;
    if (error instanceof Error) {
      msg = error.message;
    }

    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        msg = "Username already exists, try another one";
      }
    }

    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
