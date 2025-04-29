import React, { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";

const Seller = () => {
    const {user}=useContext(AuthContext);
    const email = user?.email;
  const handleForm = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const address = form.address.value;
    const itemName = form.itemName.value;
    const itemDescription = form.itemDescription.value;
    const itemPrice = form.itemPrice.value;
    const itemImage = form.itemImage.value;
    const itemCategory = form.itemCategory.value;
    const itemBrand = form.itemBrand.value;
    const itemQuantity = form.itemQuantity.value;
    const itemSize = form.itemSize.value;

    console.log(
      name,
      email,
      phone,
      address,
      itemName,
      itemDescription,
      itemPrice,
      itemImage,
      itemCategory,
      itemBrand,
      itemQuantity,
      itemSize
    );
    const sellerData = {
        name,
        phone,
        address,
        itemName,
        itemDescription,
        itemPrice,
        itemImage,
        itemCategory,
        itemBrand,
        itemQuantity,
        itemSize,
        email,
        status:"pending",
      };
    
      
    axios.post("https://e-commerce-backend-fg1k.onrender.com/seller",{sellerData})
      .then((res) => {
        if (res.data.insertedId) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Seller data submitted successfully!",
                showConfirmButton: false,
                timer: 1500
              });
              
          
          form.reset();
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `Something went wrong! ${err.message}`,
          footer: "Please try again later.",
        });
      });
  };

  return (
    <div>
      <h1 className="text-center text-3xl font-bold py-5 leading-snug">
        Become a seller on <span className="text-gray-400">ShopEE</span>
        <br /> By filling the form below
      </h1>

      <div className="w-full max-w-4xl mx-auto px-4 py-8">
        <form
          onSubmit={handleForm}
          className="w-full max-w-lg mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col items-center"
        >
          <fieldset className="w-full mb-4">
            <legend className="font-semibold mb-1">What is your name?</legend>
            <input name="name" type="text" className="input w-full" placeholder="Your full name" required />
          </fieldset>

          <fieldset className="w-full mb-4">
            <legend className="font-semibold mb-1">Email</legend>
            <input name="email" type="email" className="input w-full" defaultValue={email} readOnly placeholder="mail@example.com" required />
          </fieldset>

          <fieldset className="w-full mb-4">
            <legend className="font-semibold mb-1">Phone</legend>
            <input name="phone" type="tel" className="input w-full" placeholder="+8801XXXXXXXXX" required />
          </fieldset>

          <fieldset className="w-full mb-4">
            <legend className="font-semibold mb-1">Address</legend>
            <input name="address" type="text" className="input w-full" placeholder="Your address" required />
          </fieldset>

          <fieldset className="w-full mb-4">
            <legend className="font-semibold mb-1">Item Name</legend>
            <input name="itemName" type="text" className="input w-full" placeholder="Item name" required />
          </fieldset>

          <fieldset className="w-full mb-4">
            <legend className="font-semibold mb-1">Item Description</legend>
            <input name="itemDescription" type="text" className="input w-full" placeholder="Short description" required />
          </fieldset>

          <fieldset className="w-full mb-4">
            <legend className="font-semibold mb-1">Item Price</legend>
            <input name="itemPrice" type="number" className="input w-full" placeholder="Item price" required />
          </fieldset>

          <fieldset className="w-full mb-4">
            <legend className="font-semibold mb-1">Item Image URL</legend>
            <input name="itemImage" type="url" className="input w-full" placeholder="https://image.url" required />
          </fieldset>

          <fieldset className="w-full mb-4">
            <legend className="font-semibold mb-1">Item Category</legend>
            <input name="itemCategory" type="text" className="input w-full" placeholder="e.g. Electronics" required />
          </fieldset>

          <fieldset className="w-full mb-4">
            <legend className="font-semibold mb-1">Item Brand</legend>
            <input name="itemBrand" type="text" className="input w-full" placeholder="e.g. Samsung" required />
          </fieldset>

          <fieldset className="w-full mb-4">
            <legend className="font-semibold mb-1">Item Quantity</legend>
            <input name="itemQuantity" type="number" className="input w-full" placeholder="e.g. 5" required />
          </fieldset>

          <fieldset className="w-full mb-4">
            <legend className="font-semibold mb-1">Item Size</legend>
            <input name="itemSize" type="text" className="input w-full" placeholder="e.g. Medium, 42-inch" required />
          </fieldset>

          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded mt-4"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Seller;
