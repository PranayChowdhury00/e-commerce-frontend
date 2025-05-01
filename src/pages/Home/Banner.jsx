import React from 'react';

const Banner = () => {
  // Brand logos with fallbacks
  const brands = [
    { 
      name: "nike", 
      url: "https://logo.clearbit.com/nike.com",
      fallback: "/brands/nike.svg" 
    },
    { 
      name: "apple", 
      url: "https://logo.clearbit.com/apple.com",
      fallback: "/brands/apple.svg" 
    },
    { 
      name: "sony", 
      url: "https://logo.clearbit.com/sony.com",
      fallback: "/brands/sony.svg" 
    },
    { 
      name: "samsung", 
      url: "https://logo.clearbit.com/samsung.com",
      fallback: "/brands/samsung.svg" 
    },
    { 
      name: "adidas", 
      url: "https://logo.clearbit.com/adidas.com",
      fallback: "/brands/adidas.svg" 
    },
  ];

  return (
    <section className="relative w-full h-[600px] bg-gradient-to-br from-indigo-50 via-white to-rose-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 dark:opacity-20 dark:mix-blend-overlay"></div>
        <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 dark:opacity-20 dark:mix-blend-overlay"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center md:text-left space-y-6 z-10">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
              Elevate Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-pink-500">
                Lifestyle
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-lg">
              Discover curated collections of premium products designed to
              inspire and transform your everyday.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-lg font-semibold rounded-xl shadow-lg transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                Shop New Arrivals
              </button>
              <button className="px-8 py-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-800 dark:text-white text-lg font-semibold rounded-xl shadow transition-all">
                Explore Collections
              </button>
            </div>

            <div className="pt-4 flex items-center justify-center md:justify-start space-x-6">
              <div className="flex items-center">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((item) => (
                    <img
                      key={item}
                      src={`https://randomuser.me/api/portraits/women/${item}.jpg`}
                      alt="Happy customer"
                      className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-800"
                      loading="lazy"
                      width={40}
                      height={40}
                    />
                  ))}
                </div>
                <span className="ml-3 text-sm font-medium text-gray-600 dark:text-gray-300">
                  Join 10k+ happy customers
                </span>
              </div>
            </div>
          </div>

          {/* Featured Product Image */}
          <div className="relative z-10">
            <img src="https://thumbs.dreamstime.com/b/electronics-appliance-store-christmas-shopping-smiling-woman-showing-smartphone-thumbs-up-household-appliances-343917066.jpg" className=' rounded-2xl' alt="banner img" />
          </div>
        </div>
      </div>

      {/* Brand logos */}
      <div className="absolute bottom-10 left-0 right-0 z-10">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-4">
            Trusted by leading brands
          </p>
          <div className="flex overflow-x-auto space-x-12 py-2 px-4 hide-scrollbar">
            {brands.map((brand) => (
              <div key={brand.name} className="flex-shrink-0">
                <picture>
                  <source srcSet={brand.url} type="image/webp" />
                  <img
                    src={brand.fallback}
                    alt={`${brand.name} logo`}
                    className="h-8 w-auto opacity-70 hover:opacity-100 transition"
                    loading="lazy"
                    width={80}
                    height={32}
                    onError={(e) => {
                      e.currentTarget.src = brand.fallback;
                    }}
                  />
                </picture>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;