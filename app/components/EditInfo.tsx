"use client";

import { BsTwitter } from "react-icons/bs";
import { FieldValues, useForm } from "react-hook-form";
import { IUser } from "../utils/constants";
import { PiCameraPlusBold } from "react-icons/pi";

interface EditProps {
  name: string | undefined;
  banner: string | null | undefined;
  photo: string | undefined;
}

export default function EditInfo({ name, banner, photo }: EditProps) {
  const {
    formState: { isSubmitting },
    reset,
    register,
    handleSubmit,
  } = useForm();

  const onSubmit = async (data: FieldValues) => {};
  return (
    <>
      <button
        className="p-2 rounded-3xl border border-gray-500 hover:bg-neutral transition outline-none"
        onClick={() =>
          (document as any).getElementById("my_modal_10").showModal()
        }
      >
        Edit profile
      </button>

      <dialog id="my_modal_10" className="modal">
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
            Edit your profile
          </h1>
          <div className="py-4 w-full flex flex-col gap-2">
            <div className="h-52">
              <div className="relative">
                <div className="w-full h-32 bg-gray-300 absolute top-0 flex items-center justify-center gap-5">
                  <div className="rounded-full bg-base-200 flex items-center justify-center p-2 hover:cursor-pointer">
                    <PiCameraPlusBold size={24} />
                  </div>
                  <div className="rounded-full bg-base-200 w-10 h-10 text-lg flex items-center justify-center p-2 hover:cursor-pointer">
                    ✕
                  </div>
                </div>
                <div className="absolute top-[5rem] flex items-end justify-between w-full px-5 py-2">
                  <img
                    src={photo}
                    className="w-24 h-24 lg:w-28 lg:h-28 rounded-full border-2 object-cover relative hover:brightness-90 hover:cursor-pointer transition"
                    alt="user profile"
                  />
                  <div className="absolute rounded-full bg-base-200 flex items-center justify-center p-2 hover:cursor-pointer left-14 top-12">
                    <PiCameraPlusBold size={24} />
                  </div>
                </div>
              </div>
            </div>

            <div className="form-control">
              <label htmlFor="name" className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control">
              <label htmlFor="bio" className="label">
                <span className="label-text">Bio</span>
              </label>
              <textarea
                name="bio"
                className="textarea textarea-bordered"
                placeholder="Bio"
              ></textarea>
            </div>

            <button className="btn btn-primary rounded-3xl">Save</button>
          </div>
        </div>
      </dialog>
    </>
  );
}
