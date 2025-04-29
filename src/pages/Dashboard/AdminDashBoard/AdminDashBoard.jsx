import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const AdminDashBoard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const linkClass = ({ isActive }) => 
    isActive 
      ? "bg-white text-gray-700 p-2 rounded" 
      : "hover:bg-white hover:text-primary p-2 rounded";

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Mobile Header */}
      <header className="md:hidden bg-accent text-white p-4 flex justify-between items-center">
        <h2 className="text-xl font-bold">Admin Dashboard</h2>
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-white focus:outline-none"
        >
          {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </header>

      {/* Sidebar - Hidden on mobile unless toggled */}
      <aside 
        className={`${sidebarOpen ? 'block' : 'hidden'} md:block w-full md:w-64 bg-accent text-white p-4 space-y-4`}
      >
        <h2 className="text-2xl font-bold mb-6 hidden md:block">Admin Dashboard</h2>
        <hr className="border-gray-600" />
        <nav className="flex flex-col space-y-2">
          <NavLink 
            to="profile" 
            className={linkClass}
            onClick={() => setSidebarOpen(false)}
          >
            Profile
          </NavLink>
          <NavLink 
            to="allUsers" 
            className={linkClass}
            onClick={() => setSidebarOpen(false)}
          >
            All Users
          </NavLink>
          <NavLink 
            to="categoryProducts" 
            className={linkClass}
            onClick={() => setSidebarOpen(false)}
          >
            Category Products
          </NavLink>
          <NavLink 
            to="sellerRequest" 
            className={linkClass}
            onClick={() => setSidebarOpen(false)}
          >
            Seller Request
          </NavLink>
          <NavLink 
            to="complain" 
            className={linkClass}
            onClick={() => setSidebarOpen(false)}
          >
            User Complaints
          </NavLink>
          <NavLink 
            to="orders" 
            className={linkClass}
            onClick={() => setSidebarOpen(false)}
          >
            Orders
          </NavLink>
          <NavLink 
            to="payment" 
            className={linkClass}
            onClick={() => setSidebarOpen(false)}
          >
            All Payments
          </NavLink>
          <NavLink 
            to="settings" 
            className={linkClass}
            onClick={() => setSidebarOpen(false)}
          >
            Settings
          </NavLink>
          <NavLink 
            to="/" 
            className={linkClass}
            onClick={() => setSidebarOpen(false)}
          >
            Home
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6 bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashBoard;