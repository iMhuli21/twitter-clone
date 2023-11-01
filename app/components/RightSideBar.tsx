import Search from "./Search";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

export default function RightSideBar() {
  return (
    <div className="hidden lg:flex border-l border-gray-600 h-full col-span-2 p-3">
      <Search />
      {/* <div
        className="border p-2 border-gray-500 rounded-xl h-80 flex flex-col items-center justify-center
      shadow-lg hover:cursor-pointer max-w-md w-full"
      >
        <h1 className="font-extrabold text-center text-xl">
          Get Back in tune with what&apos;s happening
        </h1>
        <SignIn />
        <span>or</span>
        <SignUp />
      </div> */}
    </div>
  );
}
