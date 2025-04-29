import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../AuthProvider/AuthProvider";

const CheckoutForm = () => {
  const { user } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [cartUser, setCartUser] = useState([]);
  const stripe = useStripe();
  const elements = useElements();
  const idCartUser = cartUser[0]?._id;
console.log(cartUser)
console.log(cartUser[0]?.name)
  // Fetch cart items
  useEffect(() => {
    const fetchCart = async () => {
      if (user?.email) {
        try {
          const res = await axios.get(
            `http://localhost:5000/cartItems/${user.email}`
          );
          setCartUser(res.data);
          console.log("Fetched cart items:", res.data); // Log cart items
        } catch (err) {
          console.error("Error fetching cart:", err);
        }
      }
    };
    fetchCart();
  }, [user?.email]);

  // Calculate total
  const total = cartUser.reduce(
    (sum, item) => sum + (Number(item?.price) || 0),
    0
  );
  console.log("Total price:", total); // Log total price

  // Create Payment Intent
  useEffect(() => {
    const createPaymentIntent = async () => {
      if (total > 0) {
        try {
          const res = await axios.post(
            "http://localhost:5000/create-payment-intent",
            { price: total }
          );
          setClientSecret(res.data.clientSecret);
          console.log("Client Secret:", res.data.clientSecret); // Log client secret
          console.log("Payment Intent Created:", res.data);
        } catch (err) {
          console.error("Error creating payment intent:", err);
        }
      }
    };
    createPaymentIntent();
  }, [total]);

  // Handle payment submission
  const handleSubmit = async (e) => {
    // console.log("click");
    e.preventDefault();
    // console.log("Payment attempt triggered");
    
    if (!stripe || !elements) return;
  
    const card = elements.getElement(CardElement);
    if (!card) return;
  
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
  
    if (error) {
      console.error(error);
      setError(error.message);
      return Swal.fire("Error", error.message, "error");
    }
  
    setError("");
  
    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          email: user?.email || "anonymous",
          name: user?.displayName || "anonymous",
        },
      },
    });
  
    if (confirmError) {
      console.error(confirmError);
      return Swal.fire("Payment Failed", confirmError.message, "error");
    }
  
    if (paymentIntent.status === "succeeded") {
      console.log("Payment succeeded:", paymentIntent);
      const paymentData = {
        paymentId: paymentIntent.id,
        amount: paymentIntent.amount,
        email: user.email,
        productName:cartUser[0]?.name,
        productPrice:cartUser[0]?.price,
        productImage:cartUser[0]?.image,
      };
      axios.post("http://localhost:5000/save-payment", paymentData);
      
      // Delete the cart items from the backend
      axios.delete(`http://localhost:5000/cartItems/${idCartUser}`)
        .then(() => {
          // Clear the cart UI
          setCartUser([]);
          Swal.fire({
            title: "Payment Successful!",
            text: "Thank you for your purchase!",
            icon: "success",
            confirmButtonText: "OK"
          });
        })
        .catch((err) => {
          console.error("Error deleting cart items:", err);
          Swal.fire("Error", "There was an issue removing the items from your cart.", "error");
        });
    }
    
  };
  

  return (
    <div className="max-w-lg mx-auto bg-white p-8 shadow-lg rounded-lg mt-12">
      <h2 className="text-2xl font-bold text-center mb-4">Checkout</h2>
      <p className="text-center text-gray-600 mb-8">
        Total Payment: ${total.toFixed(2)}
      </p>

      <form onSubmit={handleSubmit}>
  <div className="border p-4 bg-gray-50 rounded mb-4">
    <CardElement
      options={{
        style: {
          base: {
            fontSize: "16px",
            color: "#32325d",
            "::placeholder": { color: "#aab7c4" },
          },
          invalid: { color: "#fa755a" },
        },
      }}
    />
  </div>

  {error && <p className="text-red-500 mb-4">{error}</p>}

  <button
    type="submit"
    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
    disabled={!stripe || !clientSecret}
  >
    Pay ${total.toFixed(2)}
  </button>
</form>

    </div>
  );
};

export default CheckoutForm;
