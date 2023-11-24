"use client";
import Link from "next/link";
import React from "react";
import { useUser } from "./Providers";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import localStorage from "localStorage";

const Navbar = () => {
  const { user, updateUser } = useUser();
  const router = useRouter();

  const handleSignOut = () => {
    // Clear user information from localStorage
    localStorage.clear();
    // Update user context
    updateUser(null);
    toast.success("You are logged out successfully", {
      duration: 2500,
      position: "top-center",
    });

    router.push("/");
  };

  return (
    <nav className="bg-gray-800 sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-2">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center sm:items-stretch sm:justify-start">
            <div className="">
              <div className="flex space-x-4">
                <Link
                  href="/"
                  className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
                >
                  Online Store
                </Link>
                <Link
                  href="/home"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                >
                  Home
                </Link>
                <Link
                  href="/items"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                >
                  Items
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="relative ml-3">
              {user ? (
                <button
                  type="button"
                  className="bg-transparent hover:bg-blue-500 text-white font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                  onClick={handleSignOut}
                >
                  Sign Out
                </button>
              ) : (
                <Link
                  href="/login"
                  className="bg-transparent hover:bg-blue-500 text-white font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
