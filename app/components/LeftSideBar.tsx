import { BsTwitter } from "react-icons/bs";
import { ISession, IUser, routes } from "../utils/constants";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "../utils/Auth";
import prisma from "../utils/Db";
import PopUpPost from "./PopUpPost";
import lodash from "lodash";

export default async function LeftSideBar() {
  let user: IUser | null = null;
  const session = await getServerSession(authOptions);

  if (session) {
    user = await prisma.user.findUnique({
      where: {
        id: `${(session as ISession).user?.id}`,
      },
      include: {
        notifications: true,
      },
    });
  }

  const activeNotis = lodash.find(user?.notifications, { status: "unseen" });

  return (
    <div className="hidden sm:flex border-r border-gray-600 h-full col-span-1 p-2 flex-col items-center">
      <BsTwitter className="text-3xl text-sky-700" />
      {user && (
        <>
          <ul className="flex flex-col gap-7 mt-10 overflow-hidden">
            {routes.map((route) => (
              <li className="w-full" key={route.href}>
                {route.href === "/profile" ? (
                  <Link
                    href={`/profile/${user?.username}`}
                    className="flex items-center gap-2"
                  >
                    <route.icon className="text-2xl" />
                    <span className="hidden md:inline">{route.label}</span>
                  </Link>
                ) : route.href === "/notifications" ? (
                  <Link href={route.href} className="flex items-center gap-2">
                    <route.icon
                      className={
                        activeNotis ? "text-2xl text-red-600" : "text-2xl"
                      }
                    />
                    <span className="hidden md:inline truncate">
                      {route.label}
                    </span>
                  </Link>
                ) : (
                  <Link href={route.href} className="flex items-center gap-2">
                    <route.icon className="text-2xl" />
                    <span className="hidden md:inline truncate">
                      {route.label}
                    </span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
          <PopUpPost author={user.id} authorPhoto={user.photo} />
        </>
      )}
    </div>
  );
}
