import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const ProductForm = ({ onSuccess, onClose }) => {
    const [image, setImage] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [previewUrl, setPreviewUrl] = useState(null);
    const [category, setCategory] = useState("running");
    const [gender, setGender] = useState("unisex");

    const categories = [
        "running",
        "training",
        "basketball",
        "sneakers",
        "slip-ons",
    ];
    const genders = ["mens", "womens", "kids"];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");

        if (!image) {
            setError("Product image is required");
            setIsSubmitting(false);
            return;
        }

        const formData = new FormData();
        formData.append("name", e.target.name.value);
        formData.append("description", e.target.description.value);
        formData.append("price", e.target.price.value);
        formData.append("category", category);
        formData.append("gender", gender);
        formData.append("image", image);

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setError("Authentication token not found. Please login again.");
                setIsSubmitting(false);
                return;
            }

            for (let pair of formData.entries()) {
                console.log("FormData:", pair[0], pair[1]);
            }

            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/products`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            e.target.reset();
            setImage(null);
            setPreviewUrl(null);
            if (onSuccess) {
                onSuccess(response.data.product);
            }
        } catch (error) {
            console.error("Form submission error:", error);
            console.error("Error response:", error.response?.data);
            if (error.response?.status === 401) {
                setError("Session expired. Please login again.");
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                window.location.href = "/login";
            } else {
                setError(error.response?.data?.message || "Error creating product");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!file.type.startsWith("image/")) {
                setError("Please upload an image file");
                return;
            }
            console.log("Selected image:", file);
            setImage(file);
            const reader = new FileReader();
            reader.onload = () => setPreviewUrl(reader.result);
            reader.readAsDataURL(file);
        }
    };

    return (
        <motion.form
            onSubmit={handleSubmit}
            className="relative space-y-4 p-6 bg-white rounded-lg shadow-md"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {onClose && (
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                >
                    &#x2715;
                </button>
            )}

            {error && (
                <motion.div
                    className="bg-red-50 border border-red-500 text-red-700 px-4 py-3 rounded-lg"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                >
                    {error}
                </motion.div>
            )}

            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Name
                </label>
                <input
                    name="name"
                    required
                    className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter product name"
                />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
            >
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                </label>
                <textarea
                    name="description"
                    required
                    className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter product description"
                    rows={4}
                />
            </motion.div>

            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category
                    </label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat.charAt(0).toUpperCase() + cat.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Gender
                    </label>
                    <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        {genders.map((gen) => (
                            <option key={gen} value={gen}>
                                {gen.charAt(0).toUpperCase() + gen.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
            >
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price
                </label>
                <input
                    type="number"
                    name="price"
                    required
                    min="0"
                    step="0.01"
                    className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter price"
                />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
            >
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Image
                </label>
                <input
                    type="file"
                    onChange={handleImageChange}
                    accept="image/*"
                    className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {previewUrl && (
                    <motion.div
                        className="mt-4"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <img
                            src={previewUrl}
                            alt="Preview"
                            className="w-32 h-32 object-cover rounded-lg"
                        />
                    </motion.div>
                )}
            </motion.div>

            <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-black text-white py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors duration-200 disabled:bg-blue-800 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3 }}
            >
                {isSubmitting ? "Creating Product..." : "Create Product"}
            </motion.button>
        </motion.form>
    );
};

export default ProductForm;