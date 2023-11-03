"use client";

import { useState } from "react";
import { BsChevronRight, BsPerson } from "react-icons/bs";
import ChangeUsername from "./ChangeUsername";
import ChangeEmail from "./ChangeEmail";
import { IAccountProps } from "../utils/constants";

export default function AccountInfo({ data }: IAccountProps) {
  const [showContent, setShowContent] = useState(true);
  return (
    <>
      <div
        className="flex items-center gap-5 mt-3 w-full hover:cursor-pointer hover:bg-neutral p-3"
        onClick={() => setShowContent(!showContent)}
      >
        <BsPerson className="text-xl" />
        <div className="flex items-center gap-3 justify-between w-full">
          <div className="flex flex-col items-start gap-1">
            <h2 className="text-base">Account information</h2>
            <span className="text-xs">
              See you account information like your email address.
            </span>
          </div>
          <BsChevronRight className={showContent && "rotate-90"} />
        </div>
      </div>

      {showContent && (
        <div className="flex flex-col items-start gap-4 ml-5 ">
          <ChangeUsername data={data} />
          <ChangeEmail data={data} />
        </div>
      )}
    </>
  );
}
