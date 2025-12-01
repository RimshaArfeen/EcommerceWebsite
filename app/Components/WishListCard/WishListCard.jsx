"use client";
import React from "react";
import { Trash2 } from "lucide-react";
import AddCart from "../AddCart/page";

const WishListCard = ({ item, onRemove, onAddToCart }) => {
  const { id, title, price, imageUrl } = item;

  return (
    <div 
    className="flex items-center p-4 sm:p-6">
      <div className="mr-4">
        <img
          src={imageUrl}
          alt={title}
          className="w-20 h-20 object-cover rounded-lg border"
        />
      </div>

      <div className="flex-grow">
        <h3 className="text-lg font-semibold truncate">{title}</h3>
        <p className="text-xl font-bold text-red-600">Rs. {price}</p>
      </div>

      <div className="flex items-center space-x-3 ml-4">
        <AddCart onClick={onAddToCart} />

        <button
          onClick={onRemove}
          className="p-2.5 bg-red-700 text-white rounded-lg hover:bg-red-800"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default WishListCard;
