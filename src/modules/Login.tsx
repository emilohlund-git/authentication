import React, { useState } from "react";
import Logo from "../components/Logo";
import { MdEmail, MdLock } from "react-icons/md";
import SocialProfiles from "../components/SocialProfiles";
import { useAuth } from "../context/auth.context";
import { useRouter } from "next/router";

type RegisterProps = {
  setActiveForm: React.Dispatch<React.SetStateAction<number>>;
};

const Login: React.FC<RegisterProps> = ({ setActiveForm }) => {
  const { logIn } = useAuth();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const login = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      await logIn(formData.email, formData.password);
    } catch (err) {
      if (("" + err).includes("auth/user-not-found")) {
        setError({
          ...error,
          email: "User does not exist.",
        });
      }

      if (("" + err).includes("auth/wrong-password")) {
        setError({
          ...error,
          password: "Wrong password.",
        });
      }
    }

    setLoading(false);
  };

  return (
    <div className="border-2 rounded-2xl p-12 w-[500px]">
      <Logo />
      <p className="font-semibold my-6 max-w-xs">Login</p>
      <form onSubmit={login} className="flex flex-col gap-y-2">
        <div className="flex relative">
          <input
            className={`input input-bordered w-full pl-11 ${
              error.email ? "ring-1 ring-red-500" : "ring-0"
            }`}
            type="email"
            placeholder="Email"
            onFocus={() =>
              setError({
                ...error,
                email: "",
              })
            }
            required
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <MdEmail className="absolute top-1/2 -translate-y-1/2 ml-4 text-gray-500" />
        </div>
        <p className="text-sm text-red-500">{error.email}</p>
        <div className="flex relative">
          <input
            className={`input input-bordered w-full pl-11 ${
              error.password ? "ring-1 ring-red-500" : "ring-0"
            }`}
            type="password"
            placeholder="Password"
            onFocus={() =>
              setError({
                ...error,
                password: "",
              })
            }
            required
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <MdLock className="absolute top-1/2 -translate-y-1/2 ml-4 text-gray-500" />
        </div>
        <p className="text-sm text-red-500">{error.password}</p>
        <button className={`btn btn-primary font-sans ${loading && "loading"}`}>
          {!loading && "Start coding now"}
        </button>
      </form>
      <div className="flex flex-col justify-center items-center gap-y-4 mt-4">
        <SocialProfiles />
        <span className="text-sm mt-2 text-gray-400">
          Don&apos;t have an account yet?{" "}
          <a
            onClick={() => setActiveForm(0)}
            className="link link-primary link-hover"
          >
            Register
          </a>
        </span>
      </div>
    </div>
  );
};

export default Login;
