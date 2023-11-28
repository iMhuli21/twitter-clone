import BackBtn from "@/app/components/BackBtn";
import FollowTabs from "@/app/components/FollowTabs";
import LeftSideBar from "@/app/components/LeftSideBar";
import RightSideBar from "@/app/components/RightSideBar";
import { authOptions } from "@/app/utils/Auth";
import prisma from "@/app/utils/Db";
import { ISession, IUser } from "@/app/utils/constants";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import lodash from "lodash";
import { MdVerified } from "react-icons/md";

interface props {
  searchParams: {
    view: string | undefined;
  };
}

export default async function FollowPage({ searchParams }: props) {
  let user: IUser | null;
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/home");
  } else {
    user = await prisma.user.findUnique({
      where: {
        id: `${(session as ISession).user?.id}`,
      },
      include: {
        followers: true,
        following: true,
      },
    });
  }

  const users = await prisma.user.findMany({
    include: {
      followers: true,
      following: true,
    },
  });

  const following = users.filter((person) =>
    lodash.find(person.followers, { followId: user?.id })
  );

  const followers = users.filter((person) =>
    lodash.find(person.following, { followId: user?.id })
  );

  return (
    <main className="page">
      <LeftSideBar />
      <div className="col-span-6 sm:col-span-5 lg:col-span-3">
        <div className="flex items-center gap-5 border-b border-gray-600 py-4 px-2">
          <BackBtn />
          <div className="flex items-start gap-1 flex-col">
            <h1>@{user?.headerTitle}</h1>
            <span className="text-sm text-gray-500">@{user?.username}</span>
          </div>
        </div>
        <FollowTabs />

        {searchParams.view === "Following" || !searchParams.view ? (
          <div className="flex flex-col">
            {following.map((follow) => (
              <div
                className="flex items-center w-full gap-4 px-4 py-2 border-b border-gray-600 hover:cursor-pointer"
                key={follow.id}
              >
                <img
                  src={follow.photo}
                  alt="user photo"
                  className="w-10 h-10 rounded-full object-cover object-center"
                />
                <div className="flex flex-col items-start">
                  <h1 className="text-base flex items-center gap-1">
                    @{follow.headerTitle}{" "}
                    <MdVerified size={15} className="text-sky-700" />
                  </h1>
                  <span className="text-sm text-gray-500">
                    @{follow.username}
                  </span>
                  <p className="text-sm">{follow.bio}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {followers.map((follow) => (
              <div
                className="flex items-center w-full gap-4 px-4 py-2 border-b border-gray-600 hover:cursor-pointer"
                key={follow.id}
              >
                <img
                  src={follow.photo}
                  alt="user photo"
                  className="w-10 h-10 rounded-full object-cover object-center"
                />
                <div className="flex flex-col items-start">
                  <h1 className="text-base flex items-center gap-1">
                    @{follow.headerTitle}{" "}
                    <MdVerified size={15} className="text-sky-700" />
                  </h1>
                  <span className="text-sm text-gray-500">
                    @{follow.username}
                  </span>
                  <p className="text-sm">{follow.bio}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <RightSideBar />
    </main>
  );
}
