import { useRouter } from "next/router";
import React from "react";
import Logo from "../components/Logo";
import UserAvatar from "../components/UserAvatar";
import { useAuth } from "../context/auth.context";
import { AiOutlineUser } from "react-icons/ai";
import { IoLogOutOutline } from "react-icons/io5";
type Props = {};

const Header = (props: Props) => {
  const { logOut } = useAuth();
  const router = useRouter();

  return (
    <div className="navbar bg-base-100 px-12">
      <div className="flex-1">
        <Logo />
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <UserAvatar />
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a
                className={`justify-between ${
                  router.pathname.includes("profile") && "bg-gray-100"
                }`}
              >
                <div className="flex items-center gap-x-2">
                  <AiOutlineUser />
                  Profile
                </div>
              </a>
            </li>
            <div className="divider"></div>
            <li>
              <a className="text-red-400" onClick={logOut}>
                <IoLogOutOutline />
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
