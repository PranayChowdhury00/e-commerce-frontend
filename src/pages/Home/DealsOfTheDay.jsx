import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

const DealsOfTheDay = () => {
  const [deals, setDeals] = useState([]);

  const durationInSeconds = 3 * 60 * 60; // 3 hours

  useEffect(() => {
   axios.get("http://localhost:5000/deals")
      .then((res) => setDeals(res.data))
      .catch((err) => console.error('Failed to load deals:', err));
  }, []);

  return (
    <section className="bg-white dark:bg-gray-900 py-10 px-4 md:px-10 shadow-lg">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          🔥 Limited Time Offers
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
          50% off for the next:
        </p>

        <div className="flex justify-center mb-8">
          <CountdownCircleTimer
            isPlaying
            duration={durationInSeconds}
            colors={[['#10B981', 0.4], ['#FBBF24', 0.4], ['#EF4444', 0.2]]}
            size={120}
            strokeWidth={10}
          >
            {({ remainingTime }) => {
              const hours = Math.floor(remainingTime / 3600);
              const minutes = Math.floor((remainingTime % 3600) / 60);
              const seconds = remainingTime % 60;
              return (
                <div className="text-green-600 font-bold text-lg">
                  {hours}h {minutes}m {seconds}s
                </div>
              );
            }}
          </CountdownCircleTimer>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {deals.map((deal) => (
            <div key={deal.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow hover:shadow-xl transition">
              <img
                src={deal.image}
                alt={deal.title}
                className="h-40 mx-auto object-contain"
              />
              <h3 className="text-lg font-semibold mt-4 text-gray-800 dark:text-white">
                {deal.title}
              </h3>
              <p className="text-gray-500 line-through">${deal.oldPrice}</p>
              <p className="text-xl font-bold text-red-500">${deal.newPrice}</p>
              <p className="text-sm text-gray-600 mt-2">{deal.stock}</p>
              <button className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition">
                Buy Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DealsOfTheDay;
