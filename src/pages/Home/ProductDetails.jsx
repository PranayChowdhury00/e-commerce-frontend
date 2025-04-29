import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";

import Swal from "sweetalert2";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
const {user}=useContext(AuthContext);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/featuredItems/${id}`)
      
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!product) return <p className="text-center mt-10">Loading product...</p>;

  const handelAddToCart = () => {
    const cartItem = {
      productId: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      email: user?.email,
    };
  
    axios
      .post("http://localhost:5000/cartItems", cartItem)
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Product added to cart successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((err) => {
        if (err.response?.status === 409) {
         
            Swal.fire({
              position: "top-end",
              icon: "error",
              title: "This item is already in your cart!",
              showConfirmButton: false,
              timer: 1500,
            });
     
         
        } else {
         
            Swal.fire({
              position: "top-end",
              icon: "error",
              title: "Something went wrong. Please try again.",
              showConfirmButton: false,
              timer: 1500,
            });
          
          
        }
      });
  };
  

  return (
    <div className="  bg-white min-h-screen dark:bg-gray-900  flex justify-center items-center">
      <div className="max-w-4xl mx-auto p-6 bg-base-100 shadow-lg rounded-2xl">
      <div className="flex flex-col md:flex-row items-center gap-8">
        <img
          src={product?.image}
          alt={product.name}
          className="w-full md:w-1/2 h-80 object-contain border rounded-xl shadow"
        />
        <div className="flex-1 space-y-4">
          <h2 className="text-3xl font-bold text-gray-800">{product?.name}</h2>
          <div className="flex items-center gap-3">
            <span className="text-2xl text-green-600 font-semibold">${product.price}</span>
            {product?.originalPrice && (
              <span className="line-through text-gray-500 text-lg">${product.originalPrice}</span>
            )}
          </div>
          <p className="text-gray-600">
            {product?.description || "This is a high-quality product with premium features and great performance."}
          </p>
          <button onClick={handelAddToCart} className="px-6 py-2 mt-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Add to cart
          </button>
        </div>
      </div>
      </div>
    </div>
  );
};

export default ProductDetails;
