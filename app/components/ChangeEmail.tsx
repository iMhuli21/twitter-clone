"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { IAccountProps, isCustomError, toastOptions } from "../utils/constants";

export default function ChangeEmail({ data }: IAccountProps) {
  const router = useRouter();
  const [email, setEmail] = useState(data.email);
  const [pending, setPending] = useState(false);

  const handleSubmit = async () => {
    setPending(true);
    const sendReq = await fetch("/api/email", {
      method: "POST",
      body: JSON.stringify({ email, id: data.id }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const sendRes = await sendReq.json();
    setPending(false);

    if (isCustomError(sendRes)) {
      toast.error(sendRes.error, toastOptions);
    } else {
      toast.success("Successfully updated the email", toastOptions);
      (document as any).getElementById("my_modal_4").close();
      router.refresh();
    }
  };
  return (
    <>
      <div
        className="flex flex-col items-start gap-1 p-2 w-full hover:cursor-pointer"
        onClick={() =>
          (document as any).getElementById("my_modal_4").showModal()
        }
      >
        <h4>Email</h4>
        <span className="text-xs">{data.email}</span>
      </div>

      <dialog id="my_modal_4" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 outline-none border-none">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-base">Change email</h3>
          <span className="text-sm">Update your email address.</span>
          <div className="py-4 flex flex-col items-start justify-start w-full gap-2">
            <div className="flex flex-col items-start border rounded-lg border-info w-full p-2 gap-2">
              <span className="text-sm text-info">Email</span>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border-none outline-none"
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
