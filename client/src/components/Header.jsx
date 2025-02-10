import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HouseSimple, MagnifyingGlass, HeartStraight, ShoppingBag, SignIn, User, X } from '@phosphor-icons/react';
import SearchResults from './SearchResults';

const Header = function ({ isSignedIn, onSearch, searchResults, isLoading }) {
  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    setIsVisible(currentScrollPos <= prevScrollPos);
    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  useEffect(() => {
    if (searchQuery) {
      const debounceTimer = setTimeout(() => {
        onSearch(searchQuery);
      }, 300);
      return () => clearTimeout(debounceTimer);
    }
  }, [searchQuery, onSearch]);

  const headerVariants = {
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 25,
        mass: 1.2,
        duration: 0.6
      }
    },
    hidden: {
      y: "-100%",
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 25,
        mass: 1.2,
        duration: 0.6
      }
    }
  };

  const linkVariants = {
    rest: {
      scale: 1,
      backgroundColor: "rgba(0, 0, 0, 0)",
      color: "white",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 17
      }
    },
    hover: {
      scale: 1.08,
      backgroundColor: "rgba(255, 255, 255, 1)",
      color: "black",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 17,
        duration: 0.4
      }
    }
  };

  const NavLink = ({ to, icon: Icon, text }) => (
    <motion.div
      initial="rest"
      whileHover="hover"
      animate="rest"
      className="relative"
    >
      <motion.div
        variants={linkVariants}
        className="flex items-center gap-x-2 text-sm px-4 py-2 rounded-lg"
      >
        <Link to={to} className="flex items-center gap-x-2">
          <Icon
            size={20}
            className="transition-colors duration-300"
            weight="fill"
          />
          {text}
        </Link>
      </motion.div>
    </motion.div>
  );

  const handleSearchClick = (e) => {
    e.preventDefault();
    setIsSearchOpen(true);
  };

  const searchOverlayVariants = {
    hidden: {
      opacity: 0,
      y: -20,
      scale: 0.95,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        duration: 0.4
      }
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        duration: 0.4
      }
    }
  };

  return (
    <>
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={searchOverlayVariants}
            className="fixed inset-0 z-50 backdrop-blur-md bg-black/30 flex items-start justify-center pt-32"
            onClick={(e) => {
              if (e.target === e.currentTarget) setIsSearchOpen(false);
            }}
          >
            <div className="w-full max-w-3xl px-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for shoes..."
                  className="w-full px-6 py-4 text-xl bg-white/90 backdrop-blur-sm rounded-xl shadow-lg outline-none"
                  autoFocus
                />
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  onClick={() => setIsSearchOpen(false)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  <X size={24} weight="fill" />
                </motion.button>
              </div>

              {searchQuery && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="mt-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-4 max-h-[60vh] overflow-y-auto"
                >
                  {isLoading ? (
                    <div className="text-center py-8">
                      <p className="text-gray-500">Searching...</p>
                    </div>
                  ) : (
                    <SearchResults results={searchResults} setIsSearchOpen={setIsSearchOpen} />
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.header
        variants={headerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        className="w-full px-6 py-6 fixed top-0 left-0 bg-black z-50"
      >
        <motion.div
          className="max-w-[1100px] w-full mx-auto flex justify-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 25,
            delay: 0.2,
            duration: 0.5
          }}
        >
          <nav className="flex items-center w-full justify-center gap-8">
            <NavLink to="/" icon={HouseSimple} text="HOME" />
            <div onClick={handleSearchClick}>
              <NavLink to="#" icon={MagnifyingGlass} text="SEARCH" />
            </div>
            <NavLink to="/favorites" icon={HeartStraight} text="FAVOURITES" />
            <NavLink to="/basket" icon={ShoppingBag} text="BASKET" />
            {isSignedIn ? (
              <NavLink to="/profile" icon={User} text="ACCOUNT" />
            ) : (
              <NavLink to="/login" icon={SignIn} text="LOGIN" />
            )}
          </nav>
        </motion.div>
      </motion.header>
    </>
  );
};

export default Header;