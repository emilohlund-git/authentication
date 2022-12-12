import React from "react";

type Props = {};

const Footer = (props: Props) => {
  return (
    <div className="flex justify-between mt-4 text-gray-500 w-full">
      <span>
        created by{" "}
        <span className="font-semibold underline">emilohlund-git</span>
      </span>
      <span>devChallenges.io</span>
    </div>
  );
};

export default Footer;
