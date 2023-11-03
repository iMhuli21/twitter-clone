"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BsChevronRight, BsFillHeartbreakFill } from "react-icons/bs";
import { signOut, useSession } from "next-auth/react";
import { ISession, isCustomError, toastOptions } from "../utils/constants";
import toast from "react-hot-toast";

export default function DeactivateAccount() {
  const router = useRouter();
  const session = useSession();
  const [pending, setPending] = useState(false);

  const handleSubmit = async () => {
    if (!(session.data as ISession).user?.id) return;
    setPending(true);
    const sendReq = await fetch(
      `/api/account?id=${(session.data as ISession).user?.id}`,
      {
        method: "DELETE",
      }
    );

    const sendRes = await sendReq.json();
    setPending(false);

    if (isCustomError(sendRes)) {
      toast.error(sendRes.error, toastOptions);
      setPending(false);
    } else {
      (document as any).getElementById("my_modal_6").close();
      toast.success("Successfully deactivated your account", toastOptions);
      await signOut();
      setPending(false);
      router.push("/home");
    }
  };
  return (
    <>
      <div
        className="flex items-center gap-5 mt-3 w-full hover:cursor-pointer hover:bg-neutral p-3"
        onClick={() =>
          (document as any).getElementById("my_modal_6").showModal()
        }
      >
        <BsFillHeartbreakFill className="text-xl" />
        <div className="flex items-center gap-3 justify-between w-full">
          <div className="flex flex-col items-start gap-1">
            <h2 className="text-base">Deactivate your account</h2>
            <span className="text-xs">
              Find out how you can deactivate your account.
            </span>
          </div>
          <BsChevronRight />
        </div>
      </div>

      <dialog id="my_modal_6" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 outline-none border-none">
              ✕
            </button>
          </form>
          <div className="py-4">
            <h1 className="text-2xl font-extrabold">Deactivate Account</h1>
            <div className="mt-4"></div>
            <div className="flex flex-col items-start gap-3 pb-5">
              <h2 className="text-lg font-extrabold">
                This will deactivate your account
              </h2>
              <span>
                You&apos;re about to start the process of deactivating your
                Twitter account. Your display name, @username, and public
                profile will no longer be viewable on Twitter.com, Twitter for
                iOS, or Twitter for Android.
              </span>
            </div>
            <button
              disabled={pending}
              className="btn btn-error disabled:bg-gray-500"
              onClick={handleSubmit}
            >
              Deactivate
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
