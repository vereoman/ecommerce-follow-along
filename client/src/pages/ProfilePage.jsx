import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, MapPin, PencilSimple, SignOut, Plus } from "@phosphor-icons/react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import ProductForm from "../components/ProductForm";
import SellerProductCard from '../components/SellerProductCard';
import EditUserForm from '../components/EditUserForm';
import AddressForm from '../components/AddressForm';

const ProfilePage = ({ onSignOut }) => {
    // Navigation and state management
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [showProductForm, setShowProductForm] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [productsLoading, setProductsLoading] = useState(false);
    const [productsError, setProductsError] = useState(null);

    // Function to fetch seller's products from the server
    const fetchProducts = async () => {
        setProductsLoading(true);
        setProductsError(null);

        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('No authentication token found');

            const response = await axios.get(
                'http://localhost:5000/api/products/seller',
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
            setProductsError('Failed to load products. Please try again later.');
        } finally {
            setProductsLoading(false);
        }
    };

    // Initialize user data and fetch products if user is a seller
    useEffect(() => {
        const initializeUser = async () => {
            const storedUser = localStorage.getItem('user');
            const token = localStorage.getItem('token');

            if (!token || !storedUser) {
                navigate('/login');
                return;
            }

            try {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);

                if (parsedUser?.isSeller) {
                    await fetchProducts();
                }
            } catch (error) {
                console.error('Error initializing user:', error);
                setError('Failed to initialize user data');
            } finally {
                setLoading(false);
            }
        };

        initializeUser();
    }, [navigate]);

    // Handle profile photo upload
    const handleProfilePhotoUpload = async (event) => {
        try {
            const file = event.target.files[0];
            if (!file) return;

            setUploading(true);
            const token = localStorage.getItem('token');
            if (!token) throw new Error('No authentication token found');

            const formData = new FormData();
            formData.append('image', file);

            const response = await axios.post(
                'http://localhost:5000/api/users/upload-photo',
                formData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            const updatedUser = { ...user, imageUrl: response.data.imageUrl };
            setUser(updatedUser);
            localStorage.setItem('user', JSON.stringify(updatedUser));

        } catch (error) {
            setError('Failed to upload profile photo');
        } finally {
            setUploading(false);
        }
    };

    // Handle product deletion
    const handleProductDelete = async (productId) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('No authentication token found');

            await axios.delete(
                `http://localhost:5000/api/products/${productId}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            setProducts(products.filter(p => p._id !== productId));
        } catch (error) {
            console.error('Error deleting product:', error);
            // You might want to show an error toast or message here
        }
    };

    // Handle product update
    const handleProductUpdate = async (updatedProduct) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('No authentication token found');

            const response = await axios.put(
                `http://localhost:5000/api/products/${updatedProduct._id}`,
                updatedProduct,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            setProducts(products.map(p =>
                p._id === response.data._id ? response.data : p
            ));
        } catch (error) {
            console.error('Error updating product:', error);
            // You might want to show an error toast or message here
        }
    };

    // Handle user sign out
    const handleSignOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        onSignOut();
        navigate('/');
    };

    // Show loading state while initializing
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-xl">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-8">
            <div className="max-w-4xl mx-auto px-4">
                {/* Profile Section */}
                <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                    <div className="flex flex-col items-center space-y-4">
                        {/* Profile Photo */}
                        <div className="relative">
                            {user?.imageUrl ? (
                                <img
                                    src={user.imageUrl}
                                    alt="Profile"
                                    className="w-32 h-32 rounded-full object-cover"
                                />
                            ) : (
                                <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center">
                                    <User className="w-16 h-16 text-gray-500" />
                                </div>
                            )}
                            <label className="absolute bottom-0 right-0 bg-gray-900 text-white rounded-full p-2 cursor-pointer">
                                <PencilSimple className="w-4 h-4" />
                                <input
                                    type="file"
                                    className="hidden"
                                    onChange={handleProfilePhotoUpload}
                                    accept="image/*"
                                    disabled={uploading}
                                />
                            </label>
                        </div>

                        {/* User Details */}
                        <div className="text-center space-y-2">
                            <h2 className="text-2xl font-bold text-gray-900">{user?.name}</h2>
                            <p className="text-gray-600">{user?.email}</p>
                        </div>

                        {/* Action Buttons */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-lg mt-6">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setShowAddressForm(true)}
                                className="flex flex-col items-center justify-center p-4 bg-gray-100 rounded-lg hover:bg-gray-200 hover:border transition-colors"
                            >
                                <MapPin className="w-6 h-6 mb-2" />
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setShowEditForm(true)}
                                className="flex flex-col items-center justify-center p-4 bg-gray-100 rounded-lg hover:bg-gray-200 hover:border transition-colors"
                            >
                                <PencilSimple className="w-6 h-6 mb-2" />
                            </motion.button>

                            {user?.isSeller && (
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setShowProductForm(true)}
                                    className="flex flex-col items-center justify-center p-4 bg-gray-100 rounded-lg hover:bg-gray-200 hover:border transition-colors"
                                >
                                    <Plus className="w-6 h-6 mb-2" />
                                </motion.button>
                            )}

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleSignOut}
                                className="flex flex-col items-center justify-center p-4 bg-gray-100 rounded-lg hover:bg-gray-200 hover:border transition-colors"
                            >
                                <SignOut className="w-6 h-6 mb-2" />
                            </motion.button>
                        </div>
                    </div>
                </div>

                {user?.isSeller && (
                    <div className="mt-8">
                        {productsLoading ? (
                            <div className="text-center py-8">
                                <div className="text-xl text-gray-600">Loading products...</div>
                            </div>
                        ) : productsError ? (
                            <div className="text-center py-8">
                                <div className="text-xl text-red-600">{productsError}</div>
                                <button
                                    onClick={fetchProducts}
                                    className="mt-4 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
                                >
                                    Retry
                                </button>
                            </div>
                        ) : products.length === 0 ? (
                            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                                <div className="text-xl text-gray-600 mb-4">
                                    You haven't added any products yet
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setShowProductForm(true)}
                                    className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 mx-auto"
                                >
                                    <Plus className="w-5 h-5" />
                                    <span>Add Your First Product</span>
                                </motion.button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {products.map((product) => (
                                    <SellerProductCard
                                        key={product._id}
                                        product={product}
                                        onDelete={handleProductDelete}
                                        onUpdate={handleProductUpdate}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                )}

                <AnimatePresence>
                    {showAddressForm && (
                        <motion.div
                            key="address-form"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <div className="fixed inset-0 flex items-center justify-center z-50">
                                <div
                                  className="absolute inset-0 bg-black opacity-50"
                                  onClick={() => setShowAddressForm(false)}
                                ></div>
                                <AddressForm
                                    onClose={() => setShowAddressForm(false)}
                                    userId={user?._id}
                                />
                            </div>
                        </motion.div>
                    )}

                    {showEditForm && (
                        <motion.div
                            key="edit-form"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <div className="fixed inset-0 flex items-center justify-center z-50">
                                <div
                                  className="absolute inset-0 bg-black opacity-50"
                                  onClick={() => setShowEditForm(false)}
                                ></div>
                                <EditUserForm
                                    user={user}
                                    onClose={() => setShowEditForm(false)}
                                    onUpdate={(updatedUser) => {
                                        setUser(updatedUser);
                                        localStorage.setItem('user', JSON.stringify(updatedUser));
                                    }}
                                />
                            </div>
                        </motion.div>
                    )}

                    {showProductForm && (
                        <motion.div
                            key="product-form"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <div className="fixed inset-0 flex items-center justify-center z-50">
                                <div
                                  className="absolute inset-0 bg-black opacity-50"
                                  onClick={() => setShowProductForm(false)}
                                ></div>
                                <ProductForm
                                    onClose={() => setShowProductForm(false)}
                                    onSuccess={(newProduct) => {
                                        setProducts([...products, newProduct]);
                                        setShowProductForm(false);
                                    }}
                                />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default ProfilePage;