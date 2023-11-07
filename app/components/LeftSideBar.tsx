import { BsTwitter } from "react-icons/bs";
import { ISession, IUser, routes } from "../utils/constants";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "../utils/Auth";
import { RiQuillPenLine } from "react-icons/ri";
import prisma from "../utils/Db";

export default async function LeftSideBar() {
  let user: IUser | null = null;
  const session = await getServerSession(authOptions);

  if (session) {
    user = await prisma.user.findUnique({
      where: {
        id: `${(session as ISession).user?.id}`,
      },
    });
  }

  return (
    <div className="border-r border-gray-600 h-full col-span-1 p-2 flex flex-col items-center">
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
                ) : (
                  <Link href={route.href} className="flex items-center gap-2">
                    <route.icon className="text-2xl" />
                    <span className="hidden md:inline">{route.label}</span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
          <button className="hidden lg:block btn btn-info text-white rounded-3xl w-40 mt-5">
            Post
          </button>

          <div className="flex mt-5 lg:hidden justify-center items-center w-14 h-14 rounded-full bg-info text-white">
            <RiQuillPenLine className="text-2xl" />
          </div>
        </>
      )}
    </div>
  );
}
