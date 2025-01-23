import React from "react";
import ProductCard from "./ProductCard";
import HeroSection from "./HeroSection";

const products = [
  {
    id: 1,
    name: "Classic Polo Shirt",
    price: 49.99,
    image:
      "https://static.zara.net/assets/public/aa0c/9abe/312d4692962f/700ae08c1c6e/04092400708-e1/04092400708-e1.jpg?ts=1735808079022&w=563",
  },
  {
    id: 2,
    name: "Premium Cotton Polo",
    price: 59.99,
    image:
      "https://static.zara.net/assets/public/949b/f399/efc34e29afd7/25cbab09140f/04092400401-e1/04092400401-e1.jpg?ts=1735807958090&w=563",
  },
  {
    id: 3,
    name: "Casual Polo",
    price: 45.99,
    image:
      "https://static.zara.net/assets/public/d4f2/b44f/be58406a93a2/11c293f67765/04092400251-e1/04092400251-e1.jpg?ts=1735807958070&w=563",
  },
  {
    id: 4,
    name: "Summer Polo",
    price: 39.99,
    image:
      "https://static.zara.net/assets/public/2c7d/a06c/b98140abb59d/ce412f68da47/04092400800-e1/04092400800-e1.jpg?ts=1735807958281&w=563",
  },
  {
    id: 5,
    name: "Essential Polo",
    price: 42.99,
    image:
      "https://static.zara.net/assets/public/17d4/99d0/1770447a9ce4/259f915b1894/04092400526-e1/04092400526-e1.jpg?ts=1735901731320&w=563",
  },
  {
    id: 6,
    name: "Modern Fit Polo",
    price: 54.99,
    image:
      "https://static.zara.net/assets/public/ecdc/cf40/e0da4af2af07/654179fb2d84/00526460305-e1/00526460305-e1.jpg?ts=1735307340273&w=563",
  },
];

export default function Homepage() {
  return (
    <div className="min-h-screen bg-gray-900 p-8 font-['SF_Pro_Display',-apple-system,BlinkMacSystemFont,system-ui,sans-serif]">
      <HeroSection />

      <div className="max-w-7xl mx-auto mt-8">
        <br />
  
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
};