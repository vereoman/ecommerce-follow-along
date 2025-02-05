import React from 'react';
import { Link } from 'react-router-dom';
import { HouseSimple, MagnifyingGlass, SneakerMove, Sneaker, HeartStraight, SignIn, User, SignOut } from '@phosphor-icons/react';

const Header = ({ isSignedIn, onSignOut }) => {
    return (
        <header className="w-full px-6 pt-6">
            <div className="max-w-[1100px] w-full mx-auto relative">
                <div className="bg-black rounded-full py-2">
                    <div className="flex justify-between items-center min-h-[64px] px-6">
                        <nav className="flex items-center w-full justify-center gap-3">
                            <Link to="/" className="text-white flex items-center gap-x-2 px-6 py-5 rounded-full hover:bg-blue-600 transition-all duration-200 font-medium text-sm">
                                <HouseSimple size={20} color="#FFFFFF" />
                                HOME
                            </Link>

                            <Link to="/search" className="text-white flex items-center gap-x-2 px-6 py-5 rounded-full hover:bg-blue-600 transition-all duration-200 font-medium text-sm">
                                <MagnifyingGlass size={20} color="#FFFFFF" />
                                SEARCH
                            </Link>
                            <Link to="/lifestyle" className="text-white flex items-center gap-x-2 px-6 py-5 rounded-full hover:bg-blue-600 transition-all duration-200 font-medium text-sm">
                                <Sneaker size={20} color="#FFFFFF" />
                                LIFESTYLE
                            </Link>
                            <Link to="/sports" className="text-white flex items-center gap-x-2 px-6 py-5 rounded-full hover:bg-blue-600 transition-all duration-200 font-medium text-sm">
                                <SneakerMove size={20} color="#FFFFFF" />
                                SPORTS
                            </Link>
                            <Link to="/favorites" className="text-white flex items-center gap-x-2 px-6 py-5 rounded-full hover:bg-blue-600 transition-all duration-200 font-medium text-sm">
                                <HeartStraight size={20} color="#FFFFFF" />
                                FAVOURITES
                            </Link>
                            {isSignedIn ? (
                                <div className="flex items-center gap-2">
                                    <Link to="/profile" className="text-white flex items-center gap-x-2 px-6 py-5 rounded-full hover:bg-blue-600 transition-all duration-200 font-medium text-sm">
                                        <User size={20} color="#FFFFFF" />
                                        PROFILE
                                    </Link>
                                    <button
                                        onClick={onSignOut}
                                        className="text-white flex items-center gap-x-2 px-6 py-5 rounded-full hover:bg-blue-600 transition-all duration-200 font-medium text-sm"
                                    >
                                        <SignOut size={20} color="#FFFFFF" />
                                        LOGOUT
                                    </button>
                                </div>
                            ) : (
                                <Link to="/login" className="text-white flex items-center gap-x-2 px-6 py-5 rounded-full hover:bg-blue-600 transition-all duration-200 font-medium text-sm">
                                    <SignIn size={20} color="#FFFFFF" />
                                    LOGIN
                                </Link>
                            )}
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;