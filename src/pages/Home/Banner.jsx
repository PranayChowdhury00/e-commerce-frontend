import React from 'react';

const Banner = () => {
  return (
    <>
      {/* Banner Section */}
      <div className="w-full h-[500px] bg-gradient-to-r from-blue-100 via-white to-pink-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-16 flex flex-col-reverse md:flex-row items-center justify-between gap-10">
          {/* Text Section */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
              Welcome to <span className="text-blue-600">Our Store</span>
            </h1>
            <p className="text-gray-700 dark:text-gray-300 mt-4 text-lg max-w-md">
              Discover the best products at unbeatable prices. Shop now for exclusive deals and latest collections!
            </p>
            <button className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-lg rounded-xl shadow-lg transition">
              Shop Now
            </button>
          </div>

          {/* Image Section */}
          <div className="flex-1">
            <img
              src="/electro-home-v6-banner-1.webp"
              alt="Banner"
              className="w-full h-auto rounded-xl shadow-xl"
            />
          </div>
        </div>
      </div>

      
    </>
  );
};

export default Banner;
