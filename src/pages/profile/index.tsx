import Link from "next/link";
import React, { useEffect, useState, useRef, RefObject } from "react";
import UserAvatarProfile from "../../components/UserAvatarProfile";
import { useAuth, UserType } from "../../context/auth.context";
import Layout from "../../modules/Layout";

type Props = {};

const Profile = (props: Props) => {
  const { user, getProfile } = useAuth();
  const [profile, setProfile] = useState(user);

  useEffect(() => {
    (async () => {
      if (user) setProfile((await getProfile(user)) as UserType | null);
    })();
  }, []);

  return (
    <Layout>
      <div className="flex justify-center flex-col items-center gap-y-4">
        <h1 className="text-4xl font-medium">Personal Info</h1>
        <p className="text-lg">Basic info, like your name & photo</p>
        <div className="w-[750px] border-2 p-12 rounded-xl border-gray-100 mt-8">
          <div className="flex justify-between">
            <div>
              <p className="text-lg font-medium">Profile</p>
              <span className="font-light">
                Some info may be visible to other people
              </span>
            </div>
            <div>
              <Link href="/profile/edit">
                <button className="btn btn-outline">Edit</button>
              </Link>
            </div>
          </div>
          <div className="my-6 w-full h-[1px] bg-gray-200"></div>
          <div>
            <table className="w-full">
              <tbody className="flex flex-col">
                <tr className="flex items-center gap-x-40 text-gray-400 border-b-[1px] pb-6">
                  <td className="w-1/5">photo</td>
                  <td>
                    <UserAvatarProfile
                      profile={profile}
                      photoURL={profile?.photoURL}
                    />
                  </td>
                </tr>
                <tr className="flex items-center gap-x-40 text-gray-400 border-b-[1px] py-6">
                  <td className="w-1/5">name</td>
                  <td className="text-black">{profile?.displayName!}</td>
                </tr>
                <tr className="flex items-center gap-x-40 text-gray-400 border-b-[1px] py-6">
                  <td className="w-1/5">bio</td>
                  <td className="text-black">{profile?.bio}</td>
                </tr>
                <tr className="flex items-center gap-x-40 text-gray-400 border-b-[1px] py-6">
                  <td className="w-1/5">phone</td>
                  <td className="text-black">{profile?.phoneNumber}</td>
                </tr>
                <tr className="flex items-center gap-x-40 text-gray-400 border-b-[1px] py-6">
                  <td className="w-1/5">email</td>
                  <td className="text-black">{profile?.email!}</td>
                </tr>
                {user?.password && (
                  <tr className="flex items-center gap-x-40 text-gray-400 py-6">
                    <td className="w-1/5">password</td>
                    <td className="text-black">
                      {profile?.password
                        ?.split("")
                        .map((x) => x.replace(/[A-Za-z0-9_.-]*/, "*"))}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
