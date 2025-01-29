import React from 'react';
import { Facebook, Instagram, Youtube, Linkedin, Twitter } from 'lucide-react';

export default function Footer () {
  return (
    <footer className="relative text-white py-16">

      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('https://gradients.mijo-design.com/public/uploads/files/db16.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: '0.70'
        }}
      />
     
      <div className="container mx-auto px-6 relative z-10">

        <div className="mb-12">
          {/* <h2 className="text-3xl"></h2> */}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">

          <div>
            <h3 className="text-sm font-bold mb-4">SHOP</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:opacity-75">New Arrivals</a></li>
              <li><a href="#" className="hover:opacity-75">Best Sellers</a></li>
              <li><a href="#" className="hover:opacity-75">Sale</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold mb-4">CUSTOMER SERVICE</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:opacity-75">Contact Us</a></li>
              <li><a href="#" className="hover:opacity-75">Shipping & Returns</a></li>
              <li><a href="#" className="hover:opacity-75">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold mb-4">MY ACCOUNT</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:opacity-75">Order History</a></li>
              <li><a href="#" className="hover:opacity-75">Wishlist</a></li>
              <li><a href="#" className="hover:opacity-75">Track Order</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold mb-4">ABOUT</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:opacity-75">Our Story</a></li>
              <li><a href="#" className="hover:opacity-75">Blog</a></li>
              <li><a href="#" className="hover:opacity-75">Careers</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8">

          <div className="flex space-x-6 mb-4 md:mb-0">
            <a href="#" className="text-sm hover:opacity-75">PRIVACY POLICY</a>
            <a href="#" className="text-sm hover:opacity-75">TERMS OF USE</a>
            <a href="#" className="text-sm hover:opacity-75">NEWSLETTER</a>
          </div>

          <div className="flex space-x-6">
            <a href="#" className="hover:opacity-75"><Facebook size={20} /></a>
            <a href="#" className="hover:opacity-75"><Youtube size={20} /></a>
            <a href="#" className="hover:opacity-75"><Linkedin size={20} /></a>
            <a href="#" className="hover:opacity-75"><Instagram size={20} /></a>
            <a href="#" className="hover:opacity-75"><Twitter size={20} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};