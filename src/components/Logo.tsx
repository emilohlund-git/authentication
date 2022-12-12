import Image from "next/image";
import React from "react";

type Props = {};

const Logo = (props: Props) => {
  return (
    <a className="">
      <Image
        src="/devchallenges.svg"
        width={150}
        height={80}
        alt="Dev Challenges Logo"
      />
    </a>
  );
};

export default Logo;
