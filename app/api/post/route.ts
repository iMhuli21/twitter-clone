import prisma from "@/app/utils/Db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.formData();

    const id = data.get("id") as string;

    const message = data.get("message") as string;

    const pictures = data.getAll("media") as string[];

    if (!id) throw new Error("No userId");

    if (!message && !pictures) throw new Error("No message");

    if (message && pictures) {
      const createPost = await prisma.post.create({
        data: {
          body: message,
          media: pictures,
          author: {
            connect: {
              id: id,
            },
          },
        },
      });

      if (!createPost)
        throw new Error("Something went wrong, try again after a few minutes");
    } else if (message) {
      const createPost = await prisma.post.create({
        data: {
          body: message,
          author: {
            connect: {
              id: id,
            },
          },
        },
      });

      if (!createPost)
        throw new Error("Something went wrong, try again after a few minutes");
    } else if (pictures) {
      const createPost = await prisma.post.create({
        data: {
          media: pictures,
          author: {
            connect: {
              id: id,
            },
          },
        },
      });

      if (!createPost)
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

    const postId = data.get("postId") as string;

    if (!authUser) throw new Error("No auth id provided");

    if (!postId) throw new Error("No post Id provided");

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) throw new Error("Post does not exist");

    //check if the auth user is the person who made the post
    if (post.authorId === authUser) {
      const deletePost = await prisma.post.delete({
        where: {
          id: postId,
        },
      });

      if (!deletePost)
        throw new Error("Something went wrong, try again after few minutes");

      return NextResponse.json({ success: "Deleted post" }, { status: 200 });
    } else {
      throw new Error("Cannot delete a post you did not create");
    }
  } catch (error) {
    let msg;
    if (error instanceof Error) {
      msg = error.message;
    }

    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
