"use client";
import React from "react";

import { useRouter } from "next/navigation";
const PreviousPage = () => {
  const router = useRouter();

  //function for return in previous page
  const previousPage = () => {
    router.back();
  };
  return (
    <div className="">
      <button
        className="my-2 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
        type="button"
        onClick={previousPage}
      >
        Previous
      </button>
    </div>
  );
};

export default PreviousPage;
