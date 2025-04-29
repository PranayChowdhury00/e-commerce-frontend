import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FaShoppingCart,
  FaUser,
  FaSearch,
  FaHeart,
  FaSignInAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import Swal from "sweetalert2";
import { AuthContext } from "../pages/AuthProvider/AuthProvider";
import axios from "axios";
import { IoMdNotificationsOutline } from "react-icons/io";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [wishListItems, setWishListItems] = useState([]);
  const [userData, setUserData] = useState([]);
  const [notifications, setNotifications] = useState([]);
  
  useEffect(() => {
    axios
      .get("https://e-commerce-backend-fg1k.onrender.com/users")
      .then((res) => setUserData(res.data))
      .catch((err) => console.log(err));
  }, [user?.email]);
  
  const isAdmin = userData?.some(
    (data) => data.email === user?.email && data.status === "admin"
  );
  const isSeller = userData?.some(
    (data) => data.email === user?.email && data.status === "seller"
  );

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`https://e-commerce-backend-fg1k.onrender.com/seller/${user.email}`)
        .then((res) => setNotifications(res.data))
        .catch((err) => console.log(err));
    }
  }, [user?.email]);

  const categories = [
    { name: "Home", path: "/" },
    { name: "Electronics", path: "/electronics" },
    { name: "Fashion", path: "/fashion" },
    { name: "Home & Garden", path: "/home-garden" },
  ];

  if (user && !isAdmin) {
    categories.push({ name: "Seller", path: "/seller" });
  }

  const handleLogout = () => {
    Swal.fire({
      title: "Logout?",
      text: "Are you sure you want to logout?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        signOutUser();
        Swal.fire("Logged Out!", "You have been logged out.", "success");
        navigate("/login");
      }
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };
  

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`https://e-commerce-backend-fg1k.onrender.com/cartItems/${user.email}`)
        .then((res) => setCartItems(res.data))
        .catch((err) => console.log(err));
    }
  }, [user?.email]);

  useEffect(() => {
    axios
      .get(`https://e-commerce-backend-fg1k.onrender.com/wishList/${user?.email}`)
      .then((res) => setWishListItems(res.data))
      .catch((err) => console.log(err));
  }, [user?.email]);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white sticky top-0 z-50 shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Mobile Menu and Logo */}
          <div className="flex items-center">
            <div className="dropdown lg:hidden">
              <label tabIndex={0} className="btn btn-ghost p-2">
                <HiOutlineMenuAlt3 className="h-6 w-6" />
              </label>
              <ul
                tabIndex={0}
                className="menu dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                {categories.map((category, index) => (
                  <li key={index}>
                    <Link
                      to={category.path}
                      className={`hover:bg-gray-100 ${
                        isActive(category.path)
                          ? "bg-primary text-white font-semibold"
                          : ""
                      }`}
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <Link to="/" className="text-xl font-bold flex items-center gap-1">
              <span className="text-primary">ShopEE</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-4">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={category.path}
                className={`px-3 py-2 text-sm font-medium rounded-md transition duration-200 ${
                  isActive(category.path)
                    ? "bg-primary text-white"
                    : "text-gray-700 hover:text-primary hover:bg-gray-100"
                }`}
              >
                {category.name}
              </Link>
            ))}
          </div>

          {/* Search - Hidden on small screens, visible from medium */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <form onSubmit={handleSearch} className="relative w-full">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input input-bordered w-full pr-10 focus:outline-none"
              />
              <button
                type="submit"
                className="absolute right-0 top-0 h-full px-3 bg-primary text-white rounded-r-md"
              >
                <FaSearch className="h-4 w-4" />
              </button>
            </form>
          </div>

          {/* Icons - Adjusted spacing for small screens */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Notifications - Hidden on small screens */}
            <Link to="/notifications" className="hidden sm:flex btn btn-ghost btn-circle">
              <div className="indicator">
                <IoMdNotificationsOutline className="h-5 w-5" />
                <span className="badge badge-sm indicator-item bg-primary text-white">
                  {user ? notifications.length : 0}
                </span>
              </div>
            </Link>

            {/* Wishlist */}
            <Link to="/wishlist" className="btn btn-ghost btn-circle">
              <div className="indicator">
                <FaHeart className="h-5 w-5" />
                <span className="badge badge-sm indicator-item bg-primary text-white">
                  {user ? wishListItems.length : 0}
                </span>
              </div>
            </Link>

            {/* Cart */}
            <Link to="/cart" className="btn btn-ghost btn-circle">
              <div className="indicator">
                <FaShoppingCart className="h-5 w-5" />
                <span className="badge badge-sm indicator-item bg-primary text-white">
                  {user ? cartItems.length : 0}
                </span>
              </div>
            </Link>

            {/* Auth */}
            {user ? (
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full bg-primary text-white flex items-center justify-center">
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt="User profile"
                        className="rounded-full"
                      />
                    ) : (
                      <span className="text-lg">
                        {user.displayName?.charAt(0).toUpperCase() || (
                          <FaUser />
                        )}
                      </span>
                    )}
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="menu dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                >
                  {isAdmin ? (
                    <li>
                      <Link to="/adminDashboard">AdminDashboard</Link>
                    </li>
                  ) : isSeller ? (
                    <li>
                      <Link to="/sellerDashboard">SellerDashboard</Link>
                    </li>
                  ) : (
                    <li>
                      <Link to="/userDashboard">UserDashboard</Link>
                    </li>
                  )}
                  <li>
                    <button
                      onClick={handleLogout}
                      className="text-red-500 flex items-center"
                    >
                      <FaSignOutAlt className="mr-2" /> Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/login" className="btn btn-ghost flex items-center">
                <FaSignInAlt className="mr-2" /> Login
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Search - Visible only on small screens */}
        <div className="md:hidden pb-3 px-2">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input input-bordered w-full pr-10 focus:outline-none"
            />
            <button
              type="submit"
              className="absolute right-0 top-0 h-full px-3 bg-primary text-white rounded-r-md"
            >
              <FaSearch className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;