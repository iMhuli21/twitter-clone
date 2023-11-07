"use client";

import { useRouter } from "next/navigation";
import { BsTwitter } from "react-icons/bs";
import { FieldValues, useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { toastOptions } from "../utils/constants";

export default function LandingSignIn() {
  const router = useRouter();
  const {
    register,
    reset,
    formState: { isSubmitting },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    const loginUser = await signIn("credentials", {
      email: data.sign_in_email,
      password: data.sign_in_password,
      redirect: false,
    });

    if (loginUser?.error) {
      toast.error(
        "Something went trying to login, check the details you provided",
        toastOptions
      );
    } else {
      reset();
      (document as any).getElementById("my_modal_8")?.close();
      toast.success("Successfully logged In", toastOptions);
      router.push("/home");
    }
  };
  return (
    <>
      <div
        className="p-2 text capitalize border border-gray-600 rounded-3xl max-w-sm w-full mt-5
          hover:bg-neutral hover:cursor-pointer text-center"
        onClick={() =>
          (document as any).getElementById("my_modal_8").showModal()
        }
      >
        sign in
      </div>

      <dialog id="my_modal_8" className="modal">
        <div className="modal-box">
          <form method="dialog" className="flex items-center justify-between">
            <BsTwitter
              className="text-sky-700 text-center absolute top-2"
              size={30}
            />
            <button className="btn btn-sm btn-circle text-xl btn-ghost absolute right-2 top-2 focus:border-none focus:outline-none">
              ✕
            </button>
          </form>

          <h1 className="font-extrabold text-xl mt-3 text-center w-full">
            Sign in your account
          </h1>
          <div className="py-4 w-full flex flex-col items-center justify-center gap-3">
            <div className="form-control w-full max-w-sm">
              <label htmlFor="sign_in_email" className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                {...register("sign_in_email")}
                type="email"
                name="sign_in_email"
                id="sign_in_email"
                className="input input-bordered max-w-sm w-full"
              />
            </div>
            <div className="form-control w-full max-w-sm">
              <label htmlFor="sign_in_password" className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                {...register("sign_in_password")}
                type="password"
                name="sign_in_password"
                id="sign_in_password"
                className="input input-bordered max-w-sm w-full"
              />
              <span className="label-text-alt mt-1">
                *Password must have atleast one uppercase, lowercase, symbol and
                must be minimum of 8 characters.
              </span>
            </div>

            <button
              disabled={isSubmitting}
              className="btn btn-info rounded-3xl disabled:bg-gray-500 w-full max-w-xs text-white"
              onClick={handleSubmit(onSubmit)}
            >
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
