import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import productsData from "./categoryProducts.json";
import axios from "axios";

const categories = ["All", "Mobiles", "Laptops", "Headphones", "Accessories"];

const CategoryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    axios.get("https://e-commerce-backend-fg1k.onrender.com/categoryPage")
      .then(res => setFilteredProducts(res.data))
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredProducts(productsData);
    } else {
      const filtered = productsData.filter(
        (product) => product.category === selectedCategory
      );
      setFilteredProducts(filtered);
    }
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 p-4">
      {/* Mobile Filter Button - Only visible on small screens */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg flex items-center justify-between"
        >
          <span>Filter Categories</span>
          <svg
            className={`w-5 h-5 transition-transform ${showMobileFilters ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        {/* Sidebar - Hidden on mobile unless toggled */}
        <aside className={`${showMobileFilters ? "block" : "hidden"} lg:block lg:w-1/4 p-4 bg-white rounded-xl shadow-md`}>
          <h2 className="text-xl font-semibold mb-4">Categories</h2>
          <ul className="space-y-3">
            {categories.map((cat) => (
              <li
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setShowMobileFilters(false); // Close mobile filters after selection
                }}
                className={`cursor-pointer p-2 rounded-lg transition-all duration-300 ${
                  selectedCategory === cat
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-200"
                }`}
              >
                {cat}
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Content */}
        <main className="w-full lg:w-3/4 p-2 lg:p-6">
          <h2 className="text-xl md:text-2xl font-bold mb-6">
            {selectedCategory === "All" ? "All Products" : selectedCategory}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                data-aos="fade-up"
                className="bg-white rounded-xl shadow hover:shadow-lg transition-shadow duration-300 p-4"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 sm:h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-md sm:text-lg font-semibold mb-1">{product.name}</h3>
                <p className="text-xs sm:text-sm text-gray-600 mb-2">
                  {product.description.slice(0, 60)}...
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-blue-600 font-bold text-md sm:text-lg">
                    ${product.price}
                  </span>
                  {product.discount && (
                    <span className="text-xs sm:text-sm text-red-500">
                      {product.discount}% OFF
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default CategoryPage;