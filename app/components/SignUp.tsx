"use client";

import { BsTwitter } from "react-icons/bs";

export default function SignUp() {
  return (
    <>
      <div className="flex flex-col items-start w-full max-w-sm gap-2">
        <div
          className="p-2 text capitalize bg-info rounded-3xl max-w-sm w-full mt-2
           text-white hover:bg-sky-500 transition ease-in-out hover:cursor-pointer text-center"
          onClick={() =>
            (document as any).getElementById("my_modal_2").showModal()
          }
        >
          create account
        </div>
        <span className="label-text-alt">
          By siging up, you agree to the{" "}
          <span className="text-sky-700 hover:cursor-pointer">
            Terms of Service
          </span>{" "}
          and{" "}
          <span className="text-sky-700 hover:cursor-pointer">
            Privacy Policy
          </span>
          , including{" "}
          <span className="text-sky-700 hover:cursor-pointer">Cookie Use.</span>
        </span>
      </div>

      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle text-xl btn-ghost absolute right-2 top-2 focus:border-none focus:outline-none">
              ✕
            </button>
          </form>
          <BsTwitter className="text-2xl text-sky-700 text-center" />
          <h1 className="font-extrabold text-xl mt-3">Sign in your account</h1>
          <div className="py-4 w-full flex flex-col items-center justify-center gap-3">
            <div className="form-control w-full max-w-sm">
              <label htmlFor="email" className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="input input-bordered max-w-sm w-full"
              />
            </div>
            <div className="form-control w-full max-w-sm">
              <label htmlFor="password" className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="input input-bordered max-w-sm w-full"
              />
              <span className="label-text-alt mt-1">
                *Password must be have atleast one Uppercase,lowercase,symbol
                and must be min 8 chars
              </span>
            </div>

            <button className="btn btn-info rounded-3xl w-full max-w-xs text-white">
              Sign In
            </button>

            <span
              className="label-text hover:border-b hover:cursor-pointer"
              onClick={() =>
                (document as any).getElementById("my_modal_1").showModal()
              }
            >
              Don&apos;t have an account?
            </span>
          </div>
        </div>
      </dialog>
    </>
  );
}
