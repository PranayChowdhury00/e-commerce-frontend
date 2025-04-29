import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import { Link } from "react-router-dom";

const FeaturedSellerItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 1000 });

    // Fetch data from your backend
    axios.get("https://e-commerce-backend-fg1k.onrender.com/sellerProducts")
      .then(res => {
        setItems(res.data);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <section className="py-12 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-gray-200 mb-2" data-aos="fade-down">
            ✨ Featured Seller Items
          </h2>
          <p className="text-gray-400" data-aos="fade-up">
            Check out some amazing products from our trusted sellers
          </p>
        </div>

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {items.slice(0, 8).map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              data-aos="zoom-in"
            >
              <img
                src={item.itemImage}
                alt={item.itemName}
                className="h-48 w-full object-cover rounded-t-lg"
              />
              <div className="p-4 space-y-2">
                <h3 className="text-xl font-semibold text-gray-800">{item.itemName}</h3>
                <p className="text-gray-500 text-sm">{item.itemBrand}</p>
                <p className="text-primary font-bold text-lg">${item.itemPrice}</p>
                <Link to={`/product/${item._id}`} className="block">
                <button className="mt-2 w-full bg-primary text-white py-2 rounded hover:bg-secondary transition duration-300">
                  View Details
                </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

       
      </div>
    </section>
  );
};

export default FeaturedSellerItems;
