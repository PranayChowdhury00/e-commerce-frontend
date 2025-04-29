import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom"; 
import { AuthContext } from "../AuthProvider/AuthProvider";

const FeaturedProducts = () => {
  const [featuredItems, setFeaturedItems] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const { user } = useContext(AuthContext); // Assuming you have AuthContext set up
  useEffect(() => {
    axios
      .get("http://localhost:5000/featuredItems")
      .then((res) => {
        setFeaturedItems(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const visibleItems = showAll ? featuredItems : featuredItems.slice(0, 8);

  return (
    <div>
      {featuredItems.length > 0 && (
        <section className="bg-white dark:bg-gray-900 py-16 px-4">
          <div className="max-w-7xl mx-auto text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Featured Products
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Check out our top picks for you
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {visibleItems.map((item) => (
              <div
                key={item._id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full bg-white h-48 object-contain"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {item.name}
                  </h3>

                  <div className="mt-2 flex items-center gap-2">
                    <p className="text-blue-600 font-semibold">${item.price}</p>
                    {item.originalPrice && (
                      <>
                        <p className="text-gray-500 line-through text-sm">
                          ${item.originalPrice}
                        </p>
                        {/* Optional discount calculation */}
                        <p className="text-green-500 text-sm">
                          {Math.round(
                            ((item.originalPrice - item.price) / item.originalPrice) * 100
                          )}
                          % OFF
                        </p>
                      </>
                    )}
                  </div>

                  {/* ✅ View Details Button */}
                  {user ? (
                    <Link
                      to={`/product/${item._id}`}
                      className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
                    >
                      View Details
                    </Link>
                  )
                  : (
                    <Link
                      to="/login"
                      className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
                    >
                      Login to View Details
                    </Link>
                  )}

                </div>
              </div>
            ))}
          </div>

          {/* View All button */}
          {featuredItems.length > 8 && (
            <div className="flex justify-center mt-10">
              <button
                onClick={() => setShowAll(!showAll)}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-lg rounded-xl shadow-lg transition"
              >
                {showAll ? "Show Less" : "View All Products"}
              </button>
            </div>
          )}
        </section>
      )}
    </div>
  );
};

export default FeaturedProducts;
