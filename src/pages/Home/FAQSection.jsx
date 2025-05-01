import React, { useState } from 'react';

const FAQSection = () => {
  // State to track which FAQ is open
  const [openIndex, setOpenIndex] = useState(null);

  // FAQ data
  const faqs = [
    {
      question: "What payment methods do you accept?",
      answer: "We accept major credit cards (Visa, Mastercard, Amex), PayPal, Apple Pay, and Google Pay. All transactions are secured with SSL encryption."
    },
    {
      question: "How long does shipping take?",
      answer: "Standard shipping takes 3-7 business days within the US. International orders may take 7-14 days depending on the destination. Expedited options are available at checkout."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for unused items in original packaging. Refunds are processed within 5-7 business days after we receive the return."
    },
    {
      question: "How can I track my order?",
      answer: "Once your order ships, you'll receive a tracking number via email. You can also track your order in your account dashboard under 'Order History'."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Yes, we ship to over 50 countries worldwide. Shipping costs and delivery times vary by location and are calculated at checkout."
    }
  ];

  // Toggle FAQ open/close
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white dark:bg-gray-900 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-200 text-center mb-12">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-gray-200 rounded-lg shadow-md overflow-hidden"
            >
              <button
                className="w-full text-left px-6 py-4 flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span className="text-lg font-semibold text-gray-800">
                  {faq.question}
                </span>
                <span className="text-blue-600 text-xl">
                  {openIndex === index ? '-' : '+'}
                </span>
              </button>
              <div
                id={`faq-answer-${index}`}
                className={`px-6 pb-4 text-gray-600 ${
                  openIndex === index ? 'block' : 'hidden'
                }`}
              >
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <p className="text-gray-600">
            Still have questions?{' '}
            <a
              href='#contact'
              className="text-blue-600 hover:underline font-medium"
            >
              Contact Us
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;