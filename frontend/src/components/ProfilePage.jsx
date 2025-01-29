import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [image, setImage] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        setError("");
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", data.price);
        formData.append("image", image);

        try {
            await axios.post("http://localhost:5000/items/products", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            navigate("/ecommerce-follow-along/home");
        } catch (error) {
            setError(error.response?.data?.message || "Error creating product");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    return (
        <div className="min-h-screen bg-gray-950 text-gray-200 py-12">
            <div className="max-w-2xl mx-auto px-6">
                <h1 className="text-4xl font-bold mb-12 text-gray-100">Add New Product</h1>
                {error && (
                    <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded-lg mb-6">
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium mb-2">Product Name</label>
                        <input
                            className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors text-gray-100"
                            {...register("name", { required: "Product name is required" })}
                            placeholder="Enter product name"
                        />
                        {errors.name && (
                            <span className="text-red-400 text-sm mt-1">{errors.name.message}</span>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Description</label>
                        <textarea
                            className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors text-gray-100"
                            {...register("description", { required: "Description is required" })}
                            placeholder="Enter product description"
                            rows={4}
                        />
                        {errors.description && (
                            <span className="text-red-400 text-sm mt-1">{errors.description.message}</span>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Price</label>
                        <input
                            type="number"
                            className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors text-gray-100"
                            {...register("price", {
                                required: "Price is required",
                                min: { value: 0, message: "Price must be positive" }
                            })}
                            placeholder="Enter price"
                            step="0.01"
                        />
                        {errors.price && (
                            <span className="text-red-400 text-sm mt-1">{errors.price.message}</span>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Product Image</label>
                        <input
                            type="file"
                            onChange={handleImageChange}
                            accept="image/*"
                            className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors text-gray-100 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-600 file:text-gray-100 hover:file:bg-indigo-700"
                        />
                        {!image && (
                            <span className="text-gray-400 text-sm mt-1">Please select an image</span>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors duration-200 disabled:bg-indigo-800 disabled:cursor-not-allowed mt-6"
                    >
                        {isSubmitting ? "Creating Product..." : "Create Product"}
                    </button>
                </form>
            </div>
        </div>
    );
}