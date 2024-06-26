"use client";

import Options from "./Options";
import { BsChevronRight } from "react-icons/bs";
import SignOut from "./SignOut";
import { IAccountProps, IUser } from "../utils/constants";
import { useRouter } from "next/navigation";

export default function Account({ data, view }: IAccountProps) {
  const router = useRouter();
  return (
    <>
      <div
        className={
          view
            ? "hidden md:col-span-2 md:flex flex-col items-start gap-2"
            : "col-span-5 md:col-span-2 flex flex-col items-start gap-2"
        }
      >
        <h1 className="text-center tracking-wide font-bold ml-2 text-xl mt-3">
          Settings
        </h1>
        <div
          className="flex items-center w-full justify-between p-3
       hover:cursor-pointer hover:bg-neutral mt-3"
          onClick={() => router.push("/settings?view=layout")}
        >
          <span>Your account</span>
          <BsChevronRight />
        </div>
        <SignOut />
      </div>
      <Options view={view} data={data} />
    </>
  );
}
