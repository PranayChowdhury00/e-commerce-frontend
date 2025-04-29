import React from 'react';
import Marquee from 'react-fast-marquee';

const brands = [
  { id: 1, name: 'Edifier', logoUrl: 'https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/0025/1043/brand.gif?itok=I_ZIx5YE' },
  { id: 2, name: 'Sony', logoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGTcuc324di3XZSSWBok1a_vcy4yTQ7ZMMcw&s' },
  { id: 3, name: 'Samsung', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg' },
  { id: 4, name: 'JBL', logoUrl: 'https://images.seeklogo.com/logo-png/7/1/jbl-logo-png_seeklogo-75158.png' },
  { id: 5, name: 'Boat', logoUrl: 'https://seekvectors.com/files/download/Boat%20Logo.png' },
  { id: 6, name: 'OnePlus', logoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHByQwLG-7h-noM9APbOjJrhYKDCuzsp66EQ&s' },
  // Add more brands as needed
];

const BrandsMarquee = () => {
  return (
    <section className=" py-12 bg-white dark:bg-gray-900">
      <h2 className="text-center text-xl font-semibold mb-4">Brands We Sell / Brand Partners</h2>
      <Marquee direction="left" speed={40} gradient={false}>
        {brands.map((brand) => (
          <div key={brand.id} className="mx-6">
            <img
              src={brand.logoUrl}
              alt={brand.name}
              className="h-16 w-auto object-contain grayscale hover:grayscale-0 transition"
            />
          </div>
        ))}
      </Marquee>
    </section>
  );
};

export default BrandsMarquee;
