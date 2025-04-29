import React, { useState, useEffect, useContext } from 'react';
import fashionItems from '../../../public/fashionItems.json';
import { FiShoppingCart, FiHeart, FiStar, FiFilter, FiChevronDown, FiX } from 'react-icons/fi';
import Swal from 'sweetalert2';
import axios from 'axios';
import { AuthContext } from '../AuthProvider/AuthProvider';

const FashionDeals = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortOption, setSortOption] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [showFilters, setShowFilters] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const allProducts = [
      ...fashionItems.men.map(item => ({ ...item, category: 'men' })),
      ...fashionItems.women.map(item => ({ ...item, category: 'women' })),
      ...fashionItems.children.map(item => ({ ...item, category: 'kids' }))
    ];
    setProducts(allProducts);
    setLoading(false);
  }, []);

  const addToCartProduct = async (product) => {
    const cartItem = {
      productId: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      email: user?.email
    };

    try {
      const response = await axios.post('http://localhost:5000/cartItems', cartItem);
      if (response.data.insertedId || response.data.success) {
        Swal.fire({
          title: 'Added!',
          text: `${cartItem.name} has been added to your cart.`,
          icon: 'success',
          confirmButtonText: 'OK'
        });
      } else {
        throw new Error('Failed to add to cart');
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: 'Error!',
        text: 'Something went wrong while adding to cart.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  const filteredProducts = products
    .filter(product =>
      activeCategory === 'all' || product.category === activeCategory
    )
    .filter(product =>
      product.price >= priceRange[0] && product.price <= priceRange[1]
    )
    .sort((a, b) => {
      switch (sortOption) {
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        default: return 0;
      }
    });

  const toggleWishlist = (productId) => {
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter(id => id !== productId));
    } else {
      setWishlist([...wishlist, productId]);
    }
  };

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'men', name: "Men's Fashion" },
    { id: 'women', name: "Women's Collection" },
    { id: 'kids', name: "Kids' Corner" }
  ];

  return (
    <section className="py-12 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">

        {/* Header and Filters */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">Fashion Collection</h2>
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
                  <button onClick={() => setShowFilters(false)}><FiX /></button>
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
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Category Buttons */}
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

        {/* Product Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <div key={`${product.category}-${index}`} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden">
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                    
                  />
                  <button
                    onClick={() => toggleWishlist(`${product.category}-${index}`)}
                    className={`absolute top-2 left-2 p-2 rounded-full ${
                      wishlist.includes(`${product.category}-${index}`) ? 'text-red-500' : 'text-gray-300 hover:text-red-500'
                    }`}
                  >
                    <FiHeart className="w-5 h-5" fill={wishlist.includes(`${product.category}-${index}`) ? 'currentColor' : 'none'} />
                  </button>
                </div>
                <div className="p-4">
                  <div className="flex items-center mb-1">
                    {[...Array(5)].map((_, i) => (
                      <FiStar
                        key={i}
                        className={`w-4 h-4 ${
                          i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="text-xs text-gray-500 ml-1">(4.0)</span>
                  </div>
                  <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-2 capitalize">
                    {product.type} {product.category === 'men' ? "Men's" : product.category === 'women' ? "Women's" : "Kids'"} {product.category}
                  </p>
                  <div className="mb-3">
                    <span className="text-xs text-gray-500">Sizes: </span>
                    {product.size.map(size => (
                      <span key={size} className="text-xs bg-gray-100 px-2 py-1 rounded mr-1">{size}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</p>
                    </div>
                    <button
                      onClick={() => addToCartProduct(product)}
                      className="px-3 py-1 rounded-lg flex items-center bg-blue-600 text-white hover:bg-blue-700"
                    >
                      <FiShoppingCart className="mr-1" />
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No fashion items match your filters.</p>
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

export default FashionDeals;
