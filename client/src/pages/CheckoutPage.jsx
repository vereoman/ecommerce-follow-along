import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const CheckoutPage = () => {
    const [orderPlaced, setOrderPlaced] = useState(false);
    const navigate = useNavigate();

    const handlePlaceOrder = () => {
        // Here you would normally call your API to create the order.
        // For this example, we simply set orderPlaced to true.
        setOrderPlaced(true);
    };

    if (orderPlaced) {
        return (
            <div className="min-h-screen flex items-center justify-center pt-24">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Order Confirmed!</h1>
                    <p>Your order has been placed successfully.</p>
                    <button 
                        onClick={() => navigate("/")} 
                        className="mt-6 bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition-colors"
                    >
                        Go to Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <motion.div 
            className="min-h-screen pt-24 px-4"
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.5 }}
        >
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow">
                <h1 className="text-3xl font-bold mb-4">Checkout</h1>
                <div className="mb-4">
                    <p>Review your order details below:</p>
                    <p>Subtotal: $XXX.XX</p>
                    <p>Shipping Address: [Your selected address]</p>
                </div>

                <button 
                    onClick={handlePlaceOrder} 
                    className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors"
                >
                    Place Order
                </button>
            </div>
        </motion.div>
    );
};

export default CheckoutPage;
