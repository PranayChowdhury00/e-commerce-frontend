import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import productsData from "./categoryProducts.json";
import axios from "axios";

const categories = ["All", "Mobiles", "Laptops", "Headphones", "Accessories"];

const CategoryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(()=>{
    axios.get("http://localhost:5000/categoryPage")
    .then(res=>setFilteredProducts(res.data))
    .catch(err=>console.log(err))
  },[])
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
    <div className="flex min-h-screen bg-white dark:bg-gray-900 p-4">
      {/* Sidebar */}
      <aside className="w-1/4 p-4 h-[600px] bg-white rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Categories</h2>
        <ul className="space-y-3">
          {categories.map((cat) => (
            <li
              key={cat}
              onClick={() => setSelectedCategory(cat)}
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
      <main className="w-3/4 p-6">
        <h2 className="text-2xl font-bold mb-6">
          {selectedCategory === "All" ? "All Products" : selectedCategory}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              data-aos="fade-up"
              className="bg-white rounded-xl shadow hover:shadow-lg transition-shadow duration-300 p-4"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
              <p className="text-sm text-gray-600 mb-2">
                {product.description.slice(0, 60)}...
              </p>
              <div className="flex justify-between items-center">
                <span className="text-blue-600 font-bold text-lg">
                  ${product.price}
                </span>
                {product.discount && (
                  <span className="text-sm text-red-500">
                    {product.discount}% OFF
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default CategoryPage;
