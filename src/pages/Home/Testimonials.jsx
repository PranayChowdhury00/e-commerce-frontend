import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaStar } from 'react-icons/fa';

const testimonials = [
  {
    name: 'Anika Rahman',
    photo: 'https://randomuser.me/api/portraits/women/44.jpg',
    feedback: 'The product quality is amazing and delivery was super fast! Highly recommended.',
    rating: 5,
  },
  {
    name: 'Sakib Hossain',
    photo: 'https://randomuser.me/api/portraits/men/32.jpg',
    feedback: 'Great service and very responsive support. I’ll definitely buy again!',
    rating: 5,
  },
  {
    name: 'Mira Akter',
    photo: 'https://randomuser.me/api/portraits/women/68.jpg',
    feedback: 'Loved the shopping experience. Easy returns and trustworthy sellers.',
    rating: 5,
  },
];

const Testimonials = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section className="bg-gray-100 dark:bg-gray-900 py-14 px-4 md:px-10">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-10" data-aos="fade-up">
          💬 Customer Reviews
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((review, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="flex items-center mb-4">
                <img
                  src={review.photo}
                  alt={review.name}
                  className="w-12 h-12 rounded-full border-2 border-indigo-500 mr-4"
                />
                <div className="text-left">
                  <h3 className="font-semibold text-lg text-gray-800 dark:text-white">{review.name}</h3>
                  <div className="flex text-yellow-400">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm">{`"${review.feedback}"`}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
