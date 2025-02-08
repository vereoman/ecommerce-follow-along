import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import CategoryCard from '../components/CategoryCard'; // Import CategoryCard
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate if you want to use react-router navigation

const LandingPage = () => {
    const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [trendingShoes, setTrendingShoes] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); // Hook for navigation

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
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/api/products', {
                    headers: { Authorization: `Bearer ${token}` }
                });
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
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    // Category Data for Category Cards
    const categoryData = [
        {
            title: "Men's Shoes",
            description: "Elevate your game with Nike's innovative designs, performance-driven comfort, and iconic style for men.",
            imageUrl: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/094579db-49d1-4b9a-a650-6232340c3072/AIR+JORDAN+1+MID+SE.png", // Example image URL for Men's Shoes - Replace with your own
            buttonText: "Shop Men",
            shopNowLink: "/products?category=men" // Example link, adjust as needed
        },
        {
            title: "Women's Shoes",
            description: "Empowering strides with Nike's versatile footwear, blending fashion-forward aesthetics and ultimate support for women.",
            imageUrl: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/b0aecb4c-3e97-4080-a944-dcbd89af7ee7/WMNS+AIR+JORDAN+1+RETRO+HI+OG.png", // Example image URL for Women's Shoes - Replace with your own
            buttonText: "Shop Women",
            shopNowLink: "/products?category=women" // Example link, adjust as needed
        },
        {
            title: "Kids' Shoes",
            description: "Fuel their dreams with Nike's playful designs, durable construction, and comfortable fit for growing feet.",
            imageUrl: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/439e49c1-f774-48c8-bece-93458b13afa8/AIR+JORDAN+1+MID+%28GS%29.png", // Example image URL for Kids' Shoes - Replace with your own
            buttonText: "Shop Kids",
            shopNowLink: "/products?category=kids" // Example link, adjust as needed
        },
        {
            title: "Unisex Shoes",
            description: "Breaking boundaries with Nike's inclusive footwear, offering versatile style and performance for everyone.",
            imageUrl: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/4caf3277-8878-4559-aa37-eef8c708a39b/AIR+JORDAN+1+RETRO+HIGH+OG.png", // Example image URL for Unisex Shoes - Replace with your own
            buttonText: "Shop Unisex",
            shopNowLink: "/products?category=unisex" // Example link, adjust as needed
        }
    ];

    const handleShopNow = (link) => {
        // Using react-router-dom's useNavigate to navigate to the link
        navigate(link);
        // If you are not using react-router-dom, you can use:
        // window.location.href = link;
    };

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

            {/* Category Section - **MOVED TO BE FIRST AFTER HERO** */}
            <section className="py-16"> {/* Optional: Different background for category section */}
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"> {/* Updated to grid-cols-4 */}
                        {categoryData.map((category, index) => (
                            <CategoryCard
                                key={index}
                                imageUrl={category.imageUrl}
                                title={category.title}
                                description={category.description}
                                buttonText={category.buttonText}
                                onShopNow={() => handleShopNow(category.shopNowLink)} // Pass shopNowLink
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Trending Section (Featured Shoes) - **NOW COMES AFTER CATEGORY** */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    {loading ? (
                        <div className="text-center py-8">Loading products...</div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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