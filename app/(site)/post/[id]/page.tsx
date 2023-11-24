import BackBtn from "@/app/components/BackBtn";
import CustomPost from "@/app/components/CustomPost";
import LeftSideBar from "@/app/components/LeftSideBar";
import RightSideBar from "@/app/components/RightSideBar";
import prisma from "@/app/utils/Db";
import { redirect } from "next/navigation";

interface props {
  params: {
    id: string;
  };
}

export default async function page({ params }: props) {
  const post = await prisma.post.findUnique({
    where: {
      id: params.id,
    },
    include: {
      comments: {
        include: {
          likes: true,
          replies: true,
          retweets: true,
        },
      },
      likes: true,
      retweets: true,
    },
  });

  if (!post) {
    redirect("/home");
  }
  return (
    <main className="page">
      <LeftSideBar />
      <div className="col-span-6 sm:col-span-5 lg:col-span-3">
        <div className="py-5 border-b border-gray-600 flex items-center w-full px-2">
          <BackBtn />
          <h1 className="text-center font-extrabold text-lg w-full">Post</h1>
        </div>
        <CustomPost post={post} />
      </div>
      <RightSideBar />
    </main>
  );
}
