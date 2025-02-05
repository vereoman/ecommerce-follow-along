import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import axios from 'axios';

const LandingPage = () => {
    const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [trendingShoes, setTrendingShoes] = useState([]);
    const [loading, setLoading] = useState(true);

    const heroSections = [
        {
            title: 'Elevate Your Game.',
            description:
                'Maximize athletic potential with advanced performance wear engineered for champions—merging breathable comfort, rugged durability, and sleek modern aesthetics to power through grueling workouts and competitive pursuits seamlessly.',
            buttonText: 'Get Started'
        },
        {
            title: 'Step Up Your Style.',
            description:
                'Elevate everyday wear with sneakers blending timeless style and ergonomic comfort—precision-engineered for modern lifestyles, offering versatile sophistication that transitions seamlessly from urban workdays to weekend adventures.',
            buttonText: 'Get Started'
        }
    ];

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/products');
                setTrendingShoes(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsAnimating(true);
            setTimeout(() => {
                setCurrentHeroIndex((prev) => (prev + 1) % heroSections.length);
                setTimeout(() => {
                    setIsAnimating(false);
                }, 50);
            }, 500);
        }, 5000); // Adjusted timing

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen flex flex-col">
            {/* Hero Section */}
            <section className="relative overflow-hidden h-[600px] bg-white">
                <div
                    className={`absolute w-full h-full transition-all duration-700 ease-in-out ${
                        isAnimating ? 'translate-x-[-100%] opacity-0' : 'translate-x-0 opacity-100'
                    }`}
                >
                    <div className="container mx-auto h-full flex items-center justify-center px-4">
                        <div className="max-w-3xl text-center">
                            <h1 className="text-6xl font-bold mb-6 text-gray-900">
                                {heroSections[currentHeroIndex].title}
                            </h1>
                            <p className="text-xl mb-8 text-gray-600">
                                {heroSections[currentHeroIndex].description}
                            </p>
                            <button className="px-8 py-5 bg-blue-600 text-white rounded-full text-lg hover:bg-blue-700 transition-all duration-200">
                                {heroSections[currentHeroIndex].buttonText}
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trending Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-8">Trending Now</h2>
                    {loading ? (
                        <div className="text-center py-8">Loading products...</div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {trendingShoes.map((shoe) => (
                                <ProductCard
                                    key={shoe._id}
                                    id={shoe._id}
                                    name={shoe.name}
                                    price={shoe.price}
                                    originalPrice={shoe.price * 1.2}
                                    image={shoe.imageUrl}
                                    description={shoe.description}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
