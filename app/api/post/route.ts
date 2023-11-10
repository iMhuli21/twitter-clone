import prisma from "@/app/utils/Db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.formData();

    const id = data.get("id") as string;

    const message = data.get("message") as string;

    const pictures = data.getAll("media") as string[];

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
