"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useUser } from "../components/Providers";
import localStorage from "localStorage";

const Login = () => {
  const router = useRouter();
  const { updateUser } = useUser();

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    const checkNotEmpty = () => {
      if (user.username.length === 0 || user.password.length === 0) {
        setButtonDisabled(true);
      } else {
        setButtonDisabled(false);
      }
    };
    checkNotEmpty();
  }, [user.username, user.password]);

  const handleSignin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:4000/api/users/login",
        user
      );

      // console.log(response);
      if (response.status === 200) {
        toast.success("You are logged in", {
          duration: 2500,
          position: "top-center",
        });

        //Update infos user
        const userData = { username: user.username };
        updateUser(userData);
        //Store information inside the LocalStorage
        localStorage.setItem("user", JSON.stringify(userData));

        // Redirect to Home Page
        router.push("/");
      } else {
        toast.error(error.message, {
          duration: 3000,
          position: "bottom-right",
        });
      }
    } catch (error) {
      // console.error("Signin failed", error);
      toast.error("Signin failed", { duration: 3000, position: "top-center" });
    } finally {
      setUser({
        username: "",
        password: "",
      });
      setLoading(false); // Reset loading to false after the request
    }
  };
  return (
    <div className="flex min-h-full flex-col justify-center px-6 pt-12 pb-24 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="text-center  text-3xl font-bold text-orange-700">
          Online Store
        </h1>
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Username
            </label>
            <div className="mt-2">
              <input
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                id="email"
                name="email"
                type="text"
                required
                className="block w-full rounded-md border-0  px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                id="password"
                name="password"
                type="password"
                required
                className="block w-full rounded-md border-0  px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              onClick={handleSignin}
              className={`${
                buttonDisabled
                  ? "bg-red-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              } py-2 px-4 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg`}
              disabled={buttonDisabled}
            >
              {buttonDisabled ? "You can't Signin" : "Signin Now"}
            </button>
          </div>
        </div>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{" "}
          <Link
            href="/signup"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
