import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const Cart = () => {
  const { user } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState(null);
  const [total, setTotal] = useState(0);

  // Fetch cart items
  useEffect(() => {
    if (user?.email) {
      axios
        .get(`https://e-commerce-backend-fg1k.onrender.com/cartItems/${user.email}`)
        .then((res) => {
          setCartItems(res.data);
          const totalPrice = res.data.reduce((acc, item) => acc + Number(item.price), 0);
          setTotal(totalPrice);
        })
        .catch((err) => console.log(err));
    }
  }, [user?.email]);

  // Remove from cart
  const handleRemove = (id) => {
    axios
      .delete(`https://e-commerce-backend-fg1k.onrender.com/cartItems/${id}`)
      .then((res) => {
        if (res.data.deletedCount > 0) {
          const updatedCart = cartItems.filter((item) => item._id !== id);
          setCartItems(updatedCart);
          const newTotal = updatedCart.reduce((acc, item) => acc + Number(item.price), 0);
          setTotal(newTotal);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Item removed from cart",
            showConfirmButton: false,
            timer: 1500
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `Something went wrong! ||n${err.message}`,
          footer: "Please try again later."
        });
      });
  };

  if (!cartItems)
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  if (cartItems.length === 0)
    return (
      <p className="text-center mt-10 text-xl font-semibold text-gray-600">
        Your cart is empty.
      </p>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Cart</h1>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {cartItems.map((item) => (
          <div key={item._id} className="card bg-base-100 shadow-md rounded-lg overflow-hidden">
            <figure>
              <img
                src={item.image}
                className="h-52 w-full object-cover"
                alt={item.name}
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{item.name}</h2>
              <p className="text-lg font-medium">
                Price: ${Number(item.price).toFixed(2)}
              </p>
              <div className="card-actions justify-end mt-4">
                <Link to="/checkout">
                  <button className="btn btn-primary">Buy Now</button>
                </Link>
                <button
                  onClick={() => handleRemove(item._id)}
                  className="btn btn-error btn-outline"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Total Price */}
      <div className="text-right mt-4">
        <h2 className="text-2xl font-semibold">
          Total: <span className="text-green-600">${Number(total).toFixed(2)}</span>
        </h2>
      </div>
    </div>
  );
};

export default Cart;
