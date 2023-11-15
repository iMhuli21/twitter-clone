"use client";

import { useRouter } from "next/navigation";
import { IComment, IUser, formatTimeAgo } from "../utils/constants";
import Link from "next/link";
import { MdVerified } from "react-icons/md";
import { BsDot } from "react-icons/bs";
import Comments from "./Comments";
import Retweets from "./Retweets";
import Likes from "./Likes";

interface props {
  comment: IComment;
  author: IUser;
}

export default function Comment({ comment, author }: props) {
  let likesCount = "";
  let retweetsCount = "";
  const router = useRouter();

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

  return (
    <div className="flex items-start gap-3 py-2 px-4 sm:px-6 border-b border-gray-600 w-full hover:cursor-pointer hover:bg-neutral transition">
      <img
        src={author.photo}
        alt="user profile"
        loading="lazy"
        className="object-cover object-center w-12 h-12 rounded-full"
      />
      <div className="w-full flex flex-col items-start gap-2">
        <div className="flex items-center gap-2 w-full">
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

        <div className="flex flex-col items-start gap-2 w-full">
          <p className="w-full">{comment.body}</p>

          {comment.media.length !== 0 && (
            <div className="w-full grid grid-flow-col-dense">
              {comment.media.map((pic) => (
                <a
                  href={pic}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <img
                    src={pic}
                    alt="picture"
                    loading="lazy"
                    className="object-cover object-center w-52 h-52  group-first:col-span-2 group-last:rounded-tr-lg group-last:rounded-br-lg group-first:first:rounded-tl-lg group-first:rounded-bl-lg"
                  />
                </a>
              ))}
            </div>
          )}

          <div className="flex items-center gap-2 justify-between w-full p-2">
            <Comments count={0} />
            <Retweets count={retweetsCount} commentId={comment.id} />
            <Likes count={likesCount} commentId={comment.id} />
          </div>
        </div>
      </div>
    </div>
  );
}
