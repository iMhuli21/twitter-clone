"use client";

import { useState } from "react";
import { BsTwitter } from "react-icons/bs";
import { ImSpinner8 } from "react-icons/im";
import { isCustomError, toastOptions } from "../utils/constants";
import { PiCameraPlusBold } from "react-icons/pi";
import { UploadButton } from "../utils/uploadthing";
import { UploadFileResponse } from "uploadthing/client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface EditProps {
  id: string | undefined;
  name: string | undefined;
  photo: string | undefined;
  bio: string | undefined;
  banner: string | undefined;
}

export default function EditInfo({ id, name, photo, bio, banner }: EditProps) {
  const router = useRouter();
  const [title, setTitle] = useState(name);
  const [updatedBio, setBio] = useState(bio);
  const [bannerImage, setBannerImage] = useState<
    UploadFileResponse[] | undefined
  >([]);
  const [profileImage, setProfileImage] = useState<
    UploadFileResponse[] | undefined
  >([]);
  const [isPending, setPending] = useState(false);

  const handleSubmit = async () => {
    const formData = new FormData();

    if (!title || !updatedBio || !id) {
      toast.error("All fields are required", toastOptions);
      return;
    }

    if (bannerImage?.length !== 0) {
      formData.set("bannerImage", bannerImage?.[0].url!);
    }

    if (profileImage?.length !== 0) {
      formData.set("profilePicture", profileImage?.[0].url!);
    }

    formData.set("id", id);
    formData.set("headerTitle", title);
    formData.set("bio", updatedBio);

    const sendReq = await fetch("/api/account", {
      method: "PUT",
      body: formData,
    });

    const sendRes = await sendReq.json();

    if (isCustomError(sendRes)) {
      toast.error(sendRes.error, toastOptions);
    } else {
      (document as any).getElementById("my_modal_10").close();
      toast.success("Successfully updated profile", toastOptions);
      router.refresh();
    }
  };

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
            <div className="h-64">
              <div className="relative">
                {bannerImage?.length === 0 ? (
                  <div
                    className="w-full h-52 bg-gray-300 absolute top-0 flex items-center justify-center gap-5 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${banner})` }}
                  >
                    <UploadButton
                      className="ut-allowed-content:hidden ut-button:bg-transparent ut-button:focus-within:ring-0 ut-button:focus-within:ring-offset-0"
                      content={{
                        button({ ready }) {
                          if (ready)
                            return (
                              <div className="rounded-full bg-base-200 flex items-center justify-center p-2 hover:cursor-pointer text-gray-400">
                                <PiCameraPlusBold size={24} />
                              </div>
                            );
                        },
                      }}
                      endpoint="bannerPicture"
                      onClientUploadComplete={(res) => {
                        setBannerImage(res);
                      }}
                      onUploadError={(error: Error) => {
                        toast.error(error.message, toastOptions);
                      }}
                    />
                  </div>
                ) : (
                  <div
                    className="w-full h-52 absolute top-0 bg-cover bg-center bg-no-repeat flex items-center justify-center"
                    style={{
                      backgroundImage: `url(${bannerImage?.[0].url})`,
                    }}
                  >
                    <UploadButton
                      className="ut-allowed-content:hidden ut-button:bg-transparent ut-button:focus-within:ring-0 ut-button:focus-within:ring-offset-0"
                      content={{
                        button({ ready }) {
                          if (ready)
                            return (
                              <div className="rounded-full bg-base-200 flex items-center justify-center p-2 hover:cursor-pointer text-gray-400">
                                <PiCameraPlusBold size={24} />
                              </div>
                            );
                        },
                      }}
                      endpoint="bannerPicture"
                      onClientUploadComplete={(res) => {
                        setBannerImage(res);
                      }}
                      onUploadError={(error: Error) => {
                        toast.error(error.message, toastOptions);
                      }}
                    />

                    <div
                      className="rounded-full bg-base-200 w-10 h-10 text-lg flex items-center justify-center p-2 hover:cursor-pointer"
                      onClick={() => setBannerImage([])}
                    >
                      ✕
                    </div>
                  </div>
                )}

                <div className="absolute top-[8rem] flex items-end justify-between w-full px-5 py-2">
                  {profileImage?.length === 0 ? (
                    <div
                      className="w-24 h-24 lg:w-28 lg:h-28 relative bg-cover bg-center bg-no-repeat rounded-full border-2 flex items-center justify-center hover:brightness-50 transition hover:cursor-pointer"
                      style={{ backgroundImage: `url(${photo})` }}
                    >
                      <UploadButton
                        className="ut-allowed-content:hidden ut-button:bg-transparent ut-button:focus-within:ring-0 ut-button:focus-within:ring-offset-0"
                        content={{
                          button({ ready }) {
                            if (ready)
                              return (
                                <div className="rounded-full bg-base-200 flex items-center justify-center p-2 hover:cursor-pointer text-gray-400">
                                  <PiCameraPlusBold size={24} />
                                </div>
                              );
                          },
                        }}
                        endpoint="profilePicture"
                        onClientUploadComplete={(res) => {
                          setProfileImage(res);
                        }}
                        onUploadError={(error: Error) => {
                          toast.error(error.message, toastOptions);
                        }}
                      />
                    </div>
                  ) : (
                    <div
                      className="w-24 h-24 lg:w-28 lg:h-28 relative bg-cover bg-center bg-no-repeat rounded-full border-2 flex items-center justify-center hover:brightness-50 transition hover:cursor-pointer"
                      style={{
                        backgroundImage: `url(${profileImage?.[0].url})`,
                      }}
                    >
                      <UploadButton
                        className="ut-allowed-content:hidden ut-button:bg-transparent ut-button:focus-within:ring-0 ut-button:focus-within:ring-offset-0"
                        content={{
                          button({ ready }) {
                            if (ready)
                              return (
                                <div className="rounded-full bg-base-200 flex items-center justify-center p-2 hover:cursor-pointer text-gray-400">
                                  <PiCameraPlusBold size={24} />
                                </div>
                              );
                          },
                        }}
                        endpoint="profilePicture"
                        onClientUploadComplete={(res) => {
                          setProfileImage(res);
                        }}
                        onUploadError={(error: Error) => {
                          toast.error(error.message, toastOptions);
                        }}
                      />
                    </div>
                  )}
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
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label htmlFor="bio" className="label">
                <span className="label-text">Bio</span>
              </label>
              <textarea
                maxLength={150}
                name="bio"
                className="textarea textarea-bordered"
                placeholder="Bio"
                value={updatedBio}
                onChange={(e) => setBio(e.target.value)}
              ></textarea>
            </div>

            <button
              disabled={isPending}
              className="btn btn-primary rounded-3xl disabled:bg-gray-500"
              onClick={handleSubmit}
            >
              Save
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
