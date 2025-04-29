import React, { useState, useContext, useEffect } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../AuthProvider/AuthProvider";

const ContactUs = () => {
  const [userData, setUserData] = useState([]);
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    issue: "",
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  useEffect(() => {
    axios
      .get("https://e-commerce-backend-fg1k.onrender.com/users")
      .then((res) => setUserData(res.data))
      .catch((err) => console.log(err));
  }, [user?.email]);

  // Check if user is an admin or seller
  const isAdmin = userData?.some(
    (data) => data.email === user?.email && data.status === "admin"
  );

  useEffect(() => {
    AOS.init({ duration: 800 });

    if (user?.email) {
      setFormData((prev) => ({
        ...prev,
        email: user.email,
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      const response = await axios.post(
        "https://e-commerce-backend-fg1k.onrender.com/userIssue",
        formData
      );

      console.log(response.data);

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Message Sent!",
          text: "We will get back to you soon.",
        });
        setFormData({
          issue: "",
          name: "",
          phone: "",
          email: user?.email || "",
          message: "",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to send message!",
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Something went wrong!",
        text: "Please try again later.",
      });
    }
  };

  return (
    <section className="bg-white dark:bg-gray-900 py-12 px-4 md:px-10">
      <div
        className="max-w-5xl mx-auto shadow-lg rounded-xl p-8 md:p-12 bg-white dark:bg-gray-800"
        data-aos="fade-up"
      >
        <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white text-center">
          Contact Us
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-10">
          Facing any issues or have questions? Let us know. We're here to help!
        </p>

        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          onSubmit={handleSubmit}
        >
          {/* Issue Type */}
          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Select Issue
            </label>
            <select
              name="issue"
              value={formData.issue}
              onChange={handleChange}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            >
              <option value="">-- Choose an issue --</option>
              <option value="order">Order Not Received</option>
              <option value="return">Return/Refund</option>
              <option value="payment">Payment Issue</option>
              <option value="product">Product Quality</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Your Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+8801234567890"
              className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          {/* Email */}
          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              readOnly
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          {/* Message */}
          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Describe Your Issue
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              placeholder="Write your message here..."
              className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="col-span-1 md:col-span-2 flex justify-center">
            {user && !isAdmin ? (
              <button
                type="submit"
                className="bg-indigo-600 text-white font-semibold px-8 py-3 rounded-md hover:bg-indigo-700 transition duration-200"
              >
                Submit
              </button>
            ) : (
              <button
                type="button"
                disabled
                className="bg-gray-400 text-white font-semibold px-8 py-3 rounded-md cursor-not-allowed opacity-70"
              >
                Submit (Login)
              </button>
            )}
          </div>
        </form>

        {/* Contact Info */}
        <div className="mt-10 flex flex-col sm:flex-row justify-around text-sm text-gray-600 dark:text-gray-300 text-center">
          <div className="flex items-center gap-2 mb-4 sm:mb-0">
            <FaPhone className="text-indigo-500" /> +880 1303572144
          </div>
          <div className="flex items-center gap-2 mb-4 sm:mb-0">
            <FaEnvelope className="text-indigo-500" /> help@shopEE.com
          </div>
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-indigo-500" /> Dhaka, Bangladesh
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
