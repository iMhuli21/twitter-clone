import { getServerSession } from "next-auth";
import Search from "./Search";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { authOptions } from "../utils/Auth";
import prisma from "../utils/Db";
import { ISession, IUser } from "../utils/constants";
import { redirect } from "next/navigation";

export default async function RightSideBar() {
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
    <div className="hidden lg:flex border-l border-gray-600 h-full col-span-2 p-3">
      {user ? (
        <Search />
      ) : (
        <div
          className="border p-2 border-gray-600 rounded-xl h-80 flex flex-col items-center justify-center
      shadow-lg hover:cursor-pointer max-w-md w-full"
        >
          <h1 className="font-extrabold text-center text-xl">
            Get Back in tune with what&apos;s happening
          </h1>
          <SignIn />
          <span>or</span>
          <SignUp />
        </div>
      )}
    </div>
  );
}
