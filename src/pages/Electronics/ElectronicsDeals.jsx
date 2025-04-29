import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { FiShoppingCart, FiHeart, FiStar, FiFilter, FiChevronDown, FiX } from 'react-icons/fi';

const ElectronicsDeals = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortOption, setSortOption] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [showFilters, setShowFilters] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);

  // Load products (in a real app, this would be an API call)
  useEffect(() => {
    axios.get("http://localhost:5000/electronicsDealsCoolingAc")
    .then(response => {
      setProducts(response.data);
        setLoading(false);
    })
    .catch(error => {
      console.error("Error fetching products:", error);
      setLoading(false);
    });
  }, []);

  // Filter and sort products
  const filteredProducts = products
    .filter(product => 
      activeCategory === 'all' || product.category === activeCategory
    )
    .filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    )
    .sort((a, b) => {
      switch(sortOption) {
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'rating': return b.rating - a.rating;
        case 'discount': return (b.discount || 0) - (a.discount || 0);
        default: return a.id - b.id; // featured/default
      }
    });

  // Handle add to cart
  const addToCart = (product) => {
    setCart([...cart, product]);
    alert(`${product.name} added to cart!`);
  };

  // Toggle wishlist
  const toggleWishlist = (productId) => {
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter(id => id !== productId));
    } else {
      setWishlist([...wishlist, productId]);
    }
  };

  // Product categories
  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'air-conditioners', name: 'Air Conditioners' },
    { id: 'coolers', name: 'Air Coolers' },
    { id: 'fans', name: 'Fans' }
  ];

  return (
    <section className="electronics-deals py-12 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">Smart Cooling Solutions</h2>
          
          <div className="flex space-x-4">
            <div className="relative">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm"
              >
                <FiFilter className="mr-2" />
                Filters
                <FiChevronDown className="ml-2" />
              </button>
              
              {showFilters && (
                <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-10 p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-medium">Filters</h3>
                    <button onClick={() => setShowFilters(false)}>
                      <FiX />
                    </button>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Price Range</label>
                    <div className="flex items-center justify-between space-x-4">
                      <span>${priceRange[0]}</span>
                      <input
                        type="range"
                        min="0"
                        max="1000"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="w-full"
                      />
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Sort By</label>
                    <select
                      value={sortOption}
                      onChange={(e) => setSortOption(e.target.value)}
                      className="w-full p-2 border rounded"
                    >
                      <option value="featured">Featured</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="rating">Highest Rating</option>
                      <option value="discount">Biggest Discount</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex overflow-x-auto pb-2 mb-6 scrollbar-hide">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 mr-2 rounded-full whitespace-nowrap ${
                activeCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                {/* Product Image */}
                <div className="relative">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-48 object-cover"
                  />
                  {product.discount && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                      {product.discount}% OFF
                    </div>
                  )}
                  <button 
                    onClick={() => toggleWishlist(product.id)}
                    className={`absolute top-2 left-2 p-2 rounded-full ${
                      wishlist.includes(product.id) ? 'text-red-500' : 'text-gray-300 hover:text-red-500'
                    }`}
                  >
                    <FiHeart className="w-5 h-5" fill={wishlist.includes(product.id) ? 'currentColor' : 'none'} />
                  </button>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <div className="flex items-center mb-1">
                    {[...Array(5)].map((_, i) => (
                      <FiStar 
                        key={i} 
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="text-xs text-gray-500 ml-1">({product.rating})</span>
                  </div>
                  
                  <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {product.features.join(' • ')}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</p>
                      {product.originalPrice && (
                        <p className="text-sm text-gray-500 line-through">${product.originalPrice.toFixed(2)}</p>
                      )}
                    </div>
                    
                    <button 
                      onClick={() => addToCart(product)}
                      disabled={product.stock <= 0}
                      className={`px-3 py-1 rounded-lg flex items-center ${
                        product.stock <= 0
                          ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      <FiShoppingCart className="mr-1" />
                      {product.stock <= 0 ? 'Out of Stock' : 'Add'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No products match your filters. Try adjusting your criteria.</p>
            <button 
              onClick={() => {
                setActiveCategory('all');
                setPriceRange([0, 1000]);
                setSortOption('featured');
              }}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ElectronicsDeals;