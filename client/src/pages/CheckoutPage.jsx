import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

const CheckoutPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCartItems();
        fetchAddresses();
    }, []);

    const fetchCartItems = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/cart`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setCartItems(response.data.items);
        } catch (error) {
            console.error("Error fetching cart items:", error);
        }
    };

    const fetchAddresses = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/addresses`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setAddresses(response.data);
        } catch (error) {
            console.error("Error fetching addresses:", error);
        }
    };

    useEffect(() => {
        if (addresses.length > 0 && !selectedAddress) {
            setSelectedAddress(addresses[0]);
        }
    }, [addresses]);

    const calculateTotal = () => {
        return cartItems.reduce(
            (total, item) => total + item.product.price * item.quantity,
            0
        );
    };

    const handlePlaceOrder = async () => {
        if (!selectedAddress) {
            alert("Please select a shipping address");
            return;
        }

        try {
            const token = localStorage.getItem("token");

            const orderPayload = {
                address: selectedAddress._id,
                products: cartItems.map((item) => ({
                    product: item.product._id,
                    quantity: item.quantity,
                })),
            };

            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/orders`,
                orderPayload,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.status === 201) {
                setOrderPlaced(true);
            }
        } catch (error) {
            console.error("Error placing order:", error);
            alert("Error placing order. Please try again.");
        }
    };

    // ✅ Clears the cart only AFTER the confirmation page is displayed
    useEffect(() => {
        const clearCart = async () => {
            if (orderPlaced) {
                try {
                    const token = localStorage.getItem("token");
                    await axios.delete(`${import.meta.env.VITE_API_URL}/cart/clear`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                } catch (error) {
                    console.error("Error clearing cart:", error);
                }
            }
        };

        clearCart();
    }, [orderPlaced]);

    return (
        <motion.div className="min-h-screen pt-24 px-4">
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow">
                {orderPlaced ? (
                    <div>
                        <h1 className="text-4xl font-bold mb-4 text-center">Order Confirmed!</h1>
                        <p className="mb-6 text-center">Thank you for your purchase. Here are your order details:</p>

                        <div className="mb-6">
                            <h2 className="text-2xl font-semibold mb-2">Shipping Address</h2>
                            {selectedAddress && (
                                <p>{selectedAddress.street}, {selectedAddress.city}, {selectedAddress.state}, {selectedAddress.postalCode}</p>
                            )}
                        </div>

                        <div className="mb-6">
                            <h2 className="text-2xl font-semibold mb-2">Ordered Items</h2>
                            <div className="space-y-4">
                                {cartItems.map((item) => (
                                    <div key={item._id} className="flex items-center gap-4 p-4 bg-gray-100 rounded-lg">
                                        <img src={item.product.imageUrl} alt={item.product.name} className="w-16 h-16 object-cover rounded" />
                                        <div>
                                            <h3 className="font-semibold">{item.product.name}</h3>
                                            <p>Quantity: {item.quantity}</p>
                                            <p>Price: ₹{item.product.price}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-between items-center mb-6">
                            <span className="font-bold text-xl">Total:</span>
                            <span className="font-bold text-xl">₹{calculateTotal().toFixed(2)}</span>
                        </div>

                        <button
                            onClick={() => navigate("/")}
                            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800"
                        >
                            Back to Home
                        </button>
                    </div>
                ) : (
                    <>
                        <h1 className="text-3xl font-bold mb-4">Checkout</h1>

                        <div className="mb-6">
                            <h2 className="text-2xl font-semibold mb-2">Select Shipping Address</h2>
                            {addresses.length > 0 ? (
                                <div className="space-y-2">
                                    {addresses.map((address) => (
                                        <label key={address._id} className="flex items-center gap-2 p-2 border rounded">
                                            <input
                                                type="radio"
                                                name="address"
                                                value={address._id}
                                                checked={selectedAddress && selectedAddress._id === address._id}
                                                onChange={() => setSelectedAddress(address)}
                                            />
                                            <span>{address.street}, {address.city}, {address.state}, {address.postalCode}</span>
                                        </label>
                                    ))}
                                </div>
                            ) : (
                                <p>No shipping addresses found.</p>
                            )}
                        </div>

                        <div className="mb-6">
                            <h2 className="text-2xl font-semibold mb-2">Order Summary</h2>
                            <div className="space-y-4">
                                {cartItems.map((item) => (
                                    <div key={item._id} className="flex items-center gap-4 p-4 bg-gray-100 rounded-lg">
                                        <img src={item.product.imageUrl} alt={item.product.name} className="w-16 h-16 object-cover rounded" />
                                        <div>
                                            <h3 className="font-semibold">{item.product.name}</h3>
                                            <p>Quantity: {item.quantity}</p>
                                            <p>Price: ₹{item.product.price}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-between items-center mt-4">
                                <span className="font-bold text-xl">Total:</span>
                                <span className="font-bold text-xl">₹{calculateTotal().toFixed(2)}</span>
                            </div>
                        </div>

                        <button
                            onClick={handlePlaceOrder}
                            disabled={cartItems.length === 0}
                            className={`w-full py-3 rounded-lg ${cartItems.length === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-black text-white hover:bg-gray-800"}`}
                        >
                            Place Order
                        </button>
                    </>
                )}
            </div>
        </motion.div>
    );
};

export default CheckoutPage;