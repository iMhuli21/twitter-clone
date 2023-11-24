import prisma from "@/app/utils/Db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.formData();

    const userId = data.get("userId") as string;

    const postId = data.get("postId") as string;

    const message = data.get("message") as string;

    const authorId = data.get("authorId") as string;

    const pictures = data.getAll("media") as string[];

    if (!userId || !postId || !authorId)
      throw new Error("No postId or userId or authorId");

    const commentor = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!commentor) throw new Error("Commentor does not exist");

    if (!message && !pictures) throw new Error("No message");

    if (message && pictures) {
      const createComment = await prisma.comment.create({
        data: {
          body: message,
          media: pictures,
          post: {
            connect: {
              id: postId,
            },
          },
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });

      if (!createComment)
        throw new Error("Something went wrong, try again after a few minutes");
    } else if (message) {
      const createComment = await prisma.comment.create({
        data: {
          body: message,
          post: {
            connect: {
              id: postId,
            },
          },
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });

      if (!createComment)
        throw new Error("Something went wrong, try again after a few minutes");
    } else if (pictures) {
      const createComment = await prisma.comment.create({
        data: {
          media: pictures,
          post: {
            connect: {
              id: postId,
            },
          },
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });

      if (!createComment)
        throw new Error("Something went wrong, try again after a few minutes");
    }

    //send notification to the author that someone has commented under their post

    if (commentor.id === authorId) {
      const sendNoti = await prisma.notification.create({
        data: {
          body: `You commented on your post:${postId}`,
          status: "unseen",
          receiver: {
            connect: {
              id: authorId,
            },
          },
        },
      });

      if (!sendNoti)
        throw new Error("Something went wrong, try again after a few minutes");
    } else {
      const sendNoti = await prisma.notification.create({
        data: {
          body: `${commentor.username} commented on your post:${postId}`,
          status: "unseen",
          receiver: {
            connect: {
              id: authorId,
            },
          },
        },
      });

      if (!sendNoti)
        throw new Error("Something went wrong, try again after a few minutes");
    }

    return NextResponse.json({ success: true }, { status: 200 });
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

    const commentId = data.get("commentId") as string;

    if (!authUser) throw new Error("No auth id provided");

    if (!commentId) throw new Error("No comment Id provided");

    const comment = await prisma.comment.findUnique({
      where: {
        id: commentId,
      },
    });

    if (!comment) throw new Error("Comment does not exist");

    //check if the auth user is the person who made the comment
    if (comment.userId === authUser) {
      const deleteComment = await prisma.comment.delete({
        where: {
          id: commentId,
        },
      });

      if (!deleteComment)
        throw new Error("Something went wrong, try again after few minutes");

      return NextResponse.json({ success: "Deleted comment" }, { status: 200 });
    } else {
      throw new Error("Cannot delete a comment you did not create");
    }
  } catch (error) {
    let msg;
    if (error instanceof Error) {
      msg = error.message;
    }

    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
