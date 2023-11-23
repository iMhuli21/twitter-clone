import LeftSideBar from "@/app/components/LeftSideBar";
import RightSideBar from "@/app/components/RightSideBar";
import Search from "@/app/components/Search";

export default function SearchPage() {
  return (
    <main className="page">
      <LeftSideBar />
      <div className="col-span-5 lg:col-span-3 px-5 py-4">
        <Search />
      </div>
    </main>
  );
}
