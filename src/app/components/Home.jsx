import React, { useState, useEffect } from "react";
import { useUser } from "./Providers";
import Link from "next/link";

const fetchItems = async () => {
  try {
    const response = await fetch("http://localhost:4000/api/items", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch items");
    }

    const data = await response.json();
    return data.items;
  } catch (error) {
    console.error("Error fetching items:", error);
    throw error;
  }
};

const fetchAllComments = async () => {
  try {
    const response = await fetch("http://localhost:4000/api/comments", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch items");
    }

    const data = await response.json();
    return data.comments;
  } catch (error) {
    console.error("Error fetching items:", error);
    throw error;
  }
};

const Comments = ({ comments }) => (
  <div
    className="flex-1 rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed  card-comments"
    key={comments.id}
  >
    <span className="text-slate-600">Author : </span>
    <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
      <strong>{comments.username}</strong>
    </span>{" "}
    <p>
      <span className="text-sm text-slate-700">Comment for</span> =&gt;{" "}
      <span className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10">
        {comments.item_title}
      </span>
    </p>
    <hr className="w-1/3 my-2" />
    <p className="text-sm">Comment Desc =&gt; {comments.description}</p>
    <div className="mt-4 flex items-center">
      <div className="text-xs text-gray-500 font-semibold bg-slate-500/25 py-2 px-5 rounded-lg">
        {comments.date}
      </div>
    </div>
  </div>
);

const Item = ({ item }) => (
  <Link href={`/items/${item.id}`}>
    <div className="w-full lg:max-w-lg px-4 lg:px-0" key={item.id}>
      <div className="p-3 bg-slate-50/90 rounded shadow-md">
        <h2 className="mr-auto text-lg cursor-pointer hover:text-gray-900 text-red-600">
          {item.title}
        </h2>
        <div className="mt-1 text-xl text-gray-800 font-semibold">
          <p>
            Price : {item.price} <span>€</span>
          </p>
        </div>
        <div className="mt-1 font-semibold text-gray-800">
          {item.description}
        </div>
      </div>
    </div>
  </Link>
);

const Accueil = () => {
  const { user } = useUser();
  const [items, setItems] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItemsData = async () => {
      try {
        const itemsData = await fetchItems();
        setItems(itemsData);
      } catch (error) {
        setError(error.message || "An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchItemsData();
  }, []);

  useEffect(() => {
    const fetchAllCommentsData = async () => {
      try {
        const commentsData = await fetchAllComments();
        // console.log(commentsData);
        setComments(commentsData);
      } catch (error) {
        setError(error.message || "An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllCommentsData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <main
      className="header-hero"
      style={{ backgroundImage: `${"url(/banner-bg.svg)"}` }}
    >
      <div className="lg:2/6 xl:w-2/4 mt-10 lg:mt-5 lg:ml-6 text-left">
        <h1 className="text-xl text-white font-light text-true-gray-500 antialiased">
          Welcome
          {user ? (
            <span className="font-semibold"> {user.username}</span>
          ) : (
            "! Please Sign in."
          )}
        </h1>

        <div className="text-6xl  font-bold text-white leading-none">
          Market Place for Everyone
        </div>
        <div className="mt-6 text-xl text-white font-light text-true-gray-500 antialiased">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aspernatur
          perferendis officiis doloremque officia hic quis consectetur ad earum
          laborum at, saepe, ducimus qui distinctio culpa eius in asperiores
          ullam perspiciatis.
        </div>
      </div>
      <br />

      <h1 className="text-xl text-white font-bold p-4 mb-2">
        List of all items
      </h1>

      <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-2">
        {items.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </div>

      <hr className="my-5" />
      <h6 className="text-slate-50 font-semibold text-lg mb-4 text-center">
        Comments sections
      </h6>
      <hr className="mb-5 mt-2" />
      <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
        {comments.map((comment) => (
          <Comments key={comment.id} comments={comment} />
        ))}
      </div>
    </main>
  );
};

export default Accueil;
