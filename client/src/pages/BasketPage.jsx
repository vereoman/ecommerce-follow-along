import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Trash, Plus, Minus } from "@phosphor-icons/react";

const BasketPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchCartItems();
    }, []);

    const fetchCartItems = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get("http://localhost:5000/api/cart", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setCartItems(response.data.items);
        } catch (error) {
            console.error("Error fetching cart:", error);
            setError("Failed to load cart items");
        } finally {
            setLoading(false);
        }
    };

    const handleQuantityChange = async (itemId, newQuantity) => {
        try {
            const token = localStorage.getItem("token");
            await axios.put(
                `http://localhost:5000/api/cart/items/${itemId}`,
                { quantity: newQuantity },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            fetchCartItems();
        } catch (error) {
            console.error("Error updating quantity:", error);
        }
    };

    const handleRemoveItem = async (itemId) => {
        try {
            const token = localStorage.getItem("token");
            await axios.delete(
                `http://localhost:5000/api/cart/items/${itemId}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            fetchCartItems();
        } catch (error) {
            console.error("Error removing item:", error);
        }
    };

    const calculateTotal = () => {
        return cartItems.reduce(
            (total, item) => total + item.product.price * item.quantity,
            0
        );
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center mt-24">
                <div className="text-xl text-gray-600">Loading cart...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center mt-24">
                <div className="text-xl text-red-600">{error}</div>
            </div>
        );
    }

    return (
        <motion.div
            className="min-h-screen py-8 px-4 mt-24"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="max-w-4xl mx-auto">
                <h1 className="text-6xl font-bold mb-8 text-center">
                    Your Shoes.
                </h1>

                {cartItems.length === 0 ? (
                    <div className="text-center py-8">
                        <p className="text-gray-600">Your basket is empty</p>
                    </div>
                ) : (
                    <>
                        <div className="space-y-4">
                            {cartItems.map((item) => (
                                <div
                                    key={item._id}
                                    className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-200"
                                >
                                    <img
                                        src={item.product.imageUrl}
                                        alt={item.product.name}
                                        className="w-24 h-24 object-cover rounded-md"
                                    />

                                    <div className="flex-grow">
                                        <h3 className="font-semibold">
                                            {item.product.name}
                                        </h3>
                                        <p className="text-gray-600">
                                            Size: {item.size}
                                        </p>
                                        <p className="text-gray-800">
                                            ${item.product.price}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() =>
                                                handleQuantityChange(
                                                    item._id,
                                                    Math.max(1, item.quantity - 1)
                                                )
                                            }
                                            className="p-1 hover:bg-gray-100 rounded"
                                        >
                                            <Minus size={20} />
                                        </button>
                                        <span className="w-8 text-center">
                                            {item.quantity}
                                        </span>
                                        <button
                                            onClick={() =>
                                                handleQuantityChange(
                                                    item._id,
                                                    item.quantity + 1
                                                )
                                            }
                                            className="p-1 hover:bg-gray-100 rounded"
                                        >
                                            <Plus size={20} />
                                        </button>
                                    </div>

                                    <button
                                        onClick={() =>
                                            handleRemoveItem(item._id)
                                        }
                                        className="p-2 text-red-500 hover:text-red-600"
                                    >
                                        <Trash size={20} />
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                            <div className="flex justify-between items-center mb-4">
                                <span className="font-semibold">Total:</span>
                                <span className="text-xl font-bold">
                                    ${calculateTotal().toFixed(2)}
                                </span>
                            </div>
                            <button className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors">
                                Proceed to Checkout
                            </button>
                        </div>
                    </>
                )}
            </div>
        </motion.div>
    );
};

export default BasketPage;