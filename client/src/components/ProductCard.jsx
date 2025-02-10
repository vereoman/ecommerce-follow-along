import React from 'react';
import { Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from '@phosphor-icons/react';
import axios from 'axios';

const ProductCard = ({
  id,
  image,
  name,
  price,
  originalPrice,
  description,
  isFavorite,
  onToggleFavorite,
}) => {
  const navigate = useNavigate();

  const handleCardClick = (e) => {
    if (e.target.closest('button')) {
      return;
    }
    navigate(`/product/${id}`);
  };

  const handleAddToCart = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      console.log('Adding to cart:', {
        productId: id,
        quantity: 1,
        size: '9'
      });

      const response = await axios.post(
        'http://localhost:5000/api/cart/add',
        {
          productId: id,
          quantity: 1,
          size: '9'
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('Cart response:', response.data);
      alert('Product added to cart!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      if (error.response) {
        console.error('Error response:', error.response.data);
        alert(error.response.data.message || 'Failed to add product to cart');
      } else {
        alert('Failed to add product to cart');
      }
    }
  };

  return (
    <div
      className="bg-white border border-gray-100 rounded-lg overflow-hidden w-full max-w-[280px] mx-auto h-[500px] flex flex-col transition-shadow duration-200 cursor-pointer hover:border-black"
      onClick={handleCardClick}
    >
      <div className="relative h-[280px]">
        {/* Increased height for the image */}
        <img src={image} alt={name} className="w-full h-full object-cover" />
        <div className="absolute top-3 right-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite?.();
            }}
            className="p-2 bg-white rounded-full hover:bg-gray-50 transition-colors duration-200"
          >
            <Heart
              className={
                isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-600'
              }
              size={16}
            />
          </button>
        </div>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-medium text-gray-900 mb-2">{name}</h3>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg font-semibold text-gray-900">
            ${price}
          </span>
          <span className="text-sm text-gray-500 line-through">
            ${originalPrice}
          </span>
        </div>
        <p className="text-sm text-gray-500 overflow-hidden overflow-ellipsis line-clamp-2 mb-4">
          {description}
        </p>
        <div className="mt-auto">
          {/* Changed to mt-auto to push button to bottom */}
          <button
            onClick={handleAddToCart}
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors duration-200"
          >
            Add to Basket
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;