import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, Minus, Plus } from 'lucide-react';

const CartPage = () => {
    const [cart, setCart] = useState({ items: [] });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5000/api/cart', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setCart(response.data);
        } catch (error) {
            console.error('Error fetching cart:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateQuantity = async (itemId, quantity) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:5000/api/cart/items/${itemId}`,
                { quantity },
                { headers: { Authorization: `Bearer ${token}` }}
            );
            fetchCart();
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    };

    const removeItem = async (itemId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5000/api/cart/items/${itemId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchCart();
        } catch (error) {
            console.error('Error removing item:', error);
        }
    };

    const calculateTotal = () => {
        return cart.items.reduce((total, item) =>
            total + (item.product.price * item.quantity), 0
        ).toFixed(2);
    };

    if (loading) {
        return <div className="container mx-auto px-4 py-8">Loading...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-8">Shopping Cart</h1>

            {cart.items.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-gray-500">Your cart is empty</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2">
                        {cart.items.map((item) => (
                            <div key={item._id} className="flex items-center gap-4 p-4 border-b">
                                <img
                                    src={item.product.imageUrl}
                                    alt={item.product.name}
                                    className="w-24 h-24 object-cover rounded"
                                />
                                <div className="flex-grow">
                                    <h3 className="font-medium">{item.product.name}</h3>
                                    <p className="text-gray-500">Size: {item.size}</p>
                                    <p className="text-gray-500">${item.product.price}</p>
                                    <div className="flex items-center gap-2 mt-2">
                                        <button
                                            onClick={() => updateQuantity(item._id, Math.max(1, item.quantity - 1))}
                                            className="p-1 rounded hover:bg-gray-100"
                                        >
                                            <Minus size={16} />
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                            className="p-1 rounded hover:bg-gray-100"
                                        >
                                            <Plus size={16} />
                                        </button>
                                        <button
                                            onClick={() => removeItem(item._id)}
                                            className="p-1 rounded hover:bg-gray-100 ml-4"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="bg-gray-50 p-6 rounded-lg h-fit">
                        <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>${calculateTotal()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping</span>
                                <span>Free</span>
                            </div>
                            <div className="border-t pt-2 mt-2">
                                <div className="flex justify-between font-semibold">
                                    <span>Total</span>
                                    <span>${calculateTotal()}</span>
                                </div>
                            </div>
                            <button className="w-full bg-blue-600 text-white py-3 rounded-lg mt-4 hover:bg-blue-700">
                                Checkout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;
