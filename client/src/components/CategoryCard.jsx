import React from 'react';

const CategoryCard = ({ imageUrl, title, description }) => {
    return (
        <div className="bg-white border border-gray-100 rounded-lg overflow-hidden w-full max-w-[280px] mx-auto h-[420px] flex flex-col transition-all duration-200 hover:border-black cursor-pointer">
            <div className="relative h-[240px]"> {/* Increased image container height */}
                <img
                    src={imageUrl}
                    alt={title}
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="p-4 flex flex-col space-y-2 flex-grow"> {/* Added flex-grow */}
                <h3 className="text-xl font-bold text-gray-900 text-center mb-2"> {/* Centered title, slightly larger font */}
                    {title}
                </h3>
                <p className="text-sm text-gray-500 text-center overflow-hidden overflow-ellipsis line-clamp-3 mb-4"> {/* Centered description, added mb-4 for spacing */}
                    {description}
                </p>
            </div>
        </div>
    );
};

export default CategoryCard;
