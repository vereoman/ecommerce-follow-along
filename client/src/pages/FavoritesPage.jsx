import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import { motion } from 'framer-motion';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavoriteProducts = async () => {
      try {
        const favoriteIds = JSON.parse(localStorage.getItem('favorites')) || [];
        const token = localStorage.getItem('token');
        
        const products = await Promise.all(
          favoriteIds.map(async (id) => {
            const response = await axios.get(`http://localhost:5000/api/products/${id}`, {
              headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
          })
        );
        
        setFavorites(products);
      } catch (error) {
        console.error('Error fetching favorite products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavoriteProducts();
  }, []);

  const handleToggleFavorite = (productId) => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const updatedFavorites = favorites.filter(id => id !== productId);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setFavorites(prev => prev.filter(product => product._id !== productId));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading favorites...</div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-24"
    >
      {favorites.length === 0 ? (
        <div className="text-center text-gray-600">
          No favorite products yet
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {favorites.map((product) => (
            <ProductCard
              key={product._id}
              id={product._id}
              name={product.name}
              price={product.price}
              originalPrice={product.price * 1.2}
              image={product.imageUrl}
              description={product.description}
              isFavorite={true}
              onToggleFavorite={() => handleToggleFavorite(product._id)}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default FavoritesPage; 