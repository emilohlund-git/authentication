import React, { useState, useRef } from "react";
import UserAvatarProfile from "../../components/UserAvatarProfile";
import { useAuth, UserType } from "../../context/auth.context";
import Layout from "../../modules/Layout";
import { IoCaretBackSharp } from "react-icons/io5";
import Link from "next/link";
import { useRouter } from "next/router";
import { Upload } from "upload-js";

type Props = {};

const upload = Upload({ apiKey: process.env.NEXT_PUBLIC_UPLOAD_IO_API_KEY! });

const EditProfile = (props: Props) => {
  const fileInputRef = useRef(null as HTMLInputElement | null);
  const [preview, setPreview] = useState("");
  const [progress, setProgress] = useState(0);
  const { user, updateUser } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    ...user,
  } as UserType);

  const updateUserData = async () => {
    await updateUser(formData);
  };

  const handleFileDialog = () => {
    fileInputRef.current!.click();
  };

  const handleUpload = async (e: any) => {
    e.preventDefault();
    const [file] = e.target.files;
    const { fileUrl } = await upload.uploadFile(file, { onProgress });
    setPreview(URL.createObjectURL(file));
    setFormData({
      ...formData,
      photoURL: fileUrl,
    });
  };

  const onProgress = ({ progress }: { progress: number }) => {
    setProgress(progress);
  };

  return (
    <Layout>
      <div className="flex justify-center flex-col items-center">
        <Link
          className="font-light w-full flex items-center link link-hover text-primary gap-x-1"
          href="/profile"
        >
          <IoCaretBackSharp />
          Back
        </Link>
        <div className="w-full border-2 p-12 rounded-xl border-gray-100 mt-8">
          <div className="flex justify-between">
            <div>
              <p className="text-lg font-medium">Change Info</p>
              <span className="font-light">
                Changes will be reflected to every service
              </span>
            </div>
          </div>
          <div className="my-6 w-full h-[1px] bg-gray-200"></div>
          <div>
            <table className="w-full">
              <tbody className="flex flex-col">
                <tr className="flex items-center gap-x-40 text-gray-400 border-b-[1px] pb-6">
                  <td className="flex flex-col gap-y-2 w-full">
                    photo
                    {progress > 0 && progress < 100 ? (
                      <div
                        className="radial-progress text-primary"
                        style={{ "--value": progress, "--thickness": "2px" }}
                      >
                        {progress + "%"}
                      </div>
                    ) : (
                      <UserAvatarProfile
                        onClick={() => handleFileDialog()}
                        profile={formData}
                        photoURL={preview ? preview : user?.photoURL}
                      />
                    )}
                    <input
                      ref={fileInputRef}
                      onChange={handleUpload}
                      type="file"
                      className="hidden"
                    />
                  </td>
                </tr>
                <tr className="flex items-center gap-x-40 text-gray-400 border-b-[1px] py-6">
                  <td className="flex flex-col gap-y-2 w-full">
                    name
                    <input
                      className="input input-bordered"
                      type="text"
                      value={formData.displayName || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          displayName: e.target.value,
                        })
                      }
                    />
                  </td>
                </tr>
                <tr className="flex items-center gap-x-40 text-gray-400 border-b-[1px] py-6 w-full">
                  <td className="flex flex-col gap-y-2 w-full">
                    bio
                    <textarea
                      className="textarea textarea-bordered w-full"
                      value={formData.bio || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          bio: e.target.value,
                        })
                      }
                    />
                  </td>
                </tr>
                <tr className="flex items-center gap-x-40 text-gray-400 border-b-[1px] py-6">
                  <td className="flex flex-col gap-y-2 w-full">
                    phone
                    <input
                      className="input input-bordered"
                      type="text"
                      value={formData.phoneNumber || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          phoneNumber: e.target.value,
                        })
                      }
                    />
                  </td>
                </tr>
                <tr className="flex items-center gap-x-40 text-gray-400 border-b-[1px] py-6">
                  <td className="flex flex-col gap-y-2 w-full">
                    email
                    <input
                      className="input input-bordered"
                      type="email"
                      value={formData.email || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          email: e.target.value,
                        })
                      }
                    />
                  </td>
                </tr>
                <tr className="flex items-center gap-x-40 text-gray-400 border-b-[1px] py-6">
                  <td className="flex flex-col gap-y-2 w-full">
                    password
                    <input
                      className="input input-bordered"
                      type="password"
                      value={formData.password || ""}
                      placeholder="Enter your new password"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          password: e.target.value,
                        })
                      }
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <button
              onClick={async () => {
                await updateUserData();
                router.push("/profile");
              }}
              className="btn btn-primary mt-6"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EditProfile;
