import Image from "next/image";
import React from "react";
import { UserType } from "../context/auth.context";

type UserAvatarProfileProps = {
  profile: UserType | null;
  onClick?: () => void;
  photoURL: string | null | undefined;
};

const UserAvatarProfile: React.FC<UserAvatarProfileProps> = ({
  profile,
  onClick,
  photoURL,
}) => {
  return (
    <label
      tabIndex={0}
      className={`uppercase avatar ${!photoURL && "placeholder"}`}
    >
      <div
        className={`w-20 rounded-md ${
          !photoURL && "bg-primary text-neutral-content"
        }`}
      >
        {photoURL ? (
          <Image
            onClick={onClick}
            alt={profile?.displayName!}
            width={150}
            height={150}
            src={photoURL}
          />
        ) : (
          <span className="text-2xl">
            {profile?.email!.split("@")[0].split("")[0]}
          </span>
        )}
      </div>
    </label>
  );
};

export default UserAvatarProfile;
