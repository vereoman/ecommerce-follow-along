import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ShoppingBag } from "@phosphor-icons/react";
import { motion } from "framer-motion";

const ProductCard = ({ id, image, name, price, originalPrice, description }) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleCardClick = (e) => {
        if (e.target.closest("button")) {
            return;
        }
        navigate(`/product/${id}`);
    };

    const handleAddToCart = async (e) => {
        e.stopPropagation();

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/login");
                return;
            }

            setIsLoading(true);

            const cartResponse = await axios.get("http://localhost:5000/api/cart", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            const existingItem = cartResponse.data.items.find(
                (item) => item.product._id === id && item.size === "10"
            );

            if (existingItem) {
                await axios.put(
                    `http://localhost:5000/api/cart/items/${existingItem._id}`,
                    { quantity: existingItem.quantity + 1 },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );
            } else {
                await axios.post(
                    "http://localhost:5000/api/cart/add",
                    {
                        productId: id,
                        quantity: 1,
                        size: "10",
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                        withCredentials: true,
                    }
                );
            }

            alert("Product added to cart!");
        } catch (error) {
            console.error("Error managing cart:", error);
            console.error("Error response:", error.response?.data);
            alert(error.response?.data?.message || "Failed to update cart");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <motion.div
            className="group cursor-pointer border border-gray-300 rounded-lg overflow-hidden hover:border-black transition-colors duration-300"
            onClick={handleCardClick}
        >
            <div className="relative overflow-hidden">
                <img
                    src={image || "/placeholder.svg"}
                    alt={name}
                    className="w-full h-64 object-cover transition-transform duration-300"
                />
                <motion.button
                    className="absolute top-4 right-4 bg-black text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleAddToCart}
                    disabled={isLoading}
                >
                    <ShoppingBag size={20} weight="bold" />
                </motion.button>
            </div>
            <div className="p-4 space-y-2">
                <h3 className="font-semibold text-gray-800 text-lg">{name}</h3>
                <div className="flex items-center gap-2">
                    <span className="text-lg font-bold">₹{price.toFixed(2)}</span>
                    <span className="text-sm text-gray-500 line-through">${originalPrice.toFixed(2)}</span>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
            </div>
        </motion.div>
    );
};

export default ProductCard;