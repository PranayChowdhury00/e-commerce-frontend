import React from 'react';
import { 
  FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, 
  FaEnvelope, FaPhone, FaHeadset, FaShieldAlt, 
  FaTruck, FaCreditCard, FaGift 
} from 'react-icons/fa';

const cards =[
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwJBEN0iu9N5s10EWzKkzIPkeeyyd3OrSxqA&s",
"https://www.investopedia.com/thmb/F8CKM3YkF1fmnRCU2g4knuK0eDY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/MClogo-c823e495c5cf455c89ddfb0e17fc7978.jpg",
"https://images.ctfassets.net/y6oq7udscnj8/7pGYJSsSu8IjvuscnxPcng/ae9dc800b649640406b5bfa1ae9b02d6/PayPal.png?w=592&h=368&q=50&fm=png",
"https://i.pcmag.com/imagery/reviews/02RJy7OTtPnQQjh37yQDNqx-15..v1598973550.png",
]

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-gray-300 pt-12 pb-6 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <span className="bg-indigo-600 p-2 rounded-lg mr-2">🛒</span>
              ShopEE
            </h2>
            <p className="text-gray-400 mb-4">
              Your one-stop destination for premium products and exceptional service.
            </p>
            
            {/* Trust Badges */}
            <div className="flex flex-wrap gap-4 mt-4">
              <div className="flex items-center gap-2 text-sm">
                <FaTruck className="text-indigo-400" />
                <span>Free Shipping</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <FaShieldAlt className="text-indigo-400" />
                <span>Secure Payment</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <FaHeadset className="text-indigo-400" />
                <span>24/7 Support</span>
              </div>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 border-b border-gray-700 pb-2">
              Shop
            </h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition hover:pl-1 block">New Arrivals</a></li>
              <li><a href="#" className="hover:text-white transition hover:pl-1 block">Best Sellers</a></li>
              <li><a href="#" className="hover:text-white transition hover:pl-1 block">Deals & Promotions</a></li>
              <li><a href="#" className="hover:text-white transition hover:pl-1 block">Gift Cards</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 border-b border-gray-700 pb-2">
              Support
            </h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition hover:pl-1 block">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition hover:pl-1 block">FAQs</a></li>
              <li><a href="#" className="hover:text-white transition hover:pl-1 block">Returns & Exchanges</a></li>
              <li><a href="#" className="hover:text-white transition hover:pl-1 block">Shipping Info</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 border-b border-gray-700 pb-2">
              Newsletter
            </h3>
            <p className="text-gray-400 mb-4 text-sm">
              Subscribe for 10% off your first order and exclusive deals
            </p>
            <form className="flex flex-col space-y-3">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="bg-gray-800 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
              <button 
                type="submit" 
                className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded transition flex items-center justify-center gap-2"
              >
                <FaGift /> Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Secondary Footer */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Contact Info */}
            <div className="flex flex-col sm:flex-row items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <FaPhone className="text-indigo-400" />
                <span>+880 1303572144</span>
              </div>
              <div className="flex items-center gap-2">
                <FaEnvelope className="text-indigo-400" />
                <span>pranaychowdhury00@gmail.com</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition bg-gray-800 p-2 rounded-full hover:bg-indigo-600">
                <FaFacebookF size={16} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition bg-gray-800 p-2 rounded-full hover:bg-blue-400">
                <FaTwitter size={16} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition bg-gray-800 p-2 rounded-full hover:bg-pink-600">
                <FaInstagram size={16} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition bg-gray-800 p-2 rounded-full hover:bg-blue-600">
                <FaLinkedinIn size={16} />
              </a>
            </div>

            {/* Payment Methods */}
            <div className="flex gap-2">
              {cards.map((method) => (
                <div key={method} className="bg-gray-800 p-2 rounded">
                  <img 
                    src={method} 
                    alt={method}
                    className="h-6 w-auto"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Copyright and Legal */}
          <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <div>
              © {new Date().getFullYear()} ShopEE. All rights reserved.
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="#" className="hover:text-white transition">Privacy Policy</a>
              <a href="#" className="hover:text-white transition">Terms of Service</a>
              <a href="#" className="hover:text-white transition">Cookie Policy</a>
              <a href="#" className="hover:text-white transition">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;