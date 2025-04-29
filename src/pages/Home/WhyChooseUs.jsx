import React, { useEffect } from 'react';
import { FaShippingFast, FaHeadset, FaLock, FaUndo } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';

const features = [
  {
    icon: <FaShippingFast className="text-4xl text-blue-600" />,
    title: 'Free Shipping',
    description: 'Get free shipping on all orders above $50.',
  },
  {
    icon: <FaHeadset className="text-4xl text-green-600" />,
    title: '24/7 Support',
    description: 'Our team is here to help you anytime, day or night.',
  },
  {
    icon: <FaLock className="text-4xl text-purple-600" />,
    title: 'Secure Payments',
    description: 'Your transactions are encrypted and protected.',
  },
  {
    icon: <FaUndo className="text-4xl text-red-500" />,
    title: 'Easy Returns',
    description: 'Not satisfied? Return within 7 days, no questions asked.',
  },
];

const WhyChooseUs = () => {
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  return (
    <section className="bg-white dark:bg-gray-900 py-14 px-4 md:px-10">
      <div className="max-w-6xl mx-auto text-center">
        <h2
          className="text-3xl font-bold text-gray-800 dark:text-white mb-10"
          data-aos="fade-up"
        >
          🚀 Why Choose Us
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="p-6 bg-gray-100 dark:bg-gray-800 rounded-xl shadow hover:shadow-xl transition"
              data-aos="fade-up"
              data-aos-delay={idx * 100}
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-700 dark:text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
