import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const TrendingSection = () => {
  const [trendingItems, setTrendingItems] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 1000 });
    fetch('http://localhost:5000/trendingProducts')
      .then(res => res.json())
      .then(data => setTrendingItems(data));
  }, []);

  return (
    <section className="py-20 bg-white dark:bg-gray-900 ">
      <div className="max-w-6xl mx-auto px-4">
        <h2
          className="text-4xl font-bold text-gray-100 mb-4 text-center"
          data-aos="fade-up"
        >
           Best Sellers / Trending Now
        </h2>
        <p
          className="text-center text-gray-500 mb-10"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          Trusted by thousands — check out what everyone’s loving!
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {trendingItems.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 hover:scale-[1.02]"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-contain p-5 hover:scale-105 transition-transform duration-500"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-500">{item.brand}</p>

                <div className="flex items-center justify-between mt-2">
                  <span className="text-xl font-bold text-indigo-600">
                    ${item.price}
                  </span>
                  <span className="text-sm text-gray-400 line-through">
                    ${item.originalPrice}
                  </span>
                </div>

                <div className="mt-2 text-yellow-500 text-sm">
                  {'★'.repeat(Math.round(item.rating)) +
                    '☆'.repeat(5 - Math.round(item.rating))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingSection;
