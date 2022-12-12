import React, { useState } from "react";
import Logo from "../components/Logo";
import { MdEmail, MdLock } from "react-icons/md";
import SocialProfiles from "../components/SocialProfiles";
import { useAuth } from "../context/auth.context";

type RegisterProps = {
  setActiveForm: React.Dispatch<React.SetStateAction<number>>;
};

const Register: React.FC<RegisterProps> = ({ setActiveForm }) => {
  const { signUp } = useAuth();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const register = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signUp(formData.email, formData.password);
    } catch (err) {
      if (("" + err).includes("auth/email-already-in-use")) {
        setError({
          ...error,
          email: "User already exists.",
        });
      }
      if (("" + err).includes("auth/weak-password")) {
        setError({
          ...error,
          password: "Password should be at least 6 characters.",
        });
      }
    }

    setLoading(false);
  };

  return (
    <div className="border-2 rounded-2xl p-12 w-[500px]">
      <Logo />
      <p className="font-semibold my-4 max-w-xs">
        Join thousands of learners from around the world
      </p>
      <p className="mb-4 max-w-xs text-sm">
        Master web development by making real-life projects. There are multiple
        paths for you to choose
      </p>
      <form onSubmit={register} className="flex flex-col gap-y-2">
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
            className="input input-bordered w-full pl-11"
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
          Already a member?{" "}
          <a
            onClick={() => setActiveForm(1)}
            className="link link-primary link-hover"
          >
            Login
          </a>
        </span>
      </div>
    </div>
  );
};

export default Register;
