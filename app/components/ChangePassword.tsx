"use client";

import { useState } from "react";
import { BsChevronRight } from "react-icons/bs";
import { LiaKeySolid } from "react-icons/lia";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ISession, isCustomError, toastOptions } from "../utils/constants";
import toast from "react-hot-toast";

export default function ChangePassword() {
  const router = useRouter();
  const session = useSession();
  const [pending, setPending] = useState(false);
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    if (!password || !(session.data as ISession).user?.id) return;
    setPending(true);
    const sendReq = await fetch("/api/password", {
      method: "POST",
      body: JSON.stringify({
        password,
        id: (session.data as ISession).user?.id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const sendRes = await sendReq.json();
    setPending(false);

    if (isCustomError(sendRes)) {
      toast.error(sendRes.error, toastOptions);
    } else {
      toast.success("Successfully updated the password", toastOptions);
      (document as any).getElementById("my_modal_5").close();
      router.refresh();
    }
  };
  return (
    <>
      <div
        className="flex items-center gap-5 mt-3 w-full hover:cursor-pointer hover:bg-neutral p-3"
        onClick={() =>
          (document as any).getElementById("my_modal_5").showModal()
        }
      >
        <LiaKeySolid className="text-xl" />
        <div className="flex items-center gap-3 justify-between w-full">
          <div className="flex flex-col items-start gap-1">
            <h2 className="text-base">Change your password</h2>
            <span className="text-xs">Change your password at any time.</span>
          </div>
          <BsChevronRight />
        </div>
      </div>

      <dialog id="my_modal_5" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-base">Change password</h3>
          <span className="text-sm">Update your password.</span>
          <div className="py-4 flex flex-col items-start justify-start w-full gap-2">
            <div className="flex flex-col items-start w-full">
              <label htmlFor="password" className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="input input-bordered w-full max-w-md"
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              disabled={pending}
              className="btn btn-primary text-white w-40 mt-4 rounded-3xl disabled:bg-gray-500"
              onClick={handleSubmit}
            >
              Save
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
