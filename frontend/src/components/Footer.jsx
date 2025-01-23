import React from 'react';
import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">

        <div>
          <h3 className="text-2xl font-bold mb-4">StyleHub</h3>
          <p className="text-gray-400">Discover your style, express yourself.</p>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-white">Home</a></li>
            <li><a href="#" className="hover:text-white">Shop</a></li>
            <li><a href="#" className="hover:text-white">Categories</a></li>
            <li><a href="#" className="hover:text-white">Sale</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Customer Service</h4>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-white">Contact Us</a></li>
            <li><a href="#" className="hover:text-white">Shipping</a></li>
            <li><a href="#" className="hover:text-white">Returns</a></li>
            <li><a href="#" className="hover:text-white">FAQ</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Socials</h4>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white">
              <Facebook size={22} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <Instagram size={22} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <Twitter size={22} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <Linkedin size={22} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-500">
        <p>&copy; 2025 VereoFashionista. All Rights Reserved.</p>
      </div>
    </footer>
  );
};