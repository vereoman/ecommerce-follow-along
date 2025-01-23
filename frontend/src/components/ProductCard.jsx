import React from "react";

export default function ProductCard({ name, price, image }) {
  return (
    <div className="bg-gray-800 rounded-xl shadow-xl overflow-hidden">
      <div className="aspect-[3/4] relative">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-lg font-semibold text-white">{name}</h3>
        <p className="text-gray-400 mt-2">${price.toFixed(2)}</p>
        <button className="mt-6 w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200">
          Add to Cart
        </button>
      </div>
    </div>
  )
};