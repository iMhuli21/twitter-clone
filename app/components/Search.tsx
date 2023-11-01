import { BsSearch } from "react-icons/bs";

export default function Search() {
  return (
    <div className="flex items-center gap-2 w-full h-12 input input-bordered rounded-3xl bg-neutral">
      <BsSearch className="text-xl" />
      <input
        type="text"
        name="search"
        id="search"
        placeholder="Search"
        className="bg-inherit w-full"
      />
    </div>
  );
}
