import prisma from "@/app/utils/Db";
import lodash from "lodash";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.formData();

    const postId = data.get("postId") as string;

    const commentId = data.get("commentId") as string;

    const postAuthor = data.get("postAuthor") as string;

    const commentAuthor = data.get("commentAuthor") as string;

    const userId = data.get("id") as string;

    if (!userId) throw new Error("No user id provided");

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) throw new Error("No User");

    if (postId) {
      if (postAuthor) {
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
          const retweetPost = await prisma.retweetPost.create({
            data: {
              userId,
              post: {
                connect: {
                  id: postId,
                },
              },
            },
          });

          if (!retweetPost)
            throw new Error(
              "Something went wrong, try again after few minutes"
            );

          //send out notification to the post author that someone has retweeted their post
          const sendNoti = await prisma.notification.create({
            data: {
              body: `${user.username} retweeted your post:${postId}`,
              status: "unseen",
              receiver: {
                connect: {
                  id: postAuthor,
                },
              },
            },
          });

          if (!sendNoti)
            throw new Error(
              "Something went wrong, try again after a few minutes"
            );

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
            throw new Error(
              "Something went wrong, try again after few minutes"
            );

          return NextResponse.json(
            { success: "Removed retweet" },
            { status: 200 }
          );
        }
      } else {
        throw new Error("No post author");
      }
    } else if (commentId) {
      if (commentAuthor) {
        //check if they have already retweeted the comment
        const currComment = await prisma.comment.findUnique({
          where: {
            id: commentId,
          },
          include: {
            retweets: true,
          },
        });

        if (!currComment) throw new Error("Comment does not exist");

        const alreadyRetweeted = lodash.find(currComment.retweets, {
          commentId,
          userId,
        });

        if (!alreadyRetweeted) {
          //retweet comment
          //if they havent retweeted the post yet we then retweet the post
          const retweetComment = await prisma.retweetComment.create({
            data: {
              userId,
              comment: {
                connect: {
                  id: commentId,
                },
              },
            },
          });

          if (!retweetComment)
            throw new Error(
              "Something went wrong, try again after few minutes"
            );

          //send out notification to the comment author that someone has retweeted their comment
          const sendNoti = await prisma.notification.create({
            data: {
              body: `${user.username} retweeted your comment:${commentId}`,
              status: "unseen",
              receiver: {
                connect: {
                  id: commentAuthor,
                },
              },
            },
          });

          if (!sendNoti)
            throw new Error(
              "Something went wrong, try again after a few minutes"
            );

          return NextResponse.json(
            { success: "Retweeted Comment" },
            { status: 200 }
          );
        } else {
          //remove the retweet
          const removeRetweet = await prisma.retweetComment.delete({
            where: {
              id: alreadyRetweeted.id,
            },
          });

          if (!removeRetweet)
            throw new Error(
              "Something went wrong, try again after few minutes"
            );

          return NextResponse.json(
            { success: "Removed retweet" },
            { status: 200 }
          );
        }
      } else {
        throw new Error("No comment author");
      }
    }
  } catch (error) {
    let msg;
    if (error instanceof Error) {
      msg = error.message;
    }

    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
