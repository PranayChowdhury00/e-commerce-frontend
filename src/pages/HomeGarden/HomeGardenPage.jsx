import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import banner from '/homeGardenBanner.jpg';
import { AuthContext } from '../AuthProvider/AuthProvider';
import Swal from 'sweetalert2';
const HomeGardenPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    const {user}=useContext(AuthContext);
    const email=user?.email;
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/homeGardenItems');
        setItems(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        console.error('Error fetching data:', err);
      }
    };

    fetchItems();
  }, []);

  const handelAddToCart = (id) => {
    // Find the full item details by _id
    const selectedItem = items.find(item => item._id === id);

    // Now create the cart item
    const cartItem = {
      productId: selectedItem._id,
      name: selectedItem.name,
      price: selectedItem.price,
      image: selectedItem.image,
      email: email
    };
  
    // Send to backend
    axios.post("http://localhost:5000/cartItems", cartItem)
      .then(res => {
        console.log("Item added to cart:", res.data);
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Item added to cart",
            showConfirmButton: false,
            timer: 1500
          });
      })
      .catch(err => {
        console.error("Error adding to cart:", err);
        Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Error adding to cart",
            showConfirmButton: false,
            timer: 1500
          });
      });
  };
  
console.log(items)


  // Banner Component
  const HomeGardenBanner = () => {
    return (
      <div className="relative h-96 w-full overflow-hidden rounded-lg shadow-lg mb-12 ">
        <div className="absolute inset-0 bg-gradient-to-r from-green-900 to-green-600 opacity-90"></div>
        <div className="absolute inset-0 flex items-center justify-between px-8">
          <div className="max-w-md text-white">
            <h1 className="text-4xl font-bold mb-4">Transform Your Living Spaces</h1>
            <p className="text-xl mb-6">Discover premium home essentials and garden must-haves to create your perfect oasis.</p>
            <a href='#ProductCard' className="bg-white text-green-800 px-6 py-3 rounded-full font-semibold hover:bg-green-100 transition duration-300">
              Shop Now
            </a>
          </div>
          <div className="hidden md:block">
            <div className="relative">
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-white bg-opacity-20 rounded-full"></div>
              <div className="absolute -top-10 -right-10 w-48 h-48 bg-white bg-opacity-30 rounded-full"></div>
              <img 
                src={banner}
                alt="Home and garden items" 
                className="relative z-10 w-64 h-64 object-cover rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Product Card Component
  const ProductCard = ({ item }) => {
    return (
      <div id='ProductCard' className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300">
        <div className="relative pb-2/3 h-48">
          <img 
            src={item.image} 
            alt={item.name} 
            className="absolute h-full w-full object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-1 text-gray-800">{item.name}</h3>
          <div className="flex items-center mb-2">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${i < Math.floor(item.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="text-gray-600 text-sm ml-1">({item.rating})</span>
          </div>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>
          <div className="flex items-center justify-between">
            <span className="font-bold text-gray-900">${item.price.toFixed(2)}</span>
            <button onClick={()=>handelAddToCart(item._id)} className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition duration-300 text-sm">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Category Section Component
  const CategorySection = ({ title, items, category }) => {
    return (
      <div className="my-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          <a 
            href={`/shop?category=${category}`} 
            className="text-green-600 hover:text-green-800 font-medium"
          >
            View All
          </a>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.slice(0, 4).map(item => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    );
  };

  // Featured Items Component
  const FeaturedItems = ({ items }) => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map(item => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>
    );
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (error) return <div className="text-center py-20 text-red-500">Error: {error}</div>;

  const homeItems = items.filter(item => item.category === 'home');
  const gardenItems = items.filter(item => item.category === 'garden');

  return (
    <div className="container mx-auto px-4 py-8 bg-green-50">
      <HomeGardenBanner />
      
      <div className="my-12">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Featured Products</h2>
        <FeaturedItems items={items.slice(0, 6)} />
      </div>

      <CategorySection 
        title="Home Essentials" 
        items={homeItems} 
        category="home" 
      />

      <CategorySection 
        title="Garden Must-Haves" 
        items={gardenItems} 
        category="garden" 
      />
    </div>
  );
};

export default HomeGardenPage;