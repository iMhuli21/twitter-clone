import prisma from "@/app/utils/Db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.formData();

    const commentId = data.get("commentId") as string;

    const commentorId = data.get("commentorId") as string;

    const userId = data.get("userId") as string;

    const message = data.get("message") as string;

    const pictures = data.getAll("media") as string[];

    if (!userId || !commentId)
      throw new Error("No user id or comment id provided");

    const commentor = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!commentor) throw new Error("Commentor does not exist");

    if (!message && !pictures) throw new Error("No message");

    if (message && pictures) {
      const createReply = await prisma.reply.create({
        data: {
          userId,
          body: message,
          media: pictures,
          comment: {
            connect: {
              id: commentId,
            },
          },
        },
      });

      if (!createReply)
        throw new Error("Something went wrong, try again after a few mintues");

      return NextResponse.json({ success: "Sent Reply" }, { status: 200 });
    } else if (message) {
      const createReply = await prisma.reply.create({
        data: {
          userId,
          comment: {
            connect: {
              id: commentId,
            },
          },
          body: message,
        },
      });

      if (!createReply)
        throw new Error("Something went wrong, try again after a few mintues");

      return NextResponse.json({ success: "Sent Reply" }, { status: 200 });
    } else if (pictures) {
      const createReply = await prisma.reply.create({
        data: {
          userId,
          comment: {
            connect: {
              id: commentId,
            },
          },
          media: pictures,
        },
      });

      if (!createReply)
        throw new Error("Something went wrong, try again after a few mintues");

      //send notification to the author that someone has commented under their post

      const sendNoti = await prisma.notification.create({
        data: {
          body: `${commentor.username} commented on your comment:${commentId}`,
          status: "unseen",
          receiver: {
            connect: {
              id: commentorId,
            },
          },
        },
      });

      if (!sendNoti)
        throw new Error("Something went wrong, try again after a few minutes");

      return NextResponse.json({ success: "Sent Reply" }, { status: 200 });
    }
  } catch (error) {
    let msg;
    if (error instanceof Error) {
      msg = error.message;
    }

    return NextResponse.json({ error: msg }, { status: 400 });
  }
}

export async function DELETE(req: Request) {
  try {
    const data = await req.formData();

    const authUser = data.get("authUser") as string;

    const replyId = data.get("replyId") as string;

    if (!authUser) throw new Error("No auth id provided");

    if (!replyId) throw new Error("No reply Id provided");

    const reply = await prisma.reply.findUnique({
      where: {
        id: replyId,
      },
    });

    if (!reply) throw new Error("Reply does not exist");

    //check if the auth user is the person who made the reply
    if (reply.userId === authUser) {
      const deleteReply = await prisma.reply.delete({
        where: {
          id: replyId,
        },
      });

      if (!deleteReply)
        throw new Error("Something went wrong, try again after few minutes");

      return NextResponse.json({ success: "Deleted reply" }, { status: 200 });
    } else {
      throw new Error("Cannot delete a reply you did not create");
    }
  } catch (error) {
    let msg;
    if (error instanceof Error) {
      msg = error.message;
    }

    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
