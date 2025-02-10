import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { HeartStraight, ShoppingBag } from '@phosphor-icons/react';

const ProductPage = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/api/products/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProduct(response.data);
      } catch (err) {
        setError('Failed to load product details');
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();

    // Prevent scrolling when the component mounts
    document.body.style.overflow = 'hidden';
    window.scrollTo(0, 0); // Scroll to the top of the page

    // Clean up the effect
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading product details...</div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-600">{error || 'Product not found'}</div>
      </div>
    );
  }

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  const handleAddToCart = async () => {
    try {
      if (!selectedSize) {
        alert('Please select a size');
        return;
      }

      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      await axios.post('http://localhost:5000/api/cart/add', {
        productId: product._id,
        quantity: 1,
        size: selectedSize
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      alert('Product added to cart!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add product to cart');
    }
  };

  return (
    <div className="min-h-screen bg-white py-8 overflow-hidden">
      <div className="container mx-auto px-4 h-full flex flex-col">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-grow">
          {/* Product Image Section */}
          <div className="relative">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full rounded-lg shadow-lg object-cover aspect-[4/3]"
            />
          </div>

          {/* Product Details Section */}
          <div className="flex flex-col space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <div className="relative">
                <p className={`text-xl text-gray-600 mb-2 ${isDescriptionExpanded ? '' : 'line-clamp-3'}`}>
                  {product.description}
                </p>
              </div>
              {product.description.split(' ').length > 30 && (
                <button
                  onClick={toggleDescription}
                  className="text-blue-600 hover:text-blue-700 mb-5" // Reduced the gap between the description and the button
                >
                  {isDescriptionExpanded ? 'Show Less' : 'Show More'}
                </button>

              )}

              <div className="flex items-center gap-4 mb-6">
                <span className="text-2xl font-bold text-gray-900">${product.price}</span>
                <span className="text-lg text-gray-500 line-through">
                  ${(product.price * 1.2).toFixed(2)}
                </span>
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Select Size</h3>
              <div className="grid grid-cols-4 gap-2">
                {['9', '9.5', '10', '10.5', '11', '11.5', '12', '12.5'].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 border rounded-md ${

                      selectedSize === size
                        ? 'border-black bg-black text-white' // Black border and background when selected
                        : 'border-gray-300 text-gray-600 hover:border-black' // Black border on hover
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-6">
              <button 
                onClick={handleAddToCart}
                className="flex-1 bg-black text-white py-4 rounded-lg hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center gap-2"
                disabled={!selectedSize}
              >
                <ShoppingBag size={22} />
                Add to Basket
              </button>
              <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <HeartStraight size={22} className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
