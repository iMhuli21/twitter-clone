import Feed from "@/app/components/Feed";
import LeftSideBar from "@/app/components/LeftSideBar";
import RightSideBar from "@/app/components/RightSideBar";

export default function Home() {
  return (
    <main className="w-full grid grid-cols-6 min-h-screen">
      <LeftSideBar />
      <Feed />
      <RightSideBar />
    </main>
  );
}
