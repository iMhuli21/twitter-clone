"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function FollowTabs() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Following");
  const items = ["Following", "Followers"];

  const handleClick = (item: string) => {
    setActiveTab(item);
    router.push(`/follow?view=${item}`);
  };
  return (
    <>
      <div
        className="flex items-center w-full px-5 py-2 justify-center
     overflow-x-scroll truncate gap-5"
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
