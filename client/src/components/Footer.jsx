import React from 'react';
import { Link } from 'react-router-dom';
import { Info, Phone, Shield, Question, ShareNetwork } from '@phosphor-icons/react';

const Footer = () => {
    return (
        <footer className="w-full px-6 pb-6">
            <div className="max-w-[1100px] w-full mx-auto relative">
                <div className="bg-black rounded-full py-2">
                    <div className="flex justify-between items-center min-h-[64px] px-6">
                        {/* Desktop Navigation */}
                        <nav className="flex items-center w-full justify-center gap-3">
                            <Link
                                to="/about"
                                className="text-white flex items-center gap-x-2 px-6 py-5 rounded-full hover:bg-blue-600 transition-all duration-200 font-medium text-sm"
                            >
                                <Info size={20} color="#ffffff" />
                                ABOUT
                            </Link>
                            <Link
                                to="/contact"
                                className="text-white flex items-center gap-x-2 px-6 py-5 rounded-full hover:bg-blue-600 transition-all duration-200 font-medium text-sm"
                            >
                                <Phone size={20} color="#ffffff" />
                                CONTACT
                            </Link>
                            <Link
                                to="/privacy"
                                className="text-white flex items-center gap-x-2 px-6 py-5 rounded-full hover:bg-blue-600 transition-all duration-200 font-medium text-sm"
                            >
                                <Shield size={20} color="#ffffff" />
                                PRIVACY
                            </Link>
                            <Link
                                to="/faq"
                                className="text-white flex items-center gap-x-2 px-6 py-5 rounded-full hover:bg-blue-600 transition-all duration-200 font-medium text-sm"
                            >
                                <Question size={20} color="#ffffff" />
                                QUESTIONS
                            </Link>
                            <Link
                                to="/socials"
                                className="text-white flex items-center gap-x-2 px-6 py-5 rounded-full hover:bg-blue-600 transition-all duration-200 font-medium text-sm"
                            >
                                <ShareNetwork size={20} color="#ffffff" />
                                SOCIALS
                            </Link>
                        </nav>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
