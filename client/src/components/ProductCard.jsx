import React from 'react';
import { Heart, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({
  id,
  image,
  name,
  price,
  originalPrice,
  description,
  isFavorite,
  onToggleFavorite
}) => {
  const navigate = useNavigate();

  const handleCardClick = (e) => {
    // Prevent navigation if clicking on the favorite or cart buttons
    if (e.target.closest('button')) {
      return;
    }
    navigate(`/product/${id}`);
  };

  return (
    <div 
      className="bg-white border border-gray-100 rounded-lg overflow-hidden w-full max-w-[280px] mx-auto h-[400px] flex flex-col transition-shadow duration-200 cursor-pointer hover:border-black"
      onClick={handleCardClick}
    >
      <div className="relative h-[200px]">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
       
        <div className="absolute top-3 right-3 flex gap-2">
          <button

            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite?.();
            }}
            className="p-2 bg-white rounded-full hover:bg-gray-50 transition-colors duration-200"
          >
            <Heart
              className={isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-600'}
              size={16}
            />
          </button>
          <button
            onClick={(e) => e.stopPropagation()}
            className="p-2 bg-white rounded-full hover:bg-gray-50 transition-colors duration-200"
          >
            <ShoppingBag
              className="text-gray-600"
              size={16}
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
