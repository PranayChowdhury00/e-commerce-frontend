import { NavLink, Outlet } from "react-router-dom";

const AdminDashBoard = () => {
  // Style for active and inactive links
  const linkClass = ({ isActive }) => 
    isActive 
      ? "bg-white text-gray-700 p-2 rounded" 
      : "hover:bg-white hover:text-primary p-2 rounded";

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-accent text-white p-4 space-y-4">
        <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
        <hr />
        <nav className="flex flex-col space-y-2">
          <NavLink to="profile" className={linkClass}>Profile</NavLink>
          <NavLink to="allUsers" className={linkClass}>All Users</NavLink>
          <NavLink to="categoryProducts" className={linkClass}>CategoryProducts</NavLink>
          <NavLink to="sellerRequest" className={linkClass}>SellerRequest</NavLink>
          <NavLink to="complain" className={linkClass}>Complain of users</NavLink>
          <NavLink to="orders" className={linkClass}>Orders</NavLink>
          <NavLink to="payment" className={linkClass}>All Payment</NavLink>
          <NavLink to="settings" className={linkClass}>Settings</NavLink>
          <NavLink to="/" className={linkClass}>Home</NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-50">
        <Outlet /> {/* Render child routes here */}
      </main>
    </div>
  );
};

export default AdminDashBoard;