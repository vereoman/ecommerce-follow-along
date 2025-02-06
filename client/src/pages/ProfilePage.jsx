import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserCircle } from "lucide-react";
import axios from "axios";

const ProfilePage = ({ onSignOut }) => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')) || {});

    useEffect(() => {
        if (user?.isSeller) {
            fetchProducts();
        }
    }, [user]);

    const fetchProducts = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5000/api/products/seller', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setProducts(response.data || []);
        } catch (error) {
            console.error('Error fetching products:', error);
            setProducts([]);
        }
    };

    const handleSignOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        onSignOut();
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-white py-8">
            <div className="max-w-7xl mx-auto px-6">
                {/* Profile Header */}
                <div className="bg-white border border-gray-100 rounded-lg shadow-sm p-6 mb-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            {user?.imageUrl ? (
                                <img src={user.imageUrl} alt="Profile" className="w-16 h-16 rounded-full border-2 border-blue-500"/>
                            ) : (
                                <UserCircle className="w-16 h-16 text-blue-500 border-2 border-blue-500 rounded-full"/>
                            )}
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">{user?.email || "Guest"}</h2>
                                <p className="text-gray-600">{user?.isSeller ? "Seller Account" : "Customer Account"}</p>
                            </div>
                        </div>
                        <button
                            onClick={handleSignOut}
                            className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors duration-200"
                        >
                            Sign Out
                        </button>
                    </div>
                </div>

                {/* Main Content */}
                {user?.isSeller && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Product Form */}
                        <div className="bg-white border border-gray-100 rounded-lg shadow-sm p-6">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Add New Product</h3>
                            <ProductForm onSuccess={fetchProducts} />
                        </div>

                        {/* Products List */}
                        <div className="bg-white border border-gray-100 rounded-lg shadow-sm p-6">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Your Products</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {products.length > 0 ? (
                                    products.map((product) => (
                                        <div key={product._id} className="bg-white border border-gray-100 rounded-lg shadow-sm overflow-hidden">
                                            <div className="relative h-40">
                                                <img
                                                    src={product.imageUrl}
                                                    alt={product.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="p-4">
                                                <h4 className="text-lg font-medium text-gray-900">{product.name}</h4>
                                                <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>
                                                <div className="mt-2 flex items-center justify-between">
                                                    <span className="text-lg font-semibold text-gray-900">${product.price}</span>
                                                    <span className="text-sm text-gray-500">{product.category}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-500 col-span-2">No products available.</p>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const ProductForm = ({ onSuccess }) => {
    const [image, setImage] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [previewUrl, setPreviewUrl] = useState(null);
    const [category, setCategory] = useState('sports');

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
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:5000/api/products', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                },
            });
            e.target.reset();
            setImage(null);
            setPreviewUrl(null);
            onSuccess();
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
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
                <div className="bg-red-50 border border-red-500 text-red-700 px-4 py-3 rounded-lg">
                    {error}
                </div>
            )}
            
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                <input
                    name="name"
                    required
                    className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter product name"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                    name="description"
                    required
                    className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter product description"
                    rows={4}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                <input
                    type="number"
                    name="price"
                    required
                    min="0"
                    step="0.01"
                    className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter price"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-3 bg-white border border-gray-300 rounded-lg"
                >
                    <option value="sports">Sports</option>
                    <option value="lifestyle">Lifestyle</option>
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Image</label>
                <input
                    type="file"
                    onChange={handleImageChange}
                    accept="image/*"
                    className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {previewUrl && (
                    <div className="mt-4">
                        <img src={previewUrl} alt="Preview" className="w-32 h-32 object-cover rounded-lg" />
                    </div>
                )}
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:bg-blue-800 disabled:cursor-not-allowed"
            >
                {isSubmitting ? 'Creating Product...' : 'Create Product'}
            </button>
        </form>
    );
};

export default ProfilePage;