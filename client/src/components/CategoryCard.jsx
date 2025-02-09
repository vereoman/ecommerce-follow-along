import React from 'react';
import { ArrowRight } from '@phosphor-icons/react';

const CategoryCard = ({
  imageUrl,
  title,
  description,
  buttonText,
  onShopNow,
}) => {
  return (
    <div className="bg-white border border-gray-100 rounded-lg overflow-hidden w-full max-w-[280px] mx-auto h-[450px] flex flex-col transition-all duration-200 hover:border-black cursor-pointer">
      <div className="relative h-[250px]">
        <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="p-4 flex flex-col space-y-2 flex-grow">
        <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
          {title}
        </h3>
        <p className="text-sm text-gray-500 text-center overflow-hidden overflow-ellipsis line-clamp-3 mb-4">
          {description}
        </p>
        <div className="mt-4 mb-4 pt-4 pb-4">
          {/* Changed mt-6 to mt-auto and added pt-8 for more space */}
          <button
            onClick={onShopNow}
            className="w-full bg-black hover:bg-gray-800 text-white py-3 px-4 rounded-lg transition-colors duration-200 font-medium flex items-center justify-center gap-2"
          >
            {buttonText}
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
export default CategoryCard;