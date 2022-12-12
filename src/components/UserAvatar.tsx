import Image from "next/image";
import React from "react";
import { useAuth } from "../context/auth.context";

type Props = {};

const UserAvatar = (props: Props) => {
  const { user } = useAuth();

  return (
    <label
      tabIndex={0}
      className={`btn btn-ghost btn-square rounded-md avatar ${
        !user?.photoURL && "placeholder"
      }`}
    >
      <div
        className={`w-10 rounded-md ${
          !user?.photoURL && "bg-primary text-neutral-content"
        }`}
      >
        {user?.photoURL ? (
          <Image
            alt={user?.displayName!}
            width={40}
            height={40}
            src={user?.photoURL!}
          />
        ) : (
          <span className="text-lg">
            {user?.email!.split("@")[0].split("")[0]}
          </span>
        )}
      </div>
    </label>
  );
};

export default UserAvatar;
