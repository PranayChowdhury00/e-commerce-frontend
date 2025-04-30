import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../AuthProvider/AuthProvider";

const ProductDetails2 = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://e-commerce-backend-fg1k.onrender.com/electronicsItemSearch/${id}`
        );
        setProduct(response.data);
        setLoading(false);
      } catch (err) {
        setError("Product not found");
        setLoading(false);
        console.error(err);
      }
    };

    fetchProduct();
  }, [id]);

  // console.log("data",data)

  // useEffect(() => {
  //     if (!product?._id) return;

  //     const cartItem = {
  //       productId: product._id,
  //       image: product.images[0],
  //       name: product.model,
  //       price: product.price,
  //       email:user?.email
  //     };

  //     axios.post('https://e-commerce-backend-fg1k.onrender.com/cartItems', cartItem)
  //       .then(() => {
  //         Swal.fire({
  //           icon: 'success',
  //           title: 'Added to cart',
  //           text: `${product.model} has been added to your cart.`,
  //           timer: 2000,
  //           showConfirmButton: false
  //         });
  //       })
  //       .catch(() => {
  //         Swal.fire({
  //           icon: 'error',
  //           title: 'Failed',
  //           text: 'Something went wrong while adding to cart.',
  //           timer: 2000,
  //           showConfirmButton: false
  //         });
  //       });

  //   }, [product._id, product.images, product.model, product.price, user?.email]);

  const handleAddToCart = () => {
    if (!user?.email) {
      return Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login to add items to your cart.",
      });
    }

    const cartItem = {
      productId: product._id,
      image: product.images[0],
      name: product.model,
      price: product.price,
      email: user.email,
    };

    axios
      .post("https://e-commerce-backend-fg1k.onrender.com/cartItems", cartItem)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Added to cart",
          text: `${product.model} has been added to your cart.`,
          timer: 2000,
          showConfirmButton: false,
        });
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: "Something went wrong while adding to cart.",
          timer: 2000,
          showConfirmButton: false,
        });
      });
  };
  

  if (loading) {
    return <div className="container mx-auto py-8 text-center">Loading...</div>;
  }

  if (error || !product) {
    return (
      <div className="container mx-auto py-8 text-center text-red-500">
        {error || "Product not found"}
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div>
          <div className="bg-gray-100 rounded-lg p-4 mb-4">
            {product.images && product.images.length > 0 ? (
              <img
                src={product.images[0]}
                alt={product.model}
                className="w-full h-96 object-contain"
              />
            ) : (
              <div className="w-full h-96 flex items-center justify-center text-gray-400">
                No Image Available
              </div>
            )}
          </div>
          <div className="flex gap-2">
            {product.images &&
              product.images.slice(0, 4).map((img, index) => (
                <div
                  key={index}
                  className="w-20 h-20 bg-gray-100 rounded border flex items-center justify-center"
                >
                  <img
                    src={img}
                    alt={`${product.model} ${index + 1}`}
                    className="h-full object-contain"
                  />
                </div>
              ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold mb-2">
            {product.brand} {product.model}
          </h1>
          <div className="flex items-center mb-4">
            <div className="flex text-yellow-400 mr-2">
              {[...Array(5)].map((_, i) => (
                <span key={i}>
                  {i < Math.floor(product.rating) ? "★" : "☆"}
                </span>
              ))}
            </div>
            <span className="text-gray-600">({product.reviews} reviews)</span>
          </div>

          <p className="text-2xl font-bold text-primary mb-4">
            ${product.price}
          </p>

          <p className="text-gray-700 mb-6">{product.description}</p>

          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-2">Specifications</h3>
            <ul className="grid grid-cols-2 gap-2">
              {Object.entries(product.specs).map(([key, value]) => (
                <li key={key} className="text-gray-600">
                  <span className="font-medium">{key}:</span> {value}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex gap-4">
            <button
              className="btn btn-primary flex-1"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>

           
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails2;
