import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const fetchOrders = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/orders`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setOrders(response.data || []);
        } catch (error) {
            console.error("Error fetching orders: ", error);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleCancelOrder = async (orderId) => {
        try {
            console.log("Canceling order:", orderId);
    
            const response = await axios.delete(
                `${import.meta.env.VITE_API_URL}/orders/${orderId}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
    
            console.log("Order canceled:", response.data);
            fetchOrders();
        } catch (error) {
            console.error("Error canceling order:", error.response?.data || error.message);
        }
    };

    return (
        <motion.div
            className="min-h-screen px-4 pb-8 pt-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="max-w-4xl mx-auto">
                <h1 className="text-6xl font-bold mb-8 text-center">
                    Your Orders.
                </h1>

                {orders.length === 0 ? (
                    <div className="text-center py-8">
                        <p className="text-gray-600">You have no orders yet.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {orders.map((order) => (
                            <div
                                key={order._id}
                                className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-200"
                            >
                                <img
                                    src={order.product?.imageUrl}
                                    alt={order.product?.name || "Product"}
                                    className="w-24 h-24 object-cover rounded-md"
                                />

                                <div className="flex-grow">
                                    <h3 className="font-semibold">{order.product?.name || "N/A"}</h3>
                                    <p className="text-gray-600">Quantity: {order.quantity}</p>
                                    <p className="text-gray-800">Status: {order.status}</p>
                                    <p className="text-gray-600">
                                        {order.shippingAddress.street}, {order.shippingAddress.city}, 
                                        {order.shippingAddress.state}, {order.shippingAddress.postalCode}
                                    </p>
                                </div>

                                {order.status !== "canceled" && (
                                    <button
                                        onClick={() => handleCancelOrder(order._id)}
                                        className="p-2 text-red-500 hover:text-red-600"
                                    >
                                        Cancel Order
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                <button
                    onClick={() => navigate("/")}
                    className="w-full mt-8 bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors"
                >
                    Back to Home
                </button>
            </div>
        </motion.div>
    );
};

export default MyOrders;