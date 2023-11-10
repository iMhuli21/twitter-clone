"use client";

import { MdVerified } from "react-icons/md";
import { IPost, IUser, formatTimeAgo } from "../utils/constants";
import { BsDot } from "react-icons/bs";
import { AiOutlineHeart, AiOutlineRetweet } from "react-icons/ai";
import { HiOutlineChatBubbleOvalLeft } from "react-icons/hi2";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface PostProps {
  post: IPost;
  author: IUser;
}

export default function Post({ post, author }: PostProps) {
  const router = useRouter();
  return (
    <div className="flex items-start gap-3 py-2 px-4 sm:px-6 border-b border-gray-800 w-full hover:cursor-pointer hover:bg-neutral transition">
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
                {formatTimeAgo(post.createdAt)}
              </span>
            </div>
          </div>
        </div>

        <div
          className="flex flex-col items-start gap-2"
          onClick={() => router.push(`/post/${post.id}`)}
        >
          <p className="w-full">{post.body}</p>

          {post.media.length !== 0 && (
            <div className="w-full grid grid-flow-col-dense">
              {post.media.map((pic) => (
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
            <div className="flex items-center gap-2 hover:cursor-pointer hover:text-info transition">
              <HiOutlineChatBubbleOvalLeft size={20} />
              <span className="text-sm text-gray-600">10</span>
            </div>
            <div className="flex items-center gap-2 hover:cursor-pointer hover:text-success transition">
              <AiOutlineRetweet size={20} />
              <span className="text-sm text-gray-600">502</span>
            </div>
            <div className="flex items-center gap-2 hover:cursor-pointer hover:text-error transition">
              <AiOutlineHeart size={20} />
              <span className="text-sm text-gray-600">2.9k</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
