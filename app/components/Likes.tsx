"use client";

import { useSession } from "next-auth/react";
import { AiOutlineHeart } from "react-icons/ai";
import {
  ICustomMessage,
  ISession,
  isCustomError,
  toastOptions,
} from "../utils/constants";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface props {
  count: string | undefined;
  postId?: string;
  commentId?: string;
}

export default function Likes({ count, postId, commentId }: props) {
  const session = useSession();
  const router = useRouter();

  const likePost = async () => {
    const formData = new FormData();
    //get the userId
    const id = (session.data as ISession).user?.id as string;

    formData.set("id", id);

    //check if the user is liking a post or comment
    if (postId) {
      formData.set("postId", postId);

      const sendReq = await fetch("/api/like", {
        method: "POST",
        body: formData,
      });

      const sentRes = await sendReq.json();

      if (isCustomError(sentRes)) {
        toast.error(sentRes.error, toastOptions);
      } else {
        toast.success((sentRes as ICustomMessage).success, toastOptions);
        router.refresh();
      }
    } else if (commentId) {
      formData.set("commentId", commentId);

      const sendReq = await fetch("/api/like", {
        method: "POST",
        body: formData,
      });

      const sentRes = await sendReq.json();

      if (isCustomError(sentRes)) {
        toast.error(sentRes.error, toastOptions);
      } else {
        toast.success((sentRes as ICustomMessage).success, toastOptions);
        router.refresh();
      }
    }
  };

  return (
    <div className="flex items-center gap-2 hover:cursor-pointer hover:text-error transition">
      <AiOutlineHeart size={20} onClick={likePost} />
      <span className="text-sm text-gray-600">{count}</span>
    </div>
  );
}
