import Link from "next/link";
import prisma from "../utils/Db";
import { IPost, ISession } from "../utils/constants";
import { MdVerified } from "react-icons/md";
import { BsDot } from "react-icons/bs";
import { DateTime } from "luxon";
import Likes from "./Likes";
import Comments from "./Comments";
import Retweets from "./Retweets";
import { getServerSession } from "next-auth";
import { authOptions } from "../utils/Auth";
import CreateComment from "./CreateComment";
import CommentContainer from "./CommentContainer";

interface props {
  post: IPost;
}

export default async function CustomPost({ post }: props) {
  let likesCount = "";
  let retweetsCount = "";
  let commentCount = "";
  const session = await getServerSession(authOptions);

  if (post.likes) {
    likesCount =
      post.likes.length > 999
        ? `${post.likes.length}k`
        : `${post.likes.length}`;
  }

  if (post.retweets) {
    retweetsCount =
      post.retweets.length > 999
        ? `${post.retweets.length}k`
        : `${post.retweets.length}`;
  }

  if (post.comments) {
    commentCount =
      post.comments.length > 999
        ? `${post.comments.length}k`
        : `${post.comments.length}`;
  }
  const authorInformation = await prisma.user.findUnique({
    where: {
      id: post?.authorId,
    },
  });

  const postDate = DateTime.fromISO(post.createdAt.toISOString());

  const loggedInUser = await prisma.user.findUnique({
    where: {
      id: `${(session as ISession).user?.id}`,
    },
  });

  if (!authorInformation) return "User does not exist";
  return (
    <div className="flex flex-col items-start w-full hover:cursor-pointer">
      <div className="w-full flex flex-col items-start gap-2 py-2 px-4 sm:px-6">
        <div className="flex items-center gap-2 w-full">
          <img
            src={authorInformation.photo}
            alt="user profile"
            loading="lazy"
            className="object-cover object-center w-12 h-12 rounded-full"
          />
          <Link href={`/profile/${authorInformation.username}`}>
            <h1 className="flex items-center gap-1">
              <span className="font-medium hover:border-b border-gray-500 transition">
                {authorInformation.headerTitle}
              </span>
              <MdVerified className="text-sky-700" />
            </h1>
          </Link>

          <div className="flex items-center gap-2 text-sm">
            <span>@{authorInformation.username}</span>
          </div>
        </div>

        <div className="flex flex-col items-start gap-2 w-full">
          <p className="w-full">{post.body}</p>

          {post.media.length !== 0 && (
            <div className="grid grid-cols-2 gap-4 rounded w-full place-content-between place-items-center">
              {post.media.map((pic, i) => (
                <a
                  href={pic}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                  key={i}
                >
                  <img
                    src={pic}
                    alt="picture"
                    loading="lazy"
                    className="object-cover object-center max-w-xs w-full rounded-xl hover:cursor-pointer"
                  />
                </a>
              ))}
            </div>
          )}

          <div className="flex items-center gap-1 text-sm text-gray-500 py-2">
            <span>{postDate.toLocaleString(DateTime.TIME_SIMPLE)}</span>
            <BsDot />
            <span>
              {postDate.monthShort} {postDate.day}, {postDate.year}
            </span>
          </div>

          <div className="flex items-center gap-2 justify-between w-full p-2 border-t border-b border-gray-600">
            <Comments count={commentCount} />
            <Retweets
              count={retweetsCount}
              postId={post.id}
              postAuthor={post.authorId}
            />
            <Likes
              count={likesCount}
              postId={post.id}
              postAuthor={post.authorId}
            />
          </div>
        </div>
      </div>

      {loggedInUser && (
        <CreateComment
          photo={loggedInUser.photo}
          postId={post.id}
          userId={loggedInUser.id}
          authorId={post.authorId}
        />
      )}

      <div className="w-full">
        {post?.comments?.map((comment) => (
          <CommentContainer key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
}
