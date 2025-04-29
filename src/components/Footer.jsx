import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaEnvelope, FaPhone } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-gray-300 py-12 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">🛒 ShopEE</h2>
          <p className="text-sm text-gray-400">
            Your one-stop shop for the best tech gadgets and daily deals. Fast shipping and top quality.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white transition">Home</a></li>
            <li><a href="#" className="hover:text-white transition">Shop</a></li>
            <li><a href="#" className="hover:text-white transition">About Us</a></li>
            <li><a href="#" className="hover:text-white transition">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <FaPhone className="text-indigo-400" /> +880 1303572144
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope className="text-indigo-400" /> pranaychowdhury00@gmail.com
            </li>
            <li>Dhaka, Bangladesh</li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
          <div className="flex gap-4">
            <a href="#" className="text-gray-400 hover:text-white transition">
              <FaFacebookF size={18} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">
              <FaTwitter size={18} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">
              <FaInstagram size={18} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">
              <FaLinkedinIn size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="text-center mt-10 text-sm text-gray-500 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} ShopEE. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
