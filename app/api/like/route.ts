import prisma from "@/app/utils/Db";
import lodash from "lodash";
import { NextResponse } from "next/server";
import { send } from "process";

export async function POST(req: Request) {
  try {
    const data = await req.formData();

    const postId = data.get("postId") as string;

    const commentId = data.get("commentId") as string;

    const userId = data.get("id") as string;

    const postAuthor = data.get("postAuthor") as string;

    const commentAuthor = data.get("commentAuthor") as string;

    if (!userId) throw new Error("No user id provided");

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) throw new Error("No User");

    if (postId) {
      if (postAuthor) {
        //the first thing is to check if the user has liked the post
        const currPost = await prisma.post.findUnique({
          where: {
            id: postId,
          },
          include: {
            likes: true,
          },
        });

        if (!currPost) throw new Error("Post does not exist");

        const alreadyLiked = lodash.find(currPost?.likes, { postId, userId });

        if (!alreadyLiked) {
          //if they havent liked the post yet we then like the post
          const likePost = await prisma.likePost.create({
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
            throw new Error(
              "Something went wrong, try again after few minutes"
            );

          //send notification to the author of the post the someone has like their post
          if (user.id === postAuthor) {
            const sendNoti = await prisma.notification.create({
              data: {
                body: `You liked your post:${postId}`,
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
          } else {
            const sendNoti = await prisma.notification.create({
              data: {
                body: `${user.username} liked your post:${postId}`,
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
          }

          return NextResponse.json({ success: "Liked Post" }, { status: 200 });
        } else {
          //remove the like
          //update the list
          const removeLike = await prisma.likePost.delete({
            where: {
              id: alreadyLiked.id,
            },
          });

          if (!removeLike)
            throw new Error(
              "Something went wrong, try again after few minutes"
            );

          return NextResponse.json(
            { success: "Removed Like" },
            { status: 200 }
          );
        }
      } else {
        throw new Error("No postAuthor provided");
      }
    } else if (commentId) {
      if (commentAuthor) {
        //check if the user has liked the comment
        const currComment = await prisma.comment.findUnique({
          where: {
            id: commentId,
          },
          include: {
            likes: true,
          },
        });

        if (!currComment) throw new Error("Comment does not exist");

        const alreadyLiked = lodash.find(currComment.likes, {
          commentId,
          userId,
        });

        if (!alreadyLiked) {
          //like the comment
          const likeComment = await prisma.likeComment.create({
            data: {
              userId,
              comment: {
                connect: {
                  id: commentId,
                },
              },
            },
          });

          if (!likeComment)
            throw new Error(
              "Something went wrong, try again after a few minutes"
            );

          //send out notification to the commment author that someone has liked their comment
          if (user.id === commentAuthor) {
            const sendNoti = await prisma.notification.create({
              data: {
                body: `You liked your comment:${commentId}`,
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
          } else {
            const sendNoti = await prisma.notification.create({
              data: {
                body: `${user.username} liked your comment:${commentId}`,
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
          }

          return NextResponse.json(
            { success: "Liked Comment" },
            { status: 200 }
          );
        } else {
          //remove like on comment
          const removeLike = await prisma.likeComment.delete({
            where: {
              id: alreadyLiked.id,
            },
          });

          if (!removeLike)
            throw new Error(
              "Something went wrong, try again after few minutes"
            );

          return NextResponse.json(
            { success: "Removed Like" },
            { status: 200 }
          );
        }
      } else {
        throw new Error("No commentAuthor provided");
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
