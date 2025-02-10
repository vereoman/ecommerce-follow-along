import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);
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
        } catch (error) {
            console.error('Error fetching cart:', error);
            // Check specifically for authentication errors
            if (error.response?.status === 401) {
                // Clear invalid token
                localStorage.removeItem('token');
                navigate('/login');
                return;
            }
            setError('Failed to load cart items');
        } finally {
            setLoading(false);
        }
    };

    const updateQuantity = async (itemId, quantity) => {
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
            fetchCart();
        } catch (error) {
            console.error('Error updating quantity:', error);
            if (error.response?.status === 401) {
                localStorage.removeItem('token');
                navigate('/login');
                return;
            }
            alert('Failed to update quantity');
        }
    };

    const removeItem = async (itemId) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            await axios.delete(`http://localhost:5000/api/cart/items/${itemId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchCart();
        } catch (error) {
            console.error('Error removing item:', error);
            if (error.response?.status === 401) {
                localStorage.removeItem('token');
                navigate('/login');
                return;
            }
            alert('Failed to remove item');
        }
    };

    useEffect(() => {
        fetchCart();
    }, [fetchCart]);

    return (
        <div>
            {/* Render your component content here */}
        </div>
    );
};

export default CartPage; 