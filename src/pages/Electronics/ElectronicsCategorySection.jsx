import React from "react";
import { Link } from "react-router-dom";

const categories = [
    {
      name: "Air Conditioners",
      image:
        "https://www.startech.com.bd/image/cache/catalog/air-conditioner/elite/2-ton/elite-2-ton-official-228x228.webp",
      route: "/ac",
    },
    {
      name: "Refrigerators",
      image:
        "https://cdn.thewirecutter.com/wp-content/media/2024/09/BEST-REFRIGERATOR-2048px-3x2-1.jpg?auto=webp&quality=75&crop=4:3,smart&width=1024",
      route: "/fridge",
    },
    {
      name: "Washing Machines",
      image:
        "https://mke.com.bd/media/catalog/product/4/y/4yvi9lfwhoqv4ufbkx8rop2bcbznqdvumcnze3a4_1_.jpg?store=default&image-type=image",
      route: "/washing",
    },
    {
      name: "Microwaves",
      image: "https://www.elprocus.com/wp-content/uploads/Microwaves.jpg",
      route: "/microwave",
    },
  ];
  

const ElectronicsCategorySection = () => {
  return (
    <section className="bg-gray-100 py-16 px-6">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
        Explore Home Electronics
      </h2>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 max-w-6xl mx-auto">
      {categories.map((item) => (
  
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 p-5">
      <div className="overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-48 object-contain transform hover:scale-105 transition duration-500"
        />
      </div>
      <div className="p-4 text-center">
        <h3 className="text-lg font-semibold text-gray-700 hover:text-blue-600 transition">
          {item.name}
        </h3>
      </div>
    </div>
))}

      </div>
    </section>
  );
};

export default ElectronicsCategorySection;
