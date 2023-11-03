import Feed from "@/app/components/Feed";
import LeftSideBar from "@/app/components/LeftSideBar";
import RightSideBar from "@/app/components/RightSideBar";

export default function Home() {
  return (
    <main className="page">
      <LeftSideBar />
      <Feed />
      <RightSideBar />
    </main>
  );
}
