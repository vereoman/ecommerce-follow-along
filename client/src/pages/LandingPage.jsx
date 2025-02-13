import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from '@phosphor-icons/react';

const LandingPage = () => {
    const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
    const [trendingShoes, setTrendingShoes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const featuredProductsRef = useRef(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/products`
                );
                setTrendingShoes(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
                setError("Failed to load products");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentHeroIndex(
                (prev) => (prev + 1) % heroSections.length
            );
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    const handleShopNow = () => {
        if (featuredProductsRef.current) {
            featuredProductsRef.current.scrollIntoView({
                behavior: "smooth",
            });
        }
    };

    const heroSections = [
        {
            title: "Elevate Your Game.",
            description:
                "Maximize athletic potential with advanced performance wear engineered for champions—merging breathable comfort, rugged durability, and sleek modern aesthetics to power through grueling workouts and competitive pursuits seamlessly.",
            buttonText: "Get Started",
        },
        {
            title: "Step Up Your Style.",
            description:
                "Elevate everyday wear with sneakers blending timeless style and ergonomic comfort—precision-engineered for modern lifestyles, offering versatile sophistication that transitions seamlessly from urban workdays to weekend adventures.",
            buttonText: "Get Started",
        },
    ];

    return (
        <div className="min-h-screen flex flex-col">
            <section className="relative overflow-hidden h-screen bg-gradient-to-b from-gray-100 to-white flex items-center justify-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentHeroIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="absolute w-full h-full flex flex-col items-center justify-center px-4 md:px-8 lg:px-16"
                    >
                        <div className="container mx-auto text-center">
                            <div className="max-w-2xl mx-auto flex flex-col items-center">
                                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                                    {heroSections[currentHeroIndex].title}
                                </h1>
                                <p className="text-xl text-gray-600 mb-8">
                                    {heroSections[currentHeroIndex].description}
                                </p>
                                <button
                                    className="inline-flex bg-gray-900 text-white px-8 py-4 rounded-lg text-lg font-medium items-center justify-center gap-2 hover:bg-gray-800 transition-colors mx-auto"
                                    onClick={handleShopNow}
                                >
                                    {heroSections[currentHeroIndex].buttonText}
                                    <ArrowRight size={24} weight="bold" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </section>

            <section ref={featuredProductsRef} className="py-8 text-center">
                <div className="container mx-auto px-4">
                    <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                        Featured Products
                    </h2>
                    <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                        Discover our top picks designed to elevate your
                        performance and style. Our collection features
                        innovative designs that combine cutting-edge technology
                        with timeless aesthetics.
                    </p>
                </div>
            </section>

            <section className="py-12">
                <div className="container mx-auto px-4">
                    {loading ? (
                        <div className="text-center py-8">
                            <div className="rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto animate-spin"></div>
                        </div>
                    ) : error ? (
                        <div className="text-center text-red-600 py-8">
                            {error}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                            {trendingShoes.map((shoe) => (
                                <div key={shoe._id}>
                                    <ProductCard
                                        id={shoe._id}
                                        name={shoe.name}
                                        price={shoe.price}
                                        originalPrice={shoe.price * 2}
                                        image={shoe.imageUrl}
                                        description={shoe.description}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default LandingPage;