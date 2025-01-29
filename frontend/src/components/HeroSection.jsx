import React from "react";
import { CircleEllipsis, Search, Heart, ShoppingBag, CircleUserRound, CircleHelp } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-950">
      <div className="max-w-[1400px] mx-auto px-8">
        <div className="relative h-[600px] rounded-xl overflow-hidden">
          <img
            src="https://i.redd.it/jlpv3gf20c291.png"
            alt="Hero Background"
            className="absolute inset-0 w-full h-full object-cover"
          />
          
          <div className="absolute inset-0 bg-black/40" />
          
          {/* Navigation */}
          <nav className="absolute w-full p-12 flex justify-between items-center z-10">
            <div className="flex gap-8">

            </div>
            
            <div className="flex items-center gap-6">
              <Search className="w-6 h-6 text-gray-100 cursor-pointer hover:text-indigo-400 transition-colors" />
              <CircleEllipsis className="w-6 h-6 text-gray-100 cursor-pointer hover:text-indigo-400 transition-colors" />
              <CircleHelp className="w-6 h-6 text-gray-100 cursor-pointer hover:text-indigo-400 transition-colors" />
              <Heart className="w-6 h-6 text-gray-100 cursor-pointer hover:text-indigo-400 transition-colors" />
              <ShoppingBag className="w-6 h-6 text-gray-100 cursor-pointer hover:text-indigo-400 transition-colors" />
              <CircleUserRound
                className="w-6 h-6 text-gray-100 cursor-pointer hover:text-indigo-400 transition-colors"
                onClick={() => navigate("/ecommerce-follow-along/profile")}
              />
            </div>
          </nav>

          <div className="relative h-full flex flex-col items-center justify-center px-4">
            <h1 className="text-5xl font-bold text-gray-100 mb-6 text-center max-w-3xl">
              Welcome to Our Store
            </h1>
            <p className="text-gray-200 text-center max-w-2xl text-lg leading-relaxed">
              Transcend ordinary fashion with our exquisite collection, where every
              garment is a masterpiece of precision and passion. Meticulously crafted
              from the finest materials, our clothing embodies timeless elegance and
              uncompromising quality.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}