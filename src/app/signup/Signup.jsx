"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { NextResponse } from "next/server";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

export async function POST(req, res) {
  const data = await req.json();
  try {
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.error(
      new Error(`Failed to create user: ${error.message}`)
    );
  }
}

const matchPass = (psw1, psw2) => {
  return psw1 === psw2;
};

const Signup = () => {
  const router = useRouter();
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    const checkNotEmpty = () => {
      if (
        user.username.length === 0 ||
        user.password.length === 0 ||
        repeatedPassword.length === 0
      ) {
        setButtonDisabled(true);
      } else {
        setButtonDisabled(false);
      }
    };
    checkNotEmpty();
  }, [user.username, user.password, repeatedPassword]);

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (!matchPass(user.password, repeatedPassword)) {
        toast.error("Passwords do not match", {
          duration: 5000,
          position: "top-center",
        });
        return;
      }
      const response = await axios.post(
        "http://localhost:4000/api/users/new",
        user
      );

      if (response.status === 200) {
        toast.success("Signup successful", {
          duration: 2500,
          position: "top-center",
        });
        router.push("/login");
      } else {
        toast.error("Signup failed", {
          duration: 3000,
          position: "bottom-right",
        });
      }
    } catch (error) {
      // console.error("Signup failed", error);
      toast.error(error.message, { duration: 3000, position: "top-center" });
    } finally {
      setUser({
        username: "",
        password: "",
      });
      setRepeatedPassword("");
      setLoading(false); // Reset loading to false after the request
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="text-center text-3xl font-bold text-orange-700">
          Online Store
        </h1>

        <div className="relative mt-6">
          <div className="inline-flex items-center justify-center w-full">
            <hr className="w-64 h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
            <span className="absolute px-3 text-2xl font-medium text-gray-700 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900">
              {loading ? "Processing..." : "Signup"}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="space-y-6">
          <div>
            <label
              htmlFor="usernameRegister"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Username
            </label>
            <div className="mt-2">
              <input
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                id="usernameRegister"
                name="usernameRegister"
                type="text"
                required
                className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="passwordRegister"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                id="passwordRegister"
                name="passwordRegister"
                type="password"
                required
                className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="repasswordRegister"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Repeat Password
              </label>
            </div>
            <div className="mt-2">
              <input
                value={repeatedPassword}
                onChange={(e) => setRepeatedPassword(e.target.value)}
                id="repasswordRegister"
                name="repasswordRegister"
                type="password"
                required
                className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              onClick={handleSignup}
              className={`${
                buttonDisabled
                  ? "bg-red-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              } py-2 px-4 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg`}
              disabled={buttonDisabled}
            >
              {buttonDisabled ? "You can't Signup" : "Signup Now"}
            </button>
          </div>
        </div>

        {/* Link to Login */}
        <p className="mt-10 text-center text-sm text-gray-500">
          <Link
            href="/login"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Already have an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
