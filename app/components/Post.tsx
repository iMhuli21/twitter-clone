"use client";

import { MdVerified } from "react-icons/md";
import { IPost, IUser, formatTimeAgo } from "../utils/constants";
import { BsDot } from "react-icons/bs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Likes from "./Likes";
import Retweets from "./Retweets";
import Comments from "./Comments";
import DeleteBtn from "./DeleteBtn";

interface PostProps {
  post: IPost;
  author: IUser;
}

export default function Post({ post, author }: PostProps) {
  let likesCount = "";
  let retweetsCount = "";
  let commentCount = "";
  const router = useRouter();

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

  return (
    <div
      className="flex items-start gap-3 py-2 px-4 sm:px-6 border-b border-gray-600 w-full hover:cursor-pointer hover:bg-neutral transition"
      onDoubleClick={() => router.push(`/post/${post.id}`)}
    >
      <img
        src={author.photo}
        alt="user profile"
        loading="lazy"
        className="object-cover object-center w-12 h-12 rounded-full"
      />
      <div className="w-full flex flex-col items-start gap-2">
        <div className="flex items-center gap-2 w-full justify-between">
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
                  {formatTimeAgo(post.createdAt)}
                </span>
              </div>
            </div>
          </div>

          <DeleteBtn authorId={post.authorId} postId={post.id} />
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

          <div className="flex items-center gap-2 justify-between w-full p-2">
            <Comments
              count={commentCount}
              onClick={() => router.push(`/post/${post.id}`)}
            />
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
    </div>
  );
}
