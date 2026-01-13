"use client"
import React from "react";
import "../../globals.css"
const AddCart = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-red rounded-2xl shadow-md
      transition-all duration-300 hover:bg-red-700 active:scale-98 focus:outline-none focus:ring-4 focus:ring-red-300 hover:cursor-pointer"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
      Add to Cart
    </button>
  );
};

export default AddCart;
