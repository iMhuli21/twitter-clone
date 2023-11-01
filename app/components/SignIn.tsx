"use client";

import Link from "next/link";
import { BsTwitter } from "react-icons/bs";

export default function SignIn() {
  return (
    <>
      <div
        className="p-2 text capitalize border border-gray-600 rounded-3xl max-w-sm w-full mt-5
          hover:bg-neutral hover:cursor-pointer text-center"
        onClick={() =>
          (document as any).getElementById("my_modal_1").showModal()
        }
      >
        sign in
      </div>

      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle text-xl btn-ghost absolute right-2 top-2 focus:border-none focus:outline-none">
              ✕
            </button>
          </form>
          <BsTwitter className="text-2xl text-sky-700 text-center" />
          <h1 className="font-extrabold text-xl mt-3">Create your account</h1>
          <div className="py-4 w-full flex flex-col items-center justify-center gap-3">
            <div className="form-control w-full max-w-sm">
              <label htmlFor="username" className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                name="username"
                id="username"
                className="input input-bordered max-w-sm w-full"
              />
            </div>
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
                (document as any).getElementById("my_modal_2").showModal()
              }
            >
              Already have an account?
            </span>
          </div>
        </div>
      </dialog>
    </>
  );
}
