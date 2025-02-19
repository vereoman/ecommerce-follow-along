import React, { useState } from "react";
import { PencilSimple, TrashSimple } from "@phosphor-icons/react";
import axios from "axios";
import { motion } from "framer-motion";

const EditForm = ({ product, onCancel, onSave, error }) => {
    const [editedProduct, setEditedProduct] = useState(product);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(editedProduct);
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
            {error && (
                <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                    {error}
                </div>
            )}

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                </label>
                <input
                    type="text"
                    value={editedProduct.name}
                    onChange={(e) =>
                        setEditedProduct({
                            ...editedProduct,
                            name: e.target.value,
                        })
                    }
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                </label>
                <textarea
                    value={editedProduct.description}
                    onChange={(e) =>
                        setEditedProduct({
                            ...editedProduct,
                            description: e.target.value,
                        })
                    }
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows="3"
                    required
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Price
                    </label>
                    <input
                        type="number"
                        value={editedProduct.price}
                        onChange={(e) =>
                            setEditedProduct({
                                ...editedProduct,
                                price: e.target.value,
                            })
                        }
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        step="0.01"
                        min="0"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category
                    </label>
                    <select
                        value={editedProduct.category}
                        onChange={(e) =>
                            setEditedProduct({
                                ...editedProduct,
                                category: e.target.value,
                            })
                        }
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                    >
                        <option value="running">Running</option>
                        <option value="training">Training</option>
                        <option value="basketball">Basketball</option>
                        <option value="tennis">Tennis</option>
                        <option value="soccer">Soccer</option>
                        <option value="golf">Golf</option>
                        <option value="hiking">Hiking</option>
                    </select>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gender
                </label>
                <select
                    value={editedProduct.gender}
                    onChange={(e) =>
                        setEditedProduct({
                            ...editedProduct,
                            gender: e.target.value,
                        })
                    }
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                >
                    <option value="mens">Men's</option>
                    <option value="womens">Women's</option>
                    <option value="kids">Kids</option>
                    <option value="unisex">Unisex</option>
                </select>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    Save Changes
                </button>
            </div>
        </form>
    );
};

const SellerProductCard = ({ product, onDelete, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState("");

    const handleEditSubmit = async (editedProduct) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.put(
                `${import.meta.env.VITE_API_URL}/products/${product._id}`,
                editedProduct,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            onUpdate(response.data);
            setIsEditing(false);
            setError("");
        } catch (error) {
            setError(
                error.response?.data?.message || "Error updating product"
            );
        }
    };

    const handleDelete = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("No authentication token found");
            }

            await axios.delete(
                `${import.meta.env.VITE_API_URL}/products/${product._id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (onDelete) {
                onDelete(product._id);
            }
        } catch (error) {
            console.error("Error deleting product:", error);
            alert(
                error.response?.data?.message || "Error deleting product"
            );
        } finally {
            setIsDeleting(false);
        }
    };

    if (isEditing) {
        return (
            <div className="bg-white border border-gray-100 rounded-lg shadow-sm overflow-hidden">
                <div className="relative h-48">
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover"
                    />
                </div>
                <EditForm
                    product={product}
                    onCancel={() => setIsEditing(false)}
                    onSave={handleEditSubmit}
                    error={error}
                />
            </div>
        );
    }

    return (
        <motion.div
            className="group cursor-pointer border border-gray-300 rounded-lg overflow-hidden hover:border-black transition-colors duration-300"
        >
            <div className="relative overflow-hidden">
                {product.imageUrl ? (
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-64 object-cover transition-transform duration-300"
                    />
                ) : (
                    <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500">No image available</span>
                    </div>
                )}
                <motion.div
                    className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <button
                        onClick={() => setIsEditing(true)}
                        className="p-2 bg-white rounded-lg shadow-sm hover:bg-gray-100 transition-colors duration-200"
                    >
                        <PencilSimple size={16} className="text-gray-600" />
                    </button>
                    <button
                        onClick={() => setIsDeleting(true)}
                        className="p-2 bg-white rounded-lg shadow-sm hover:bg-gray-100 transition-colors duration-200"
                    >
                        <TrashSimple size={16} className="text-red-600" />
                    </button>
                </motion.div>
            </div>

            <div className="p-4 space-y-2">
                <h3 className="font-semibold text-gray-800 text-lg">{product.name}</h3>
                <div className="flex items-center justify-between">
                    <span className="text-lg font-bold">₹{product.price.toFixed(2)}</span>
                    <div className="flex flex-col items-end">
                        <span className="text-sm text-gray-500">
                            {product.category}
                        </span>
                        <span className="text-sm text-gray-500">
                            {product.gender}
                        </span>
                    </div>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
            </div>

            {isDeleting && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg max-w-sm mx-4">
                        <h3 className="text-lg font-bold mb-4">
                            Delete Product
                        </h3>
                        <p className="mb-6">
                            Are you sure you want to delete this product?
                        </p>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() => setIsDeleting(false)}
                                className="px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </motion.div>
    );
};

export default SellerProductCard;