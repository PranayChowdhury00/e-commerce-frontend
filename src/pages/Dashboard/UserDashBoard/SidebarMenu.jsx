import { NavLink } from 'react-router-dom';
import { 
  FiUser, 
  FiShoppingBag, 
  FiHeart, 
  FiMapPin, 
  FiCreditCard 
} from 'react-icons/fi';
import { AiFillHome } from 'react-icons/ai';

const SidebarMenu = () => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-2xl  p-4 w-64 h-full">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">User Menu</h2>
      <ul className="space-y-2 ">
        {/* Profile */}
        <li> 
          <NavLink
            to="profile"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 ${
                isActive
                  ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-white"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`
            }
          >
            <FiUser className="text-xl" />
            My Profile
          </NavLink>
        </li>

        {/* Orders */}
        <li>
          <NavLink
            to="orders"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 ${
                isActive
                  ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-white"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`
            }
          >
            <FiShoppingBag className="text-xl" />
            My Orders
          </NavLink>
        </li>
        {/* Payment */}
        <li>
          <NavLink
            to="payment"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 ${
                isActive
                  ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-white"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`
            }
          >
            <FiCreditCard className="text-xl" />
            Payment
          </NavLink>
        </li>

        

        {/* Addresses */}
        <li>
          <NavLink
            to="addresses"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 ${
                isActive
                  ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-white"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`
            }
          >
            <FiMapPin className="text-xl" />
            Addresses
          </NavLink>
        </li>

        {/* home */}
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 ${
                isActive
                  ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-white"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`
            }
          >
            <AiFillHome className='text-xl' />
            Home
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default SidebarMenu;
