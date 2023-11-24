"use client";

import { useRouter } from "next/navigation";
import { IComment, ISession, IUser, formatTimeAgo } from "../utils/constants";
import Link from "next/link";
import { MdVerified } from "react-icons/md";
import { BsDot } from "react-icons/bs";
import Comments from "./Comments";
import Retweets from "./Retweets";
import Likes from "./Likes";
import DeleteBtn from "./DeleteBtn";
import { useSession } from "next-auth/react";
import lodash from "lodash";

interface props {
  comment: IComment;
  author: IUser;
}

export default function Comment({ comment, author }: props) {
  let likesCount = "";
  let retweetsCount = "";
  let commentCount = "";

  const router = useRouter();
  const session = useSession();
  const loggedInUser = (session.data as ISession).user?.id as string;

  if (comment.likes) {
    likesCount =
      comment.likes.length > 999
        ? `${comment.likes.length}k`
        : `${comment.likes.length}`;
  }

  if (comment.retweets) {
    retweetsCount =
      comment.retweets.length > 999
        ? `${comment.retweets.length}k`
        : `${comment.retweets.length}`;
  }

  if (comment.replies) {
    commentCount =
      comment.replies.length > 999
        ? `${comment.replies.length}k`
        : `${comment.replies.length}`;
  }

  const alreadyRetweeted = lodash.find(comment.retweets, {
    userId: loggedInUser,
  });
  const alreadyLiked = lodash.find(comment.likes, { userId: loggedInUser });
  const alreadyCommented = lodash.find(comment.replies, {
    userId: loggedInUser,
  });

  return (
    <div
      className="flex items-start gap-3 py-2 px-4 sm:px-6 border-b border-gray-600 w-full hover:cursor-pointer hover:bg-neutral transition"
      onDoubleClick={() => router.push(`/replies/${comment.id}`)}
    >
      <img
        src={author.photo}
        alt="user profile"
        loading="lazy"
        className="object-cover object-center w-12 h-12 rounded-full"
      />
      <div className="w-full flex flex-col items-start gap-2">
        <div className="flex items-start sm:gap-2 w-full justify-between">
          <div className="flex flex-col sm:flex-row items-start gap-2 w-full">
            <Link href={`/profile/${author.username}`}>
              <h1 className="flex items-center gap-1">
                <span className="font-medium hover:border-b border-gray-500 transition">
                  {author.headerTitle}
                </span>
                <MdVerified className="text-sky-700" />
              </h1>
            </Link>

            <div className="flex items-center gap-2 text-sm">
              <span>@{author.username}</span>
              <div className="flex items-center">
                <BsDot />
                <span className="hidden sm:block">
                  {formatTimeAgo(comment.createdAt)}
                </span>
              </div>
            </div>
          </div>

          <DeleteBtn authorId={comment.userId} commentId={comment.id} />
        </div>

        <div className="flex flex-col items-start gap-2 w-full">
          <p className="w-full">{comment.body}</p>

          {comment.media.length !== 0 && (
            <div className="grid grid-cols-2 gap-4 rounded w-full place-content-between place-items-center">
              {comment.media.map((pic, i) => (
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

          <div className="flex items-center gap-2 justify-between w-full p-2">
            <Comments
              count={commentCount}
              onClick={() => router.push(`/replies/${comment.id}`)}
              active={alreadyCommented ? true : false}
            />
            <Retweets
              count={retweetsCount}
              commentId={comment.id}
              commentAuthor={comment.userId}
              active={alreadyRetweeted ? true : false}
            />
            <Likes
              count={likesCount}
              commentId={comment.id}
              commentAuthor={comment.userId}
              active={alreadyLiked ? true : false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
