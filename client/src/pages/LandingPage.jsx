import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import CategoryCard from '../components/CategoryCard';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from '@phosphor-icons/react';

const LandingPage = () => {
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [trendingShoes, setTrendingShoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleProducts, setVisibleProducts] = useState(6);
  const navigate = useNavigate();

  const heroSections = [
    {
      title: 'Elevate Your Game.',
      description:
        'Maximize athletic potential with advanced performance wear engineered for champions—merging breathable comfort, rugged durability, and sleek modern aesthetics to power through grueling workouts and competitive pursuits seamlessly.',
      buttonText: 'Get Started',
    },
    {
      title: 'Step Up Your Style.',
      description:
        'Elevate everyday wear with sneakers blending timeless style and ergonomic comfort—precision-engineered for modern lifestyles, offering versatile sophistication that transitions seamlessly from urban workdays to weekend adventures.',
      buttonText: 'Get Started',
    },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setTrendingShoes(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to load products');
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
    }, 50000);

    return () => clearInterval(interval);
  }, []);

  const categoryData = [
    {
      title: "Men's Shoes",
      description:
        "Dominate your game: Nike's innovation, comfort, and iconic style.",
      imageUrl:
        'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/094579db-49d1-4b9a-a650-6232340c3072/AIR+JORDAN+1+MID+SE.png',
      buttonText: 'Get Started',
      shopNowLink: '/products?category=men',
    },
    {
      title: "Women's Shoes",
      description:
        "Step into power: Nike's stylish, supportive footwear for women.",
      imageUrl:
        'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/b0aecb4c-3e97-4080-a944-dcbd89af7ee7/WMNS+AIR+JORDAN+1+RETRO+HI+OG.png',
      buttonText: 'Get Started',
      shopNowLink: '/products?category=women',
    },
    {
      title: "Kids' Shoes",
      description:
        "Equip kids for success: Nike's durable shoes for every adventure.",
      imageUrl:
        'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/439e49c1-f774-48c8-bece-93458b13afa8/AIR+JORDAN+1+MID+%28GS%29.png',
      buttonText: 'Get Started',
      shopNowLink: '/products?category=kids',
    },
  ];

  const subscriptionPlans = [
    {
      title: 'Starter',
      description: 'Basic plan for beginners. Access to limited features.',
      imageUrl: 'https://via.placeholder.com/250',
      buttonText: 'Get Starter',
      shopNowLink: '/subscribe?plan=starter',
    },
    {
      title: 'Plus',
      description: 'Intermediate plan with more features and benefits.',
      imageUrl: 'https://via.placeholder.com/250',
      buttonText: 'Get Plus',
      shopNowLink: '/subscribe?plan=plus',
    },
    {
      title: 'Premium',
      description: 'Advanced plan with all features and premium support.',
      imageUrl: 'https://via.placeholder.com/250',
      buttonText: 'Get Premium',
      shopNowLink: '/subscribe?plan=premium',
    },
  ];

  const handleShopNow = (link) => {
    navigate(link);
  };

  const handleLoadMore = () => {
    setVisibleProducts((prev) => prev + 6);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden h-[600px] bg-white">
        <div
          className={`absolute w-full h-full transition-all duration-700 ease-in-out ${
            isAnimating
              ? 'translate-x-[-100%] opacity-0'
              : 'translate-x-0 opacity-100'
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
              <div className="flex justify-center">
                <button className="px-8 py-5 bg-black text-white rounded-lg text-lg hover:bg-grey-800 transition-all duration-200 flex items-center gap-2">
                  {heroSections[currentHeroIndex].buttonText}
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center max-w-5xl mx-auto">
            Shop By Category
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 max-w-5xl mx-auto gap-4">
            {categoryData.map((category, index) => (
              <CategoryCard
                key={index}
                imageUrl={category.imageUrl}
                title={category.title}
                description={category.description}
                buttonText={category.buttonText}
                onShopNow={() => handleShopNow(category.shopNowLink)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Trending Section (Featured Shoes) */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center max-w-5xl mx-auto">
            Featured Products
          </h2>
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-600 py-8">{error}</div>
          ) : trendingShoes.length === 0 ? (
            <div className="text-center text-gray-600 py-8">
              No products available.
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 max-w-5xl mx-auto gap-y-8 gap-x-4">
                {trendingShoes.slice(0, visibleProducts).map((shoe) => (
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
              {visibleProducts < trendingShoes.length && (
                <div className="text-center py-8">
                  <button
                    className="w-[970px] max-w-5xl mx-auto px-8 py-5 border text-gray-900 rounded-lg text-lg hover:border-black transition-all duration-200"
                    onClick={handleLoadMore}
                  >
                    Load More

                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Subscription Plans Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center max-w-5xl mx-auto">
            Membership Plans
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 max-w-5xl mx-auto gap-4">
            {subscriptionPlans.map((plan, index) => (
              <CategoryCard
                key={index}
                imageUrl={plan.imageUrl}
                title={plan.title}
                description={plan.description}
                buttonText={plan.buttonText}
                onShopNow={() => handleShopNow(plan.shopNowLink)}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
