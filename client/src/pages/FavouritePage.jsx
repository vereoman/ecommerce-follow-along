import React from 'react';
import ProductCard from './ProductCard';

const FavoritesPage = ({ favorites = [] }) => {
  if (favorites.length === 0) {
    return (
      <div className="max-w-[1100px] mx-auto px-6 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Your Favorites
          </h2>
          <p className="text-gray-500">
            You haven't added any shoes to your favorites yet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1100px] mx-auto px-6 py-12">
      <h2 className="text-2xl font-semibold text-gray-900 mb-8">
        Your Favorites
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {favorites.map((shoe) => (
          <ProductCard
            key={shoe.id}
            image={shoe.image}
            name={shoe.name}
            price={shoe.price}
            originalPrice={shoe.originalPrice}
            description={shoe.description}
          />
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;