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
  const [visibleProducts, setVisibleProducts] = useState(12);
  const navigate = useNavigate();

  // Create a ref for the Featured Products section
  const featuredProductsRef = useRef(null);

  const handleLoadMore = () => {
    setVisibleProducts(prevCount => Math.min(prevCount + 12, trendingShoes.length));
  };

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
      setCurrentHeroIndex((prev) => (prev + 1) % heroSections.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleShopNow = () => {
    if (featuredProductsRef.current) {
      featuredProductsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const heroVariants = {
    enter: {
      x: 1000,
      opacity: 0
    },
    center: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    },
    exit: {
      x: -1000,
      opacity: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const productVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const heroSections = [
    {
      title: 'Elevate Your Game.',
      description: 'Maximize athletic potential with advanced performance wear engineered for champions—merging breathable comfort, rugged durability, and sleek modern aesthetics to power through grueling workouts and competitive pursuits seamlessly.',
      buttonText: 'Get Started',
    },
    {
      title: 'Step Up Your Style.',
      description: 'Elevate everyday wear with sneakers blending timeless style and ergonomic comfort—precision-engineered for modern lifestyles, offering versatile sophistication that transitions seamlessly from urban workdays to weekend adventures.',
      buttonText: 'Get Started',
    },
  ];

  return (
    <motion.div
      className="min-h-screen flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <section className="relative overflow-hidden h-screen bg-gradient-to-b from-gray-100 to-white flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentHeroIndex}
            variants={heroVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute w-full h-full flex flex-col items-center justify-center px-4 md:px-8 lg:px-16"
          >
            <div className="container mx-auto text-center">
              <div className="max-w-2xl mx-auto flex flex-col items-center">
                <motion.h1
                  className="text-5xl md:text-6xl font-bold text-gray-900 mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  {heroSections[currentHeroIndex].title}
                </motion.h1>
                <motion.p
                  className="text-xl text-gray-600 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  {heroSections[currentHeroIndex].description}
                </motion.p>
                <motion.button
                  className="inline-flex bg-gray-900 text-white px-8 py-4 rounded-lg text-lg font-medium items-center justify-center gap-2 hover:bg-gray-800 transition-colors mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  onClick={handleShopNow}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {heroSections[currentHeroIndex].buttonText}
                  <ArrowRight size={24} weight="bold" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Featured Products Heading */}
      <motion.section
        ref={featuredProductsRef}
        className="py-16 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-5xl md:text-6xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Featured Products
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Discover our top picks designed to elevate your performance and style.
            Our collection features innovative designs that combine cutting-edge
            technology with timeless aesthetics.
          </motion.p>
        </div>
      </motion.section>

      {/* Featured Products Section with Load More */}
      <motion.section
        className="py-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="container mx-auto px-4">
          {loading ? (
            <motion.div
              className="text-center py-8"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1 }}
            >
              <div className="rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            </motion.div>
          ) : error ? (
            <div className="text-center text-red-600 py-8">{error}</div>
          ) : (
            <>
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.1
                    }
                  }
                }}
              >
                {trendingShoes.slice(0, visibleProducts).map((shoe) => (
                  <motion.div
                    key={shoe._id}
                    variants={productVariants}
                  >
                    <ProductCard
                      id={shoe._id}
                      name={shoe.name}
                      price={shoe.price}
                      originalPrice={shoe.price * 2}
                      image={shoe.imageUrl}
                      description={shoe.description}
                    />
                  </motion.div>
                ))}
              </motion.div>
              {visibleProducts < trendingShoes.length && (
                <motion.div
                  className="text-center mt-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <motion.button
                    className="bg-white px-8 py-4 border border-gray-300 rounded-lg text-gray-900 font-medium hover:border-gray-900 transition-colors duration-200"
                    onClick={handleLoadMore}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Load More
                  </motion.button>
                </motion.div>
              )}
            </>
          )}
        </div>
      </motion.section>
    </motion.div>
  );
};

export default LandingPage;
