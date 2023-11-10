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

export async function PUT(req: Request) {
  try {
    const data = await req.formData();

    const id = data.get("id") as string;

    const headerTitle = data.get("headerTitle") as string;

    const bio = data.get("bio") as string;

    const bannerImage = data.get("bannerImage") as string;

    const profileImage = data.get("profilePicture") as string;

    if (!headerTitle || !bio || !id)
      throw new Error(
        "All Fields are required, ensure all fields are filled in"
      );

    if (profileImage && bannerImage) {
      const updateUser = await prisma.user.update({
        where: {
          id,
        },
        data: {
          bio,
          headerTitle,
          photo: profileImage,
          bannerImage,
        },
      });

      if (!updateUser)
        throw new Error("Something went wrong try again after a few minutes");
    } else if (profileImage) {
      const updateUser = await prisma.user.update({
        where: {
          id,
        },
        data: {
          bio,
          headerTitle,
          photo: profileImage,
        },
      });

      if (!updateUser)
        throw new Error("Something went wrong try again after a few minutes");
    } else if (bannerImage) {
      const updateUser = await prisma.user.update({
        where: {
          id,
        },
        data: {
          bio,
          headerTitle,
          bannerImage,
        },
      });
      if (!updateUser)
        throw new Error("Something went wrong try again after a few minutes");
    } else {
      const updateUser = await prisma.user.update({
        where: {
          id,
        },
        data: {
          bio,
          headerTitle,
        },
      });

      if (!updateUser)
        throw new Error("Something went wrong try again after a few minutes");
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
