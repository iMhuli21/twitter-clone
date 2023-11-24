"use client";

import { useState } from "react";
import { IUser, routes } from "../utils/constants";
import { BsTwitter } from "react-icons/bs";
import Link from "next/link";
import lodash from "lodash";

interface props {
  user: IUser | null;
}

export default function SidePanel({ user }: props) {
  const [showSidePanel, setShowSidePanel] = useState(false);
  const activeNotis = lodash.find(user?.notifications, { status: "unseen" });

  return (
    <>
      <div
        className="flex items-start sm:hidden p-2"
        onClick={() => setShowSidePanel(!showSidePanel)}
      >
        <img
          src={user?.photo}
          alt="user profile"
          className="w-10 h-10 rounded-full object-cover object-center brightness-90"
        />
      </div>

      {showSidePanel && (
        <div className="fixed z-50 left-0 top-0 w-64 min-h-full bg-base-100 px-5">
          <h1 className="text-center font-extrabold w-full py-2">ChirHub</h1>
          <div className="flex items-center justify-between w-full p-2">
            <BsTwitter className="text-sky-700" size={25} />
            <button
              className="btn btn-sm btn-circle text-xl btn-ghost focus:border-none focus:outline-none"
              onClick={() => setShowSidePanel(!showSidePanel)}
            >
              ✕
            </button>
          </div>
          <ul className="flex flex-col gap-7 mt-10">
            {routes.map((route) => (
              <li className="w-full" key={route.href}>
                {route.href === "/profile" ? (
                  <Link
                    href={`/profile/${user?.username}`}
                    className="flex items-center gap-2"
                  >
                    <route.icon className="text-2xl" />
                    <span>{route.label}</span>
                  </Link>
                ) : route.href === "/notifications" ? (
                  <Link href={route.href} className="flex items-center gap-2">
                    <route.icon
                      className={
                        activeNotis ? "text-2xl text-red-600" : "text-2xl"
                      }
                    />
                    <span>{route.label}</span>
                  </Link>
                ) : (
                  <Link href={route.href} className="flex items-center gap-2">
                    <route.icon className="text-2xl" />
                    <span>{route.label}</span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
