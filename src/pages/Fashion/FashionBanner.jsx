import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  {
    id: 'men',
    title: "Men's Fashion",
    subtitle: "Trendy outfits for the modern man",
    image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=600&q=80",
    buttonText: "Shop Men"
  },
  {
    id: 'women',
    title: "Women's Collection",
    subtitle: "Elegant styles for every occasion",
    image: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?auto=format&fit=crop&w=600&q=80",
    buttonText: "Shop Women"
  },
  {
    id: 'kids',
    title: "Kids' Corner",
    subtitle: "Adorable outfits for little ones",
    image: "https://littlemuffet.com/cdn/shop/files/LM_Aug_2335829_84fb25b2-3986-4351-a3b9-251a9108f077_1200x1200_crop_center.jpg?v=1715598188",
    buttonText: "Shop Kids"
  }
];

const FashionBanner = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="w-full bg-base-300 py-12 px-4 md:px-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
          FASHION COLLECTION {currentYear}
        </h1>
        <p className="text-lg md:text-xl text-gray-600">
          Discover Your Perfect Style
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {categories.map(category => (
          <div
            key={category.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 text-center p-6"
          >
            <img
              src={category.image}
              alt={category.title}
              className="w-full h-60 object-cover rounded-xl mb-4"
            />
            <h2 className="text-2xl font-semibold text-gray-800 mb-1">{category.title}</h2>
            <p className="text-gray-500 mb-4">{category.subtitle}</p>
            <Link
              to={`/shop/${category.id}`}
              className="inline-block px-6 py-2 text-white bg-gray-900 rounded-full hover:bg-gray-700 transition"
            >
              {category.buttonText}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FashionBanner;
