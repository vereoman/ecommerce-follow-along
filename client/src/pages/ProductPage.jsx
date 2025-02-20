import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ShoppingBag } from "@phosphor-icons/react";
import { motion } from "framer-motion";

const ProductPage = () => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/products/${id}`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                setProduct(response.data);
            } catch (err) {
                setError("Failed to load product details");
                console.error("Error fetching product:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();

        // Prevent the layout shift by preserving the scrollbar width
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        document.body.style.paddingRight = `${scrollbarWidth}px`;
        document.body.style.overflow = "hidden";
        
        window.scrollTo(0, 0);

        return () => {
            document.body.style.overflow = "auto";
            document.body.style.paddingRight = "0px";
        };
    }, [id]);

    const toggleDescription = () => {
        setIsDescriptionExpanded(!isDescriptionExpanded);
    };

    const handleAddToCart = async () => {
        try {
            console.log("Add to cart button clicked");

            if (!selectedSize) {
                alert("Please select a size");
                return;
            }

            const token = localStorage.getItem("token");
            console.log("Token:", token ? "exists" : "missing");

            if (!token) {
                navigate("/login");
                return;
            }

            console.log("Product:", product);
            console.log("Selected size:", selectedSize);

            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/cart/add`,
                {
                    productId: product._id,
                    size: selectedSize,
                    quantity: 1,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );

            console.log("Cart response:", response.data);
            alert(
                `Added ${product.name} (Size ${selectedSize}) to your cart!`
            );
        } catch (error) {
            console.error("Full error object:", error);
            console.error("Error response:", error.response);
            console.error("Error message:", error.message);
            alert(
                error.response?.data?.message ||
                    "Failed to add product to cart"
            );
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-xl text-gray-600"
                >
                    Loading product details...
                </motion.div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-xl text-red-600"
                >
                    {error || "Product not found"}
                </motion.div>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-white py-8 overflow-hidden"
        >
            <div className="mt-24">
                <div className="container mx-auto px-4 h-full flex flex-col">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-grow">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="relative"
                        >
                            <img
                                src={product.imageUrl}
                                alt={product.name}
                                className="w-full rounded-lg border border-gray-300 object-cover aspect-[4/3]"
                            />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="flex flex-col space-y-6"
                        >
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                    {product.name}
                                </h1>
                                <div className="relative">
                                    <p
                                        className={`text-xl text-gray-600 mb-2 ${
                                            isDescriptionExpanded ? "" : "line-clamp-3"
                                        }`}
                                    >
                                        {product.description}
                                    </p>
                                </div>
                                {product.description.split(" ").length > 30 && (
                                    <button
                                        onClick={toggleDescription}
                                        className="text-blue-600 hover:text-blue-700 mb-5"
                                    >
                                        {isDescriptionExpanded
                                            ? "Show Less"
                                            : "Show More"}
                                    </button>
                                )}

                                <div className="flex items-center gap-4 mb-6">
                                    <span className="text-2xl font-bold text-gray-900">
                                        ${product.price}
                                    </span>
                                    <span className="text-lg text-gray-500 line-through">
                                        ${(product.price * 1.2).toFixed(2)}
                                    </span>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold mb-3">
                                    Select Size
                                </h3>
                                <div className="grid grid-cols-4 gap-2">
                                    {[
                                        "6",
                                        "7",
                                        "8",
                                        "9",
                                        "10",
                                        "11",
                                        "12",
                                        "13",
                                    ].map((size) => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`py-3 border rounded-md ${
                                                selectedSize === size
                                                    ? "border-black bg-black text-white"
                                                    : "border-gray-300 text-gray-600 hover:border-black"
                                            }`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="flex gap-4 mt-6">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleAddToCart}
                                    className="flex-1 bg-black text-white py-4 rounded-lg hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center gap-2"
                                    disabled={!selectedSize}
                                >
                                    <ShoppingBag size={22} />
                                    Add to Basket
                                </motion.button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductPage;