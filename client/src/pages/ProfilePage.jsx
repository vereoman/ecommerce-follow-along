import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, ShoppingBag, MapPin, PencilSimple, SignOut } from "@phosphor-icons/react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import ProductForm from "../components/ProductForm";
import SellerProductCard from '../components/SellerProductCard';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { type: "spring", stiffness: 100 }
    },
    exit: {
        y: -20,
        opacity: 0,
        transition: { duration: 0.2 }
    }
};

const ProfilePage = ({ onSignOut }) => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    const fetchProducts = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('No authentication token found');

            const response = await axios.get('http://localhost:5000/api/products/seller', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
            if (error.response?.status === 401) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                onSignOut();
                navigate('/login');
            } else {
                setError(error.response?.data?.message || 'Failed to fetch products');
            }
        }
    };

    const handleProductCreate = async (newProduct) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('No authentication token found');

            const formData = new FormData();
            for (const [key, value] of Object.entries(newProduct)) {
                formData.append(key, value);
            }

            const response = await axios.post(
                'http://localhost:5000/api/products',
                formData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            setProducts(prevProducts => [...prevProducts, response.data.product]);
            setError(null);
        } catch (error) {
            console.error('Error creating product:', error);
            if (error.response?.status === 401) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                onSignOut();
                navigate('/login');
            } else {
                setError(error.response?.data?.message || 'Failed to create product. Please try again.');
            }
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

    const handleSignOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        onSignOut();
        navigate('/');
    };

    const handleOrders = () => navigate('/orders');
    const handleAddress = () => navigate('/address');
    const handleEditProfile = () => navigate('/edit-profile');

    if (loading) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="min-h-screen flex items-center justify-center"
            >
                <div className="text-xl">Loading...</div>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen bg-gray-50 py-8 pt-24"
        >
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8"
                >
                    <motion.div
                        variants={itemVariants}
                        className="bg-white border border-gray-100 rounded-lg shadow-sm p-6"
                    >
                        <div className="flex flex-col items-center space-y-4">
                            <div className="relative">
                                {user?.imageUrl ? (
                                    <motion.img
                                        whileHover={{ scale: 1.05 }}
                                        src={user.imageUrl}
                                        alt="Profile"
                                        className="w-24 h-24 rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                                        <User className="w-12 h-12 text-gray-500" />
                                    </div>
                                )}
                                <button className="absolute bottom-0 right-0 bg-gray-900 text-white rounded-full p-1 w-6 h-6 flex items-center justify-center text-sm">
                                    +
                                </button>
                            </div>

                            <div className="text-center space-y-2">
                                <p className="text-lg text-gray-900">
                                    {user?.email || "email@example.com"}
                                </p>
                                <p className="text-gray-600">
                                    {user?.isSeller ? "Seller Account" : "Customer Account"}
                                </p>
                                <p className="text-gray-600 flex items-center justify-center">
                                    <MapPin className="w-4 h-4 mr-1" />
                                    {user?.location || "Location not set"}
                                </p>
                            </div>

                            <div className="flex justify-center space-x-12 py-4">
                                <div className="text-center">
                                    <div className="font-semibold">316</div>
                                    <div className="text-sm text-gray-500">Followers</div>
                                </div>
                                <div className="text-center">
                                    <div className="font-semibold">1.2k</div>
                                    <div className="text-sm text-gray-500">Following</div>
                                </div>
                            </div>

                            <div className="grid grid-cols-4 gap-4 w-full">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleOrders}
                                    className="flex items-center justify-center p-3 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 transition-colors"
                                >
                                    <ShoppingBag className="w-5 h-5" />
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleAddress}
                                    className="flex items-center justify-center p-3 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 transition-colors"
                                >
                                    <MapPin className="w-5 h-5" />
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleEditProfile}
                                    className="flex items-center justify-center p-3 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 transition-colors"
                                >
                                    <PencilSimple className="w-5 h-5" />
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleSignOut}
                                    className="flex items-center justify-center p-3 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 transition-colors"
                                >
                                    <SignOut className="w-5 h-5" />
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>

                    {user?.isSeller && (
                        <motion.div
                            variants={itemVariants}
                            className="bg-white border border-gray-100 rounded-lg shadow-sm p-6"
                        >
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Add New Product</h3>
                            <ProductForm onSuccess={handleProductCreate} />
                        </motion.div>
                    )}
                </motion.div>

                {user?.isSeller && (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="bg-white border border-gray-100 rounded-lg shadow-sm p-6"
                    >
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">Your Products</h3>
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mb-4 p-4 bg-red-50 text-red-600 rounded-lg"
                            >
                                {error}
                            </motion.div>
                        )}
                        <AnimatePresence>
                            <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {products.length > 0 ? (
                                    products.map((product) => (
                                        <motion.div
                                            key={product._id}
                                            variants={itemVariants}
                                            initial="hidden"
                                            animate="visible"
                                            exit="exit"
                                            layout
                                        >
                                            <SellerProductCard
                                                product={product}
                                                onDelete={handleProductDelete}
                                                onUpdate={handleProductUpdate}
                                            />
                                        </motion.div>
                                    ))
                                ) : (
                                    <motion.p
                                        variants={itemVariants}
                                        className="text-gray-500 col-span-full"
                                    >
                                        No products available.
                                    </motion.p>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
};

export default ProfilePage;