import React from "react";
import { CircleEllipsis, Search, Heart, ShoppingBag, CircleUserRound, CircleHelp } from "lucide-react";

export default function HeroSection() {
  return (
    <div className="relative h-96">
      <img
        src="https://i.redd.it/jlpv3gf20c291.png"
        alt="Hero Background"
        className="absolute inset-0 w-full h-full object-cover opacity-100 rounded-xl"
      />
      
      {/* Navigation */}
      <nav className="absolute w-full p-8 flex justify-between items-center z-10">
        <div className="flex gap-8">
          
        </div>
        
        <div className="flex gap-8">
          <Search className="w-6 h-6 text-white cursor-pointer hover:opacity-80 transition-opacity" />
          <CircleEllipsis className="w-6 h-6 text-white cursor-pointer hover:opacity-80 transition-opacity" />
          <CircleHelp className="w-6 h-6 text-white cursor-pointer hover:opacity-80 transition-opacity" />
          <Heart className="w-6 h-6 text-white cursor-pointer hover:opacity-80 transition-opacity" />
          <ShoppingBag className="w-6 h-6 text-white cursor-pointer hover:opacity-80 transition-opacity" />
          <CircleUserRound className="w-6 h-6 text-white cursor-pointer hover:opacity-80 transition-opacity" />
        </div>
      </nav>

      <div className="relative h-full flex flex-col items-center justify-center">
        <h1 className="text-3xl font-extrabold text-white mb-4 text-center">
          Welcome to Our Store
        </h1>
        <p className="text-white text-center mb-8 px-32">
          Transcend ordinary fashion with our exquisite collection, where every
          garment is a masterpiece of precision and passion. Meticulously crafted
          from the finest materials, our clothing embodies timeless elegance and
          uncompromising quality. Designed for the sophisticated individual who
          appreciates artistry, craftsmanship, and the subtle language of refined
          style.
        </p>
      </div>
    </div>
  );
}