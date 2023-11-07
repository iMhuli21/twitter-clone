"use client";

import toast from "react-hot-toast";
import { BsTwitter } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";
import { isCustomError, toastOptions } from "../utils/constants";

export default function SignUp() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { isSubmitting },
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    const userData = {
      email: data.sign_up_email,
      password: data.sign_up_password,
      username: data.username,
    };

    const sendReq = await fetch("/api/sign-up", {
      method: "POST",
      body: JSON.stringify(userData),
    });

    const sentRes = await sendReq.json();

    if (isCustomError(sentRes)) {
      toast.error(sentRes.error, toastOptions);
    } else {
      reset();
      toast.success(
        "Successfully created account, you can now login",
        toastOptions
      );

      (document as any).getElementById("my_modal_2").showModal();
    }
  };
  return (
    <>
      <div className="flex flex-col items-start w-full max-w-sm gap-2">
        <div
          className="p-2 text capitalize bg-info rounded-3xl max-w-sm w-full mt-2
           text-white hover:bg-sky-500 transition ease-in-out hover:cursor-pointer text-center"
          onClick={() =>
            (document as any).getElementById("my_modal_1").showModal()
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

      <dialog id="my_modal_1" className="modal">
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
            Create your account
          </h1>
          <div className="py-4 w-full flex flex-col items-center justify-center gap-3">
            <div className="form-control w-full max-w-sm">
              <label htmlFor="username" className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                {...register("username")}
                type="text"
                name="username"
                id="username"
                className="input input-bordered max-w-sm w-full"
              />
            </div>
            <div className="form-control w-full max-w-sm">
              <label htmlFor="sign_up_email" className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                {...register("sign_up_email")}
                type="email"
                name="sign_up_email"
                id="sign_up_email"
                className="input input-bordered max-w-sm w-full"
              />
            </div>
            <div className="form-control w-full max-w-sm">
              <label htmlFor="sign_up_password" className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                {...register("sign_up_password")}
                type="password"
                name="sign_up_password"
                id="sign_up_password"
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
              Sign Up
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
