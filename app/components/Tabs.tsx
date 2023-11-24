"use client";

import { IUser, items } from "../utils/constants";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface props {
  user: IUser;
}

export default function Tabs({ user }: props) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Posts");

  const handleClick = (item: string) => {
    setActiveTab(item);
    router.push(`/profile/${user.username}?view=${item}`);
  };
  return (
    <>
      <div
        className="flex items-center w-full px-5 py-2 justify-between
     overflow-x-scroll truncate"
      >
        {items.map((item) =>
          item === activeTab ? (
            <a
              key={item}
              className="active-tab transition"
              onClick={() => handleClick(item)}
            >
              {item}
            </a>
          ) : (
            <a
              key={item}
              className="normal-tab transition"
              onClick={() => handleClick(item)}
            >
              {item}
            </a>
          )
        )}
      </div>
    </>
  );
}
