"use client";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
  ICustomMessage,
  isCustomError,
  toastOptions,
} from "../utils/constants";
import Unfollow from "./Unfollow";

interface props {
  userId: string | null | undefined;
  followId: string | null;
  alreadyFollowing: boolean | undefined;
}
export default function FollowBtn({
  followId,
  userId,
  alreadyFollowing,
}: props) {
  const router = useRouter();
  const followUser = async () => {
    if (!followId || !userId) {
      toast.error("No follow Id or User Id provided", toastOptions);
      return;
    }
    const formData = new FormData();

    formData.set("followId", followId);
    formData.set("userId", userId);

    const sendReq = await fetch("/api/follow", {
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
  };
  return (
    <>
      {alreadyFollowing ? (
        <Unfollow followId={followId} userId={userId} />
      ) : (
        <button
          className="btn btn-info text-white rounded-3xl"
          onClick={followUser}
        >
          Follow
        </button>
      )}
    </>
  );
}
