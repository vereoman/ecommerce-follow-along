import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BasketCard from '../components/BasketCard';

const BasketPage = () => {
    const navigate = useNavigate();
    const [cart, setCart] = useState({ items: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCart = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            const response = await axios.get('http://localhost:5000/api/cart', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setCart(response.data);
            setError(null);
        } catch (error) {
            console.error('Error fetching cart:', error);
            if (error.response?.status === 401) {
                localStorage.removeItem('token');
                navigate('/login');
                return;
            }
            setError('Failed to load cart items');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateQuantity = async (itemId, quantity) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            await axios.put(
                `http://localhost:5000/api/cart/items/${itemId}`,
                { quantity },
                { headers: { Authorization: `Bearer ${token}` }}
            );
            await fetchCart();
        } catch (error) {
            console.error('Error updating quantity:', error);
            if (error.response?.status === 401) {
                localStorage.removeItem('token');
                navigate('/login');
                return;
            }
            setError('Failed to update quantity');
        }
    };

    const handleRemoveItem = async (itemId) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            await axios.delete(`http://localhost:5000/api/cart/items/${itemId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            await fetchCart();
        } catch (error) {
            console.error('Error removing item:', error);
            if (error.response?.status === 401) {
                localStorage.removeItem('token');
                navigate('/login');
                return;
            }
            setError('Failed to remove item');
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    const calculateTotal = () => {
        return cart.items.reduce((total, item) => {
            return total + (item.product.price * item.quantity);
        }, 0);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-red-600">{error}</div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-center">Your Shopping Cart</h1>
            
            {cart.items.length === 0 ? (
                <div className="text-center text-gray-500">
                    <p>Your cart is empty</p>
                    <button
                        onClick={() => navigate('/products')}
                        className="mt-4 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                    >
                        Continue Shopping
                    </button>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {cart.items.map((item) => (
                            <BasketCard
                                key={item._id}
                                item={item}
                                onUpdateQuantity={handleUpdateQuantity}
                                onRemove={handleRemoveItem}
                            />
                        ))}
                    </div>
                    
                    <div className="mt-8 text-center">
                        <div className="text-2xl font-bold mb-4">
                            Total: ${calculateTotal().toFixed(2)}
                        </div>
                        <button
                            onClick={() => navigate('/checkout')}
                            className="px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default BasketPage; 