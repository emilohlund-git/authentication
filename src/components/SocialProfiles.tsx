import {
  GoogleAuthProvider,
  GithubAuthProvider,
  TwitterAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import React from "react";
import {
  AiFillGithub,
  AiOutlineGoogle,
  AiOutlineTwitter,
} from "react-icons/ai";
import { auth } from "../config/firebase.config";

type Props = {};

const SocialProfiles = (props: Props) => {
  const login = async (
    provider: GoogleAuthProvider | TwitterAuthProvider | GithubAuthProvider
  ) => {
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {}
  };

  return (
    <div className="mt-3">
      <span className="text-center text-sm text-gray-400">
        or continue with these social profiles
      </span>
      <div className="flex justify-center gap-x-4 mt-4">
        <AiFillGithub
          onClick={() => {
            login(new GithubAuthProvider());
          }}
          className="w-10 h-10 cursor-pointer hover:bg-blue-200 text-gray-400 border-2 rounded-full border-gray-400 p-2"
        />
        <AiOutlineGoogle
          onClick={() => {
            login(new GoogleAuthProvider());
          }}
          className="w-10 h-10 cursor-pointer hover:bg-blue-200 text-gray-400 border-2 rounded-full border-gray-400 p-2"
        />
        <AiOutlineTwitter
          onClick={() => {
            login(new TwitterAuthProvider());
          }}
          className="w-10 h-10 cursor-pointer hover:bg-blue-200 text-gray-400 border-2 rounded-full border-gray-400 p-2"
        />
      </div>
    </div>
  );
};

export default SocialProfiles;
