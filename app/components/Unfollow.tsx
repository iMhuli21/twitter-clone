"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { isCustomError, toastOptions } from "../utils/constants";

interface props {
  userId: string | null | undefined;
  followId: string | null;
}

export default function Unfollow({ userId, followId }: props) {
  const router = useRouter();
  const [isPending, setPending] = useState(false);
  const unfollowUser = async () => {
    setPending(true);
    if (!userId || !followId) {
      toast.error("No userId or followId provided");
      setPending(false);
      return;
    }

    const formData = new FormData();

    formData.set("userId", userId);
    formData.set("followId", followId);

    const sendReq = await fetch("/api/follow", {
      method: "PUT",
      body: formData,
    });

    const sentRes = await sendReq.json();

    if (isCustomError(sentRes)) {
      toast.error(sentRes.error, toastOptions);
      (document as any).getElementById("my_modal_21").close();
    } else {
      (document as any).getElementById("my_modal_21").close();
      toast.success("Unfollowed", toastOptions);
      setPending(false);
      router.refresh();
    }
  };
  return (
    <>
      <button
        className="btn btn-ghost rounded-3xl border border-gray-600 "
        onClick={() =>
          (document as any).getElementById("my_modal_21").showModal()
        }
      >
        Following
      </button>
      <dialog id="my_modal_21" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 outline-none border-none">
              ✕
            </button>
          </form>
          <h2 className="font-extrabold text-xl">Unfollow?</h2>
          <p className="py-4">Are you sure you want to unfollow</p>
          <div className="flex items-center gap-2 mt-4">
            <button
              disabled={isPending}
              className="btn btn-warning disabled:bg-gray-500"
              onClick={unfollowUser}
            >
              Yes, I&apos;m sure
            </button>
            <button
              disabled={isPending}
              className="btn btn-neutral disabled:bg-gray-500"
              onClick={() =>
                (document as any).getElementById("my_modal_21").close()
              }
            >
              No, cancel
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
