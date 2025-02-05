import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PlusCircle, X } from "@phosphor-icons/react";
import axios from "axios";

const ProfilePage = ({ user, onSignOut }) => {
    const [showAddProduct, setShowAddProduct] = useState(false);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/items/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-950 text-gray-200 py-12">
            <div className="max-w-7xl mx-auto px-6">
                {/* Profile Section */}
                <div className="bg-gray-900 rounded-lg p-8 mb-8">
                    <div className="flex items-center space-x-6">
                        <img
                            src={user?.imageUrl || "https://via.placeholder.com/150"} // Fallback image if no imageUrl
                            alt="Profile"
                            className="w-24 h-24 rounded-full border-2 border-blue-500"
                        />
                        <div>
                            <h2 className="text-2xl font-bold text-gray-100">{user?.fullName || "Guest"}</h2>
                            <p className="text-gray-400">{user?.email || "No email provided"}</p>
                        </div>
                    </div>
                    <button
                        onClick={onSignOut}
                        className="mt-4 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors duration-200"
                    >
                        Sign Out
                    </button>
                </div>

                {/* Products Section */}
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-semibold text-gray-100">Your Products</h3>
                        {!showAddProduct && (
                            <button
                                onClick={() => setShowAddProduct(true)}
                                className="flex items-center gap-2 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200"
                            >
                                <PlusCircle size={20} />
                                Add New Product
                            </button>
                        )}
                    </div>

                    {/* Display Products */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map((product) => (
                            <div key={product._id} className="bg-gray-900 rounded-lg p-4">
                                <img
                                    src={`http://localhost:5000/uploads/${product.image}`}
                                    alt={product.name}
                                    className="w-full h-48 object-cover rounded-lg"
                                />
                                <h4 className="text-lg font-semibold mt-4 text-gray-100">{product.name}</h4>
                                <p className="text-gray-400">{product.description}</p>
                                <p className="text-gray-300 mt-2">${product.price}</p>
                                <p className="text-gray-500">{product.category}</p>
                            </div>
                        ))}
                    </div>

                    {showAddProduct && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                            <div className="bg-gray-900 rounded-lg w-full max-w-2xl relative">
                                <button
                                    onClick={() => setShowAddProduct(false)}
                                    className="absolute top-4 right-4 text-gray-400 hover:text-white"
                                >
                                    <X size={24} />
                                </button>
                                <ProductForm onClose={() => setShowAddProduct(false)} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const ProductForm = ({ onClose }) => {
    const [image, setImage] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [previewUrl, setPreviewUrl] = useState(null);
    const [category, setCategory] = useState('sports'); // Default to 'sports'
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        const formData = new FormData();
        formData.append('name', e.target.name.value);
        formData.append('description', e.target.description.value);
        formData.append('price', e.target.price.value);
        formData.append('category', category);
        if (image) {
            formData.append('image', image);
        }

        try {
            await axios.post('http://localhost:5000/items/products', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            onClose();
            navigate('/profile');
        } catch (error) {
            setError(error.response?.data?.message || 'Error creating product');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                setError('Please upload an image file');
                return;
            }
            setImage(file);
            const reader = new FileReader();
            reader.onload = () => setPreviewUrl(reader.result);
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-100">Add New Product</h2>
            {error && (
                <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded-lg mb-6">
                    {error}
                </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium mb-2">Product Name</label>
                    <input
                        name="name"
                        required
                        className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-gray-100"
                        placeholder="Enter product name"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <textarea
                        name="description"
                        required
                        className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-gray-100"
                        placeholder="Enter product description"
                        rows={4}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Price</label>
                    <input
                        type="number"
                        name="price"
                        required
                        min="0"
                        step="0.01"
                        className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-gray-100"
                        placeholder="Enter price"
                    />
                </div>

                {/* Category Selection */}
                <div>
                    <label className="block text-sm font-medium mb-2">Category</label>
                    <div className="flex items-center space-x-6">
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="category"
                                value="sports"
                                checked={category === 'sports'}
                                onChange={(e) => setCategory(e.target.value)}
                                className="hidden peer"
                            />
                            <span className="w-5 h-5 border border-gray-500 rounded-full flex items-center justify-center peer-checked:bg-blue-500 transition-all"></span>
                            <span className="ml-2 text-gray-300">Sports</span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="category"
                                value="lifestyle"
                                checked={category === 'lifestyle'}
                                onChange={(e) => setCategory(e.target.value)}
                                className="hidden peer"
                            />
                            <span className="w-5 h-5 border border-gray-500 rounded-full flex items-center justify-center peer-checked:bg-blue-500 transition-all"></span>
                            <span className="ml-2 text-gray-300">Lifestyle</span>
                        </label>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Product Image</label>
                    <input
                        type="file"
                        onChange={handleImageChange}
                        accept="image/*"
                        className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-gray-100 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-gray-100 hover:file:bg-blue-700"
                    />
                    {previewUrl && (
                        <div className="mt-4">
                            <img src={previewUrl} alt="Preview" className="w-32 h-32 object-cover rounded-lg" />
                        </div>
                    )}
                </div>

                <div className="flex gap-4">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:bg-blue-800 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? 'Creating Product...' : 'Create Product'}
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-3 border border-gray-600 rounded-lg hover:bg-gray-800 transition-colors duration-200"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProfilePage;