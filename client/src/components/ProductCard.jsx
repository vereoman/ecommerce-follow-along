import React, { useState } from 'react';
import { HeartStraight, ShoppingBag } from '@phosphor-icons/react';

const ProductCard = ({ image, name, price, originalPrice, description = "A versatile and stylish sneaker that combines comfort with classic design." }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="bg-white border border-gray-100 rounded-lg shadow-sm overflow-hidden w-full max-w-[280px] mx-auto h-[400px] flex flex-col hover:shadow-md transition-shadow duration-200">
      <div className="relative h-[200px]">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
        
        <div className="absolute top-3 right-3 flex gap-2">
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-50 transition-colors duration-200"
          >
            <HeartStraight
              className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
              strokeWidth={1.5}
            />
          </button>
          <button
            className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-50 transition-colors duration-200"
          >
            <ShoppingBag
              className="w-4 h-4 text-gray-600"
              strokeWidth={1.5}
            />
          </button>
        </div>
      </div>
      
      <div className="p-4 flex flex-col space-y-2">
        <h3 className="text-lg font-medium text-gray-900">
          {name}
        </h3>
        
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold text-gray-900">
            ${price}
          </span>
          <span className="text-sm text-gray-500 line-through">
            ${originalPrice}
          </span>
        </div>
        
        <p className="text-sm text-gray-500 overflow-hidden overflow-ellipsis line-clamp-3">
          {description}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;