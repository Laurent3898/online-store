/* eslint-disable @next/next/no-img-element */
"use client";

import PreviousPage from "@/app/components/PreviousPage";
import React, { useState, useEffect } from "react";
import { useUser } from "@/app/components/Providers";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const fetchItemDetails = async (itemId) => {
  const res = await fetch(`http://localhost:4000/api/items/${itemId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const itemDetails = await res.json();
  return itemDetails.items;
};

const submitComment = async (itemId, comment, user_id) => {
  try {
    const res = await fetch(`http://localhost:4000/api/comments/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: user_id, // Replace with the actual user ID
        item_id: itemId,
        description: comment,
      }),
    });

    const data = await res.json();
    // console.log("Server Response:", data);
    // console.log("Received commentId:", data.commentId);

    // console.log(data);
    return data.commentId; // Assuming your server returns the ID of the created comment
  } catch (error) {
    console.error("Error submitting comment:", error);
    throw error;
  }
};

const DetailsItems = ({ params: { itemId } }) => {
  const router = useRouter();

  //use to récupérer the person logged in

  const [comment, setComment] = useState("");
  const [item, setItem] = useState(null);
  const { user, updateUser } = useUser(); // Utilisez la fonction updateUser

  useEffect(() => {
    const fetchData = async () => {
      const itemData = await fetchItemDetails(itemId);
      setItem(itemData);
    };

    fetchData();
  }, [itemId]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const userData = await response.json();

        // Extrait le premier utilisateur du tableau pour récupérer l'ID de l'utilisateur
        // const currentUser = userData.users[0];
        // Change dynamically user inside LocalStorage to make comment better with current logged in
        const loggedInUser = user
          ? userData.users.find((u) => u.username === user.username)
          : null;

        // Met à jour les données de l'utilisateur
        updateUser(loggedInUser);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [updateUser]);

  const handleCommentSubmit = async () => {
    try {
      const user_id = user ? user.id : null;

      if (!user_id) {
        // Show a toast error if user is null
        toast.error("You must be logged in to add a comment", {
          duration: 3500,
          position: "top-center",
        });
        setComment("");
        return;
      }

      const commentId = await submitComment(itemId, comment, user_id);
      console.log("Comment Success", commentId);
      setComment("");
      toast.success("Comment added", {
        duration: 2500,
        position: "top-center",
      });
      router.push("/");
    } catch (error) {
      console.log("Error submitted", error);
    }
  };

  return (
    <div className="mx-auto p-5 max-w-2xl">
      <PreviousPage />
      {/* Content */}

      {item && (
        <div className="bg-white shadow-md rounded-lg md:flex">
          <img
            className="h-96 w-full md:h-auto md:w-48 md:rounded-l-lg object-cover"
            src="https://tecdn.b-cdn.net/img/new/standard/nature/186.jpg"
            alt="Example photo for items"
          />

          {/* Items details */}
          <div className="flex flex-col justify-start p-6">
            <h5 className="mb-2 text-xl font-medium text-gray-800">
              {item.title}
            </h5>
            <p className="mb-4 text-base text-gray-600">{item.description}</p>
            <p className="text-xl font-bold text-gray-500">
              {item.price} <span>€</span>
            </p>
          </div>
        </div>
      )}

      {/* Comment section */}
      <div className="mt-5 mb-3 text-center font-bold md:text-xl text-lg text-gray-800">
        Leave your comments for this product below
      </div>

      <div className="mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl">
        <textarea
          className="description bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none"
          placeholder="You can write your comment here"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
        <div className="buttons flex justify-end mt-1">
          <button
            type="button"
            onClick={handleCommentSubmit}
            className="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500"
          >
            Submit comment
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailsItems;
