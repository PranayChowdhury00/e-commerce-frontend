import axios from "axios";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const AcSection = () => {
  const [acItems, setAcItems] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/ElectronicsItemAc")
      .then((response) => {
        setAcItems(response.data);
      })
      .catch((error) => {
        console.error("Error fetching AC items:", error);
      });

    AOS.init({ duration: 1000 });
  }, []);

  if (!acItems.length) {
    return <span className="loading loading-spinner loading-lg mx-auto block mt-10"></span>;
  }

  return (
    <div className="py-12 px-4 bg-gray-50">
      <h1
        className="text-4xl font-bold text-center text-blue-700 mb-10"
        data-aos="fade-down"
      >
        AC Collection
      </h1>

      <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {acItems.map((item, index) => (
          <div
            key={item._id}
            className="card bg-white shadow-lg hover:shadow-xl transition duration-300 rounded-lg overflow-hidden"
            data-aos="zoom-in-up"
            data-aos-delay={index * 100}
          >
            <figure className="overflow-hidden">
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-64 object-cover transform hover:scale-105 transition duration-500"
              />
            </figure>
            <div className="card-body p-5">
              <h2 className="card-title text-xl font-semibold text-gray-800">
                {item.title}
              </h2>
              <p className="text-gray-600 text-sm mb-3">{item.description}</p>
              <div className="flex justify-between text-sm text-gray-700 font-medium">
                <p>Price: ${item.price}</p>
                <p>Rating: ⭐ {item.rating}</p>
              </div>
              <div className="card-actions justify-end mt-4">
                <button className="btn btn-primary w-full">Buy Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AcSection;
