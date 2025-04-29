import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import bannerImg from "/bannerForElectronics.jpg"; // Assuming the banner image is in the public folder
import axios from "axios";

const Banner = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [results, setResults] = useState([]);
  // const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/ElectronicsItem")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  // Filter products on search
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() !== "") {
      const filtered = products.filter(
        (item) =>
          item.title.toLowerCase().includes(value.toLowerCase()) ||
          item.category.toLowerCase().includes(value.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  };

  return (
    <div
      className="w-full h-[750px] bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bannerImg})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/60 to-black/30"></div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 text-white space-y-6">
        <h1
          className="text-4xl md:text-6xl font-extrabold drop-shadow-xl"
          data-aos="fade-down"
        >
          Welcome to <span className="text-yellow-400">ElectroZone</span>
        </h1>

        <p
          className="text-lg md:text-2xl max-w-3xl leading-relaxed drop-shadow-md"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          Your one-stop destination for the latest and greatest in electronics.
          From powerful laptops to noise-cancelling headphones, we've got it all
          — with unbeatable prices and fast delivery.
        </p>

        {/* 🔍 Functional Search Bar */}
        <div
          className="relative w-full max-w-lg z-10"
          data-aos="zoom-in"
          data-aos-delay="400"
        >
          <input
            type="text"
            placeholder="Search for gadgets, brands, or categories..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full py-3 px-5 rounded-full text-white bg-black/30 border-2 border-amber-50 focus:outline-none shadow-md placeholder:text-white/70"
          />

          {results.length > 0 && (
            <ul className="absolute w-full bg-white text-black rounded-lg shadow-lg mt-2 z-10 max-h-64 overflow-y-auto">
              {results.map((item) => (
                <Link to={`/singleProduct/${item._id}`} key={item._id}>
                  <li
                    key={item.id}
                    // onClick={() => navigate(`/product/${item.id}`)}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    <span className="font-semibold">{item.title}</span> –{" "}
                    {item.category}
                  </li>
                </Link>
              ))}
            </ul>
          )}
        </div>

        {/* Category Buttons */}
        <div
          className="flex flex-wrap justify-center gap-4 mt-4"
          data-aos="fade-up"
          data-aos-delay="600"
        >
          {[
            "Mobiles",
            "Laptops",
            "Headphones",
            "Smartwatches",
            "Cameras",
            "Accessories",
          ].map((cat) => (
            <button
              key={cat}
              className="bg-white/90 text-black font-medium px-4 py-2 rounded-full hover:bg-yellow-400 transition duration-300"
            >
              {cat}
            </button>
          ))}
        </div>

        {/* CTA */}
        <div data-aos="zoom-in" data-aos-delay="800">
          <button className="mt-6 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300">
            Start Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
