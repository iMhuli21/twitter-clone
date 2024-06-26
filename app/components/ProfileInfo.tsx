import { getServerSession } from "next-auth";
import BackBtn from "./BackBtn";
import { authOptions } from "../utils/Auth";
import prisma from "../utils/Db";
import { ISession, IUser, items } from "../utils/constants";
import { BsCalendar3 } from "react-icons/bs";
import { DateTime } from "luxon";
import Tabs from "./ProfileTabs";
import EditInfo from "./EditInfo";
import { redirect } from "next/navigation";
import FollowBtn from "./FollowBtn";
import lodash from "lodash";
import PostTab from "./PostTab";
import RepliesTab from "./RepliesTab";
import RetweetsTab from "./RetweetsTab";
import LikesTab from "./LikesTab";
import CommentsTab from "./CommentsTab";
import FollowInfo from "./FollowInfo";

interface ProfileInfoProps {
  profileUser: string;
  active: string | null;
}

export default async function ProfileInfo({
  profileUser,
  active,
}: ProfileInfoProps) {
  let loggedInUser: IUser | null = null;

  const session = await getServerSession(authOptions);

  if (session) {
    loggedInUser = await prisma.user.findUnique({
      where: {
        id: (session as ISession).user?.id as string,
      },
      include: {
        posts: true,
        following: true,
      },
    });
  }

  const queriedUser = await prisma.user.findUnique({
    where: {
      username: profileUser,
    },
    include: {
      posts: true,
      followers: true,
      following: true,
    },
  });

  if (!queriedUser) {
    redirect("/home");
  }

  const userDate = queriedUser && DateTime.fromJSDate(queriedUser.createdAt);

  const alreadyFollowing = lodash.find(loggedInUser?.following, {
    followId: queriedUser.id,
    userId: loggedInUser?.id,
  });

  return (
    <div className="col-span-6 sm:col-span-5 lg:col-span-3 relative">
      <div className="flex items-center border-b p-2 gap-5 border-gray-500">
        <BackBtn />
        <div className="flex flex-col items-start ">
          <h2>@{queriedUser?.headerTitle}</h2>
          <span className="text-sm">{queriedUser?.posts.length} posts</span>
        </div>
      </div>
      <div className="h-64">
        <div className="relative">
          <div
            className="w-full h-52 bg-gray-300 absolute top-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${queriedUser.bannerImage})` }}
          ></div>
          <div className="absolute top-[9.7rem] lg:top-[9rem] flex items-end justify-between w-full px-5 py-2">
            <img
              loading="lazy"
              src={queriedUser?.photo}
              className="w-24 h-24 lg:w-28 lg:h-28 rounded-full border-2 object-cover"
              alt="user profile"
            />
            {loggedInUser?.username === queriedUser?.username ? (
              <EditInfo
                banner={queriedUser.bannerImage}
                id={queriedUser?.id}
                name={queriedUser?.headerTitle}
                photo={queriedUser?.photo}
                bio={queriedUser?.bio}
              />
            ) : (
              <FollowBtn
                followId={queriedUser.id}
                userId={loggedInUser?.id}
                alreadyFollowing={alreadyFollowing ? true : false}
              />
            )}
          </div>
        </div>
      </div>
      <div className="px-5 py-2 flex flex-col items-start gap-2 mt-2">
        <div className="flex flex-col items-start">
          <h1 className="text-lg font-medium">@{queriedUser?.headerTitle}</h1>
          <h3 className="text-xs">@{queriedUser?.username}</h3>
        </div>
        <p className="w-full">{queriedUser?.bio}</p>
        <div className="flex items-center gap-x-2">
          <BsCalendar3 />
          <span className="text-sm text-gray-500 font-medium">
            Joined {`${userDate?.monthLong}, ${userDate?.year}`}
          </span>
        </div>
        <FollowInfo
          followers={queriedUser.followers.length}
          following={queriedUser.following.length}
        />
      </div>
      <Tabs user={queriedUser} />

      {active === items[0] || !active ? (
        <PostTab user={queriedUser.id} />
      ) : active === items[1] ? (
        <RepliesTab user={queriedUser.id} />
      ) : active === items[2] ? (
        <RetweetsTab user={queriedUser.id} />
      ) : active === items[3] ? (
        <LikesTab user={queriedUser.id} />
      ) : (
        active === items[4] && <CommentsTab user={queriedUser.id} />
      )}
    </div>
  );
}
