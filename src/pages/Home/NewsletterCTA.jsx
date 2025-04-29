import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const NewsletterCTA = () => {
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  return (
    <section className="bg-gradient-to-r from-purple-600 to-indigo-600 py-12 px-4 md:px-10 text-white">
      <div
        className="max-w-4xl mx-auto text-center"
        data-aos="fade-up"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">🎉 Get 10% Off Your First Purchase!</h2>
        <p className="text-lg mb-6">Subscribe to our newsletter and stay updated with our latest offers, products, and more.</p>

        <form className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-xl mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full sm:w-2/3 px-4 py-2 rounded-lg text-gray-800 border-2 border-gray-100"
            required
          />
          <button
            type="submit"
            className="px-6 py-2 bg-white text-purple-700 font-semibold rounded-lg hover:bg-gray-200 transition"
          >
            Subscribe
          </button>
        </form>

        <p className="text-sm mt-4 text-gray-200">We respect your privacy. Unsubscribe at any time.</p>
      </div>
    </section>
  );
};

export default NewsletterCTA;
