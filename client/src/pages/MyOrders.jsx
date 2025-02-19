// src/pages/MyOrders.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  // Assume you store the logged-in user's email and token in localStorage.
  const userEmail = localStorage.getItem("userEmail");
  const token = localStorage.getItem("token");

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/orders`,
        {
          params: { userEmail },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setOrders(response.data.orders);
    } catch (error) {
      console.error("Error fetching orders: ", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleCancelOrder = async (orderId) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/orders/${orderId}/cancel`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // Refresh orders after cancellation
      fetchOrders();
    } catch (error) {
      console.error("Error canceling order: ", error);
    }
  };

  return (
    <motion.div
      className="min-h-screen pt-24 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow">
        <h1 className="text-3xl font-bold mb-4">My Orders</h1>
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          orders.map((order) => (
            <div key={order._id} className="border p-4 rounded mb-4">
              <p>
                <strong>Product:</strong>{" "}
                {order.product && order.product.name
                  ? order.product.name
                  : order.product}
              </p>
              <p>
                <strong>Quantity:</strong> {order.quantity}
              </p>
              <p>
                <strong>Status:</strong> {order.status}
              </p>
              <p>
                <strong>Shipping Address:</strong>{" "}
                {order.shippingAddress.street}, {order.shippingAddress.city},{" "}
                {order.shippingAddress.state},{" "}
                {order.shippingAddress.postalCode}
              </p>
              {order.status !== "canceled" && (
                <button
                  onClick={() => handleCancelOrder(order._id)}
                  className="mt-2 bg-red-500 text-white py-1 px-3 rounded"
                >
                  Cancel Order
                </button>
              )}
            </div>
          ))
        )}
        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition-colors"
        >
          Back to Home
        </button>
      </div>
    </motion.div>
  );
};

export default MyOrders;