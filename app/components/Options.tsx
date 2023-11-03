"use client";

import AccountInfo from "./AccountInfo";
import { useRouter } from "next/navigation";
import { BiArrowBack } from "react-icons/bi";
import ChangePassword from "./ChangePassword";
import DeactivateAccount from "./DeactivateAccount";
import { IAccountProps } from "../utils/constants";

interface OptionsProps extends IAccountProps {
  state: boolean;
}

export default function Options({ state, data }: OptionsProps) {
  const router = useRouter();
  return (
    <div
      className={
        !state
          ? "hidden md:col-span-3 md:flex flex-col items-start gap-2 border-l border-gray-600"
          : "col-span-5 md:col-span-3 flex flex-col items-start gap-2 border-l border-gray-600"
      }
    >
      <div className="flex items-center gap-5 mt-3 ml-2">
        <div className="p-2 h-10 w-10 rounded-full hover:bg-gray-500 hover:cursor-pointer flex items-center justify-center hover:text-white">
          <BiArrowBack className="text-xl" onClick={() => router.back()} />
        </div>
        <h1 className="text-center tracking-wide font-bold ml-2 text-xl">
          Your account
        </h1>
      </div>
      <span className="text-sm ml-2">
        See information about your account or learn about your account
        deactivation options
      </span>

      <AccountInfo data={data} />
      <ChangePassword />
      <DeactivateAccount />
    </div>
  );
}
