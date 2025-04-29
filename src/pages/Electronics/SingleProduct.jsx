import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const SingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/ElectronicsItem/${id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
      });
  }, [id]);

  if (!product)
    return <span className="loading loading-spinner loading-lg mx-auto mt-20 block"></span>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-10">
        Product Details
      </h1>
      <div className="bg-white shadow-xl rounded-xl overflow-hidden flex flex-col md:flex-row items-center gap-6 p-6">
        <div className="w-full md:w-1/2 overflow-hidden rounded-lg">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-auto transition-transform duration-500 ease-in-out hover:scale-105 object-cover rounded-lg shadow-md"
          />
        </div>
        <div className="w-full md:w-1/2 space-y-4">
          <h2 className="text-2xl font-semibold text-blue-700">
            {product.title}
          </h2>
          <p className="text-lg text-gray-600">{product.description}</p>
          <p className="text-lg font-medium text-purple-700">
            Category: <span className="capitalize">{product.category}</span>
          </p>
          <div className="flex justify-between items-center">
            <p className="text-2xl font-bold text-green-600">
              Price: ${product.price}
            </p>
            <p className="text-sm font-semibold text-gray-500">
              ⭐ Rating: {product.rating}
            </p>
          </div>
          <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-6 rounded-full transition duration-300 shadow-lg">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
