import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HouseSimple, ShoppingBag, SignIn, User } from '@phosphor-icons/react';

const Header = ({ isSignedIn }) => {
    const [isVisible, setIsVisible] = useState(true);
    const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);

    const handleScroll = () => {
        const currentScrollPos = window.pageYOffset;
        setIsVisible(currentScrollPos <= prevScrollPos);
        setPrevScrollPos(currentScrollPos);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [prevScrollPos]);

    const headerVariants = {
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
            },
        },
        hidden: {
            y: "-100%",
            opacity: 0,
            transition: {
                duration: 0.5,
            },
        },
    };

    const NavLink = ({ to, icon: Icon, text }) => (
        <div className="relative">
            <Link to={to} className="flex items-center gap-x-2 text-sm px-4 py-2 rounded-lg text-white">
                <Icon size={20} className="transition-colors duration-300 text-white" weight="fill" />
                {text}
            </Link>
        </div>
    );

    return (
        <motion.header
            variants={headerVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            className="w-full px-6 py-6 fixed top-0 left-0 bg-black z-50"
        >
            <div className="max-w-[1100px] w-full mx-auto flex justify-center">
                <nav className="flex items-center w-full justify-center gap-8">
                    <NavLink to="/" icon={HouseSimple} text="HOME" />
                    <NavLink to="/basket" icon={ShoppingBag} text="BASKET" />
                    {isSignedIn ? (
                        <NavLink to="/profile" icon={User} text="ACCOUNT" />
                    ) : (
                        <NavLink to="/login" icon={SignIn} text="LOGIN" />
                    )}
                </nav>
            </div>
        </motion.header>
    );
};

export default Header;