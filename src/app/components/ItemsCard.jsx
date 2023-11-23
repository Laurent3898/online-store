import React from "react";

const ItemsCard = ({ item }) => {
  return (
    <div className="w-full lg:max-w-lg px-4 lg:px-0">
      <div className="p-3 bg-white rounded shadow-md">
        <h2 className="mr-auto text-lg cursor-pointer hover:text-gray-900">
          {item.title}
        </h2>
        <div className="mt-1 text-xl font-semibold">{item.price}</div>
        <div className="mt-1 font-semibold">{item.description}</div>
      </div>
    </div>
  );
};

export default ItemsCard;
