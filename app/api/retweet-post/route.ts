import prisma from "@/app/utils/Db";
import lodash from "lodash";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.formData();

    const postId = data.get("postId") as string;

    const commentId = data.get("commentId") as string;

    const userId = data.get("id") as string;

    if (!userId) throw new Error("No user id provided");

    if (postId) {
      console.log("Im retweeting a post");

      //the first thing is to check if the user has retweeted the post
      const currPost = await prisma.post.findUnique({
        where: {
          id: postId,
        },
        include: {
          retweets: true,
        },
      });

      if (!currPost) throw new Error("Post does not exist");

      const alreadyRetweeted = lodash.find(currPost?.retweets, {
        postId,
        userId,
      });

      if (!alreadyRetweeted) {
        //if they havent retweeted the post yet we then retweet the post
        const likePost = await prisma.retweetPost.create({
          data: {
            userId,
            post: {
              connect: {
                id: postId,
              },
            },
          },
        });

        if (!likePost)
          throw new Error("Something went wrong, try again after few minutes");

        return NextResponse.json(
          { success: "Retweeted Post" },
          { status: 200 }
        );
      } else {
        //remove the retweet
        //update the list
        const removeLike = await prisma.retweetPost.delete({
          where: {
            id: alreadyRetweeted.id,
          },
        });

        if (!removeLike)
          throw new Error("Something went wrong, try again after few minutes");

        return NextResponse.json(
          { success: "Removed retweet" },
          { status: 200 }
        );
      }
    } else if (commentId) {
      console.log("Im retweeting a comment");
      return NextResponse.json({ success: true }, { status: 200 });
    }
  } catch (error) {
    let msg;
    if (error instanceof Error) {
      msg = error.message;
    }

    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
