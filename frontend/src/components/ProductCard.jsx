import React from "react";

export default function ProductCard({ name, price, image }) {
  return (
    <div className="group bg-gray-900 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/20">
      <div className="aspect-[4/5] relative overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-6 space-y-4">
        <h3 className="text-lg font-medium text-gray-100">{name}</h3>
        <p className="text-indigo-400 font-semibold">₹ {price.toFixed(2)}</p>
        <button className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md 
          hover:bg-indigo-700 transition-colors duration-200 
          focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900">
          Add to Cart
        </button>
      </div>
    </div>
  );
}