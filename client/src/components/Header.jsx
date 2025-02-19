// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { HouseSimple, ShoppingBag, SignIn, User, Receipt } from '@phosphor-icons/react';
import { motion } from 'framer-motion';

const Header = ({ isSignedIn }) => {
    const NavLink = ({ to, icon: Icon, text }) => {
        const linkVariants = {
            initial: { 
                backgroundColor: 'rgba(255, 255, 255, 0)',
                color: 'white',
                scale: 1
            },
            hover: { 
                backgroundColor: 'rgba(255, 255, 255, 1)',
                color: 'black',
                scale: 1.05,
                transition: { 
                    duration: 0.3,
                    ease: [0.4, 0, 0.2, 1],
                    scale: {
                        type: "spring",
                        stiffness: 400,
                        damping: 25
                    }
                }
            }
        };

        return (
            <motion.div
                initial="initial"
                whileHover="hover"
                variants={linkVariants}
                className="rounded-lg"
            >
                <Link
                    to={to}
                    className="flex items-center gap-2 text-sm px-4 py-2 no-underline focus:outline-none"
                >
                    <Icon size={20} weight="fill" />
                    {text}
                </Link>
            </motion.div>
        );
    };

    const headerVariants = {
        initial: { y: -100 },
        animate: { 
            y: 0,
            transition: { 
                type: "spring",
                stiffness: 100,
                damping: 20
            }
        }
    };

    return (
        <motion.header
            initial="initial"
            animate="animate"
            variants={headerVariants}
            className="fixed top-0 left-0 w-full bg-black z-50 py-8"
            style={{ willChange: 'transform' }}
        >
            <div className="max-w-[1100px] h-full mx-auto flex items-center justify-center">
                <nav className="flex items-center gap-8 w-full justify-center">
                    <NavLink to="/" icon={HouseSimple} text="HOME" />
                    <NavLink to="/basket" icon={ShoppingBag} text="BASKET" />
                    {isSignedIn && (
                        <NavLink to="/orders" icon={Receipt} text="ORDERS" />
                    )}
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
