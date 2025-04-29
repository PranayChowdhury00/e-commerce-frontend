import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';

const SeasonalPicksSection = () => {
  const [seasonalItems, setSeasonalItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSeasonalItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/homeGardenItems');
        // Filter or identify seasonal items (in a real app, your backend might have a 'seasonal' flag)
        const seasonal = response.data.filter(item => 
          item.name.toLowerCase().includes('holiday') || 
          item.name.toLowerCase().includes('summer') ||
          item.name.toLowerCase().includes('winter') ||
          item.category === 'garden' // Just an example filter
        ).slice(0, 4);
        setSeasonalItems(seasonal);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchSeasonalItems();
  }, []);

  if (loading) return <div className="text-center py-10">Loading seasonal picks...</div>;
  if (error) return <div className="text-center py-10 text-red-500">Error loading seasonal items: {error}</div>;

  return (
    <div className="bg-green-50 py-12 px-4 rounded-xl">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-green-800 mb-2">Seasonal Picks</h2>
          <p className="text-lg text-green-600">Discover perfect items for the current season</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {seasonalItems.map(item => (
            <div key={item.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300">
              <div className="relative h-48">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded">
                  Seasonal
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-800 mb-1">{item.name}</h3>
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
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-green-700">${item.price.toFixed(2)}</span>
                  <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm transition duration-300">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <button className="bg-white text-green-700 border border-green-700 px-6 py-2 rounded-full font-medium hover:bg-green-700 hover:text-white transition duration-300">
            View All Seasonal Items
          </button>
        </div>
      </div>
    </div>
  );
};

export default SeasonalPicksSection;