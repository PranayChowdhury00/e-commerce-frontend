import axios from 'axios';
import React, { useEffect, useState } from 'react';

const NewArrivals = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/newArrivals")
      .then(res => setItems(res.data))
      .catch(err => console.error("Error fetching new arrivals:", err));
  }, []);

  return (
    <section className="bg-white dark:bg-gray-900 py-12 px-4 md:px-10">
      <div className="max-w-6xl mx-auto">
        <h2
          className="text-3xl font-bold text-center text-gray-100 mb-10"
          data-aos="fade-up"
        >
          ✨ New Arrivals
        </h2>

        <div className="flex flex-wrap justify-center gap-6">
          {items.map((item, index) => (
            <div
              key={item.id}
              className="card w-80 bg-base-100 shadow hover:shadow-xl transition"
              data-aos="zoom-in"
              data-aos-delay={index * 100}
            >
              <figure>
                <img src={item.image} alt={item.title} className="h-48 object-contain py-5 rounded-2xl " />
              </figure>
              <div className="card-body">
                <h2 className="card-title flex justify-between items-center ">
                  {item.title}
                  <div className="badge h-8  badge-success animate-pulse">
                    <p className='text-[10px] py-8  font-light'>{item.tag}</p>
                  </div>
                </h2>
                <p className="text-xl font-bold text-gray-700">${item.price}</p>
                <div className="card-actions justify-end mt-2">
                  <button className="btn btn-outline btn-primary">Shop Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
