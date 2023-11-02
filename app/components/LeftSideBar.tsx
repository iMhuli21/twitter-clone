import { BsTwitter } from "react-icons/bs";
import { routes } from "../utils/constants";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "../utils/Auth";

export default async function LeftSideBar() {
  const session = await getServerSession(authOptions);
  return (
    <div className="border-r border-gray-600 h-full col-span-1 p-2 flex flex-col items-center">
      <BsTwitter className="text-3xl text-sky-700" />
      {session?.user && (
        <ul className="flex flex-col gap-7 mt-10 overflow-hidden">
          {routes.map((route) => (
            <li className="w-full" key={route.href}>
              <Link href={route.href} className="flex items-center gap-2">
                <route.icon className="text-2xl" />
                <span className="hidden md:inline">{route.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
