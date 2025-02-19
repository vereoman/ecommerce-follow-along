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

  const fetchCartItems = async () => {
    try {
      const token = localStorage.getItem("token");
      // If your server is mounted at "/api/cart"
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/cart`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // If your cart returns { items: [...] } in the response
      setCartItems(response.data.items);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const fetchAddresses = async () => {
    try {
      const token = localStorage.getItem("token");
      // If your server is mounted at "/api/addresses"
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/addresses`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setAddresses(response.data);

      // Automatically select the first address if none is selected
      if (response.data.length > 0 && !selectedAddress) {
        setSelectedAddress(response.data[0]);
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };

  useEffect(() => {
    fetchCartItems();
    fetchAddresses();
  }, []);

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
        userEmail: localStorage.getItem("userEmail"),
        address: selectedAddress._id, // sending address _id to the API
        products: cartItems.map((item) => ({
          product: item.product._id, // ensure you have the product ID
          quantity: item.quantity,
        })),
      };

      // If your server is mounted at "/api/orders"
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/orders`,
        orderPayload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 201) {
        // Optionally clear the cart here if desired
        setOrderPlaced(true);
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Error placing order. Please try again.");
    }
  };

  if (orderPlaced) {
    return (
      <motion.div
        className="min-h-screen pt-24 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow">
          <h1 className="text-4xl font-bold mb-4 text-center">
            Order Confirmed!
          </h1>
          <p className="mb-6 text-center">
            Thank you for your purchase. Here are your order details:
          </p>

          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Shipping Address</h2>
            {selectedAddress ? (
              <p className="text-gray-700">
                {selectedAddress.street}, {selectedAddress.city},{" "}
                {selectedAddress.state}, {selectedAddress.postalCode}
              </p>
            ) : (
              <p className="text-gray-700">No address selected.</p>
            )}
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Ordered Items</h2>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-4 p-4 bg-gray-100 rounded-lg"
                >
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-grow">
                    <h3 className="font-semibold">{item.product.name}</h3>
                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                    <p className="text-gray-800">
                      Price: ₹{item.product.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center mb-6">
            <span className="font-bold text-xl">Total:</span>
            <span className="font-bold text-xl">
              ₹{calculateTotal().toFixed(2)}
            </span>
          </div>

          <div className="flex justify-center">
            <button
              onClick={() => navigate("/")}
              className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </motion.div>
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

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">
            Select Shipping Address
          </h2>
          {addresses.length > 0 ? (
            <div className="space-y-2">
              {addresses.map((address) => (
                <label
                  key={address._id}
                  className="flex items-center gap-2 p-2 border rounded hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="address"
                    value={address._id}
                    checked={
                      selectedAddress && selectedAddress._id === address._id
                    }
                    onChange={() => setSelectedAddress(address)}
                  />
                  <span className="text-gray-700">
                    {address.street}, {address.city}, {address.state},{" "}
                    {address.postalCode}
                  </span>
                </label>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">
              No shipping addresses found. Please add one from your basket.
            </p>
          )}
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Order Summary</h2>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex items-center gap-4 p-4 bg-gray-100 rounded-lg"
              >
                <img
                  src={item.product.imageUrl}
                  alt={item.product.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-grow">
                  <h3 className="font-semibold">{item.product.name}</h3>
                  <p className="text-gray-600">Quantity: {item.quantity}</p>
                  <p className="text-gray-800">
                    ₹{item.product.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center mt-4">
            <span className="font-bold text-xl">Total:</span>
            <span className="font-bold text-xl">
              ₹{calculateTotal().toFixed(2)}
            </span>
          </div>
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
