import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserCircle, Pencil, Trash2, X, Check } from "lucide-react";
import axios from "axios";
import ProductForm from "../components/ProductForm";
import SellerProductCard from '../components/SellerProductCard';

const EditForm = ({ product, onCancel, onSave, error }) => {
    const [editedProduct, setEditedProduct] = useState(product);
    const categories = {
        athletic: ['running', 'training', 'basketball', 'tennis', 'soccer', 'golf', 'hiking'],
        casual: ['sneakers', 'loafers', 'boots', 'sandals', 'slip-ons'],
        formal: ['dress-shoes', 'oxfords', 'derby', 'loafers', 'boots'],
        specialty: ['dance', 'skateboarding', 'wrestling', 'cycling', 'boxing']
    };

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
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                    type="text"
                    value={editedProduct.name}
                    onChange={(e) => setEditedProduct({...editedProduct, name: e.target.value})}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                    minLength="2"
                    maxLength="100"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                    value={editedProduct.description}
                    onChange={(e) => setEditedProduct({...editedProduct, description: e.target.value})}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows="3"
                    required
                    minLength="10"
                    maxLength="1000"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                    <input
                        type="number"
                        value={editedProduct.price}
                        onChange={(e) => setEditedProduct({...editedProduct, price: e.target.value})}
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        step="0.01"
                        min="0"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                        value={editedProduct.category}
                        onChange={(e) => setEditedProduct({...editedProduct, category: e.target.value})}
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                    >
                        {Object.entries(categories).map(([group, items]) => (
                            <optgroup key={group} label={group.charAt(0).toUpperCase() + group.slice(1)}>
                                {items.map(item => (
                                    <option key={item} value={item}>
                                        {item.charAt(0).toUpperCase() + item.slice(1)}
                                    </option>
                                ))}
                            </optgroup>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                    <select
                        value={editedProduct.gender}
                        onChange={(e) => setEditedProduct({...editedProduct, gender: e.target.value})}
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                    >
                        <option value="mens">Men's</option>
                        <option value="womens">Women's</option>
                        <option value="kids">Kids</option>
                        <option value="unisex">Unisex</option>
                    </select>
                </div>
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

const ProductCard = ({ product, onDelete, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState("");

    const handleEditSubmit = async (editedProduct) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(
                `http://localhost:5000/api/products/${product._id}`,
                editedProduct,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            onUpdate(response.data);
            setIsEditing(false);
            setError("");
        } catch (error) {
            setError(error.response?.data?.message || "Error updating product");
        }
    };

    const handleDelete = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5000/api/products/${product._id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            onDelete(product._id);
        } catch (error) {
            setError(error.response?.data?.message || "Error deleting product");
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
        <div className="bg-white border border-gray-100 rounded-lg shadow-sm overflow-hidden">
            <div className="relative h-48">
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 flex space-x-2">
                    <button
                        onClick={() => setIsEditing(true)}
                        className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-100 transition-colors duration-200"
                    >
                        <Pencil size={16} className="text-gray-600" />
                    </button>
                    <button
                        onClick={() => setIsDeleting(true)}
                        className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-100 transition-colors duration-200"
                    >
                        <Trash2 size={16} className="text-red-600" />
                    </button>
                </div>
            </div>
            <div className="p-4">
                <h4 className="text-lg font-medium text-gray-900">{product.name}</h4>
                <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>
                <div className="mt-2 flex items-center justify-between">
                    <span className="text-lg font-semibold text-gray-900">${product.price.toFixed(2)}</span>
                    <div className="flex flex-col items-end">
                        <span className="text-sm text-gray-500">{product.category}</span>
                        <span className="text-sm text-gray-500">{product.gender}</span>
                    </div>
                </div>
            </div>

            {isDeleting && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg max-w-sm mx-4">
                        <h3 className="text-lg font-bold mb-4">Delete Product</h3>
                        <p className="mb-6">Are you sure you want to delete this product? This action cannot be undone.</p>
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
        </div>
    );
};

const ProfilePage = ({ onSignOut }) => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')) || {});

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        if (user?.isSeller) {
            fetchProducts();
        }
    }, [user, navigate]);

    const fetchProducts = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No authentication token found');
            }

            const response = await axios.get('http://localhost:5000/api/products/seller', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            setProducts(response.data || []);
        } catch (error) {
            console.error('Error fetching products:', error);
            if (error.response?.status === 401) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                onSignOut();
                navigate('/login');
            }
            setProducts([]);
        }
    };

    const handleProductUpdate = (updatedProduct) => {
        setProducts(products.map(p => 
            p._id === updatedProduct._id ? updatedProduct : p
        ));
    };

    const handleProductDelete = (productId) => {
        setProducts(products.filter(p => p._id !== productId));
    };

    const handleProductCreate = async (newProduct) => {
        setProducts(prevProducts => [...prevProducts, newProduct]);
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className="bg-white border border-gray-100 rounded-lg shadow-sm p-6">
                        <div className="flex flex-col space-y-6">
                            <div className="flex items-center space-x-4">
                                {user?.imageUrl ? (
                                    <img src={user.imageUrl} alt="Profile" className="w-24 h-24 rounded-full border-2 border-blue-500"/>
                                ) : (
                                    <UserCircle className="w-24 h-24 text-blue-500 border-2 border-blue-500 rounded-full"/>
                                )}
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">{user?.email || "Guest"}</h2>
                                    <p className="text-lg text-gray-600">{user?.isSeller ? "Seller Account" : "Customer Account"}</p>
                                </div>
                            </div>
                            <button
                                onClick={handleSignOut}
                                className="w-full bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 transition-colors duration-200"
                            >
                                Sign Out
                            </button>
                        </div>
                    </div>

                    {user?.isSeller && (
                        <div className="bg-white border border-gray-100 rounded-lg shadow-sm p-6">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Add New Product</h3>
                            <ProductForm onSuccess={handleProductCreate} />
                        </div>
                    )}
                </div>

                {user?.isSeller && (
                    <div className="bg-white border border-gray-100 rounded-lg shadow-sm p-6">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">Your Products</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {products.length > 0 ? (
                                products.map((product) => (
                                    <SellerProductCard
                                        key={product._id}
                                        product={product}
                                        onDelete={handleProductDelete}
                                        onUpdate={handleProductUpdate}
                                    />
                                ))
                            ) : (
                                <p className="text-gray-500 col-span-full">No products available.</p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;