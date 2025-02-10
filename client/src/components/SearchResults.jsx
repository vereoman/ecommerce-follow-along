import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { X } from '@phosphor-icons/react';

const SearchResults = ({ results = [], setIsSearchOpen, searchQuery, setSearchQuery }) => {
  const navigate = useNavigate();

  const handleProductClick = (productId) => {
    setIsSearchOpen(false);
    navigate(`/product/${productId}`);
  };

  return (
    <div>
      <div className="relative mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for shoes..."
          className="w-full px-6 py-4 text-xl bg-white/90 backdrop-blur-sm rounded-xl shadow-lg outline-none"
        />
        <motion.button
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          onClick={() => {
            setSearchQuery('');
            setIsSearchOpen(false);
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2"
          style={{ transform: 'translateY(-50%)' }}
        >
          <X size={24} weight="bold" />
        </motion.button>
      </div>

      {results.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No products found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {results.map((product) => (
            <div
              key={product._id}
              onClick={() => handleProductClick(product._id)}
              className="flex items-center gap-4 p-4 bg-white rounded-lg cursor-pointer hover:bg-gray-50 transition-colors duration-200"
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-20 h-20 object-cover rounded"
              />
              <div>
                <h3 className="font-medium text-gray-900">{product.name}</h3>
                <p className="text-gray-500">${product.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;