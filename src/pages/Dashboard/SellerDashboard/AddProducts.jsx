import axios from "axios";
import {  useContext, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import Swal from "sweetalert2";

const AddProducts = () => {
    const {user}=useContext(AuthContext);
    const email = user?.email;
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    itemName: "",
    itemDescription: "",
    itemPrice: "",
    itemImage: "",
    itemCategory: "",
    itemBrand: "",
    itemQuantity: "",
    itemSize: "",
    email: email,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Here you will send formData to the database (axios.post or fetch)
    axios.post("https://e-commerce-backend-fg1k.onrender.com/sellerProducts", formData)
      .then((response) => {
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Product added successfully",
            showConfirmButton: false,
            timer: 1500
          });
        
        // Reset form after successful submission
        setFormData({
          name: "",
          phone: "",
          address: "",
          itemName: "",
          itemDescription: "",
          itemPrice: "",
          itemImage: "",
          itemCategory: "",
          itemBrand: "",
          itemQuantity: "",
          itemSize: "",
        });
      })
      .catch((error) => {
        Swal.fire({
            position: "top-end",
            icon: "error",
            title: `Failed to add product: ${error.message}`,
            showConfirmButton: false,
            timer: 1500
          });
        
      });
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg my-10">
      <h2 className="text-3xl font-bold text-center mb-8 text-primary">Add a New Product</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Seller Info */}
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          className="input input-bordered w-full"
          required
        />
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          className="input input-bordered w-full"
          required
        />
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Address"
          className="input input-bordered w-full"
          required
        />

        {/* Item Info */}
        <input
          type="text"
          name="itemName"
          value={formData.itemName}
          onChange={handleChange}
          placeholder="Item Name"
          className="input input-bordered w-full"
          required
        />
        <input
          type="text"
          name="itemBrand"
          value={formData.itemBrand}
          onChange={handleChange}
          placeholder="Item Brand"
          className="input input-bordered w-full"
          required
        />
        <input
          type="text"
          name="itemCategory"
          value={formData.itemCategory}
          onChange={handleChange}
          placeholder="Item Category"
          className="input input-bordered w-full"
          required
        />
        <input
          type="number"
          name="itemPrice"
          value={formData.itemPrice}
          onChange={handleChange}
          placeholder="Item Price"
          className="input input-bordered w-full"
          required
        />
        <input
          type="number"
          name="itemQuantity"
          value={formData.itemQuantity}
          onChange={handleChange}
          placeholder="Item Quantity"
          className="input input-bordered w-full"
          required
        />
        <input
          type="url"
          name="itemImage"
          value={formData.itemImage}
          onChange={handleChange}
          placeholder="Image URL"
          className="input input-bordered w-full"
          required
        />

        {/* Size Dropdown */}
        <select
          name="itemSize"
          value={formData.itemSize}
          onChange={handleChange}
          className="select select-bordered w-full"
          required
        >
          <option value="">Select Size</option>
          <option value="S">Small (S)</option>
          <option value="M">Medium (M)</option>
          <option value="L">Large (L)</option>
          <option value="XL">Extra Large (XL)</option>
          <option value="XXL">Double Extra Large (XXL)</option>
        </select>

        {/* Item Description */}
        <textarea
          name="itemDescription"
          value={formData.itemDescription}
          onChange={handleChange}
          placeholder="Item Description"
          className="textarea textarea-bordered w-full md:col-span-2"
          required
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="btn btn-primary w-full md:col-span-2"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProducts;
