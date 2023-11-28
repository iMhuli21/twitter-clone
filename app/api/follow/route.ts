import prisma from "@/app/utils/Db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.formData();

    const followId = data.get("followId") as string;

    const userId = data.get("userId") as string;

    if (!followId || !userId) throw new Error("No userId or followId provided");

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) throw new Error("User does not exist");

    //we check if the person is already following them
    const alreadyFollowing = await prisma.following.findFirst({
      where: {
        userId,
        followId,
      },
    });
    //start following the person
    if (!alreadyFollowing) {
      const follow = await prisma.following.create({
        data: {
          followId,
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });

      //add the follower on the other side
      const follower = await prisma.followers.create({
        data: {
          user: {
            connect: {
              id: followId,
            },
          },
          followId: userId,
        },
      });

      const sendNoti = await prisma.notification.create({
        data: {
          body: `${user.username} has started to follow you`,
          status: "unseen",
          receiver: {
            connect: {
              id: followId,
            },
          },
        },
      });

      if (!follow || !follower || !sendNoti)
        throw new Error("Something went wrong, try again after a few minutes");
      return NextResponse.json(
        { success: "Started following" },
        { status: 200 }
      );
    } else {
      throw new Error("Already Following");
    }
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

    const userId = data.get("userId") as string;

    const followId = data.get("followId") as string;

    if (!userId || !followId) throw new Error("No userId or followId provided");

    const confirmFollow = await prisma.following.findFirst({
      where: {
        userId,
        followId,
      },
    });

    if (!confirmFollow)
      throw new Error("Cannot unfollow someone you are not following");
    else {
      const unfollow = await prisma.following.delete({
        where: {
          id: confirmFollow.id,
        },
      });

      if (!unfollow)
        throw new Error(
          "Something went wrong, trying to remove the follow of the user side"
        );

      //update it on the once followed person's side
      const myfollower = await prisma.followers.findFirst({
        where: {
          userId: followId,
          followId: userId,
        },
      });

      if (!myfollower) throw new Error("You are not a follower");

      const updateFollowers = await prisma.followers.delete({
        where: {
          id: myfollower.id,
        },
      });

      if (!updateFollowers)
        throw new Error(
          "Something went wrong, trying to remove the follower on the follow side"
        );
      return NextResponse.json({ sucess: "Unfollowed" }, { status: 200 });
    }
  } catch (error) {
    let msg;
    if (error instanceof Error) {
      msg = error.message;
    }

    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
