import { BsTwitter } from "react-icons/bs";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";

export default function Home() {
  return (
    <main className="max-w-6xl w-full p-5 grid grid-cols-1 md:grid-cols-2 mt-10 place-content-center place-items-center gap-10 h-full">
      <BsTwitter className="text-7xl text-sky-700 mt-10" />
      <div className="w-full text-center flex flex-col gap-1 items-center justify-center">
        <h1 className="font-extrabold text-5xl tracking-wider">
          Happening now
        </h1>
        <h3 className="font-bold text-xl mt-5">Join today</h3>
        <SignIn />
        <span>or</span>
        <SignUp />
      </div>
    </main>
  );
}
