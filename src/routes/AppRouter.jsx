import {
    createBrowserRouter,
  } from "react-router-dom";
import MainLayout from "../MainLayout/MainLayout";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Home from "../pages/Home/Home";
import UserDashBoard from "../pages/Dashboard/UserDashBoard/UserDashBoard";
import MyOrders from "../pages/Dashboard/UserDashBoard/MyOrders";
import UserProfile from "../pages/Dashboard/UserDashBoard/UserProfile";
import Wishlist from "../pages/Dashboard/UserDashBoard/Wishlist";
import DeliveryAddresses from "../pages/Dashboard/UserDashBoard/DeliveryAddresses";
import PaymentInfo from "../pages/Dashboard/UserDashBoard/PaymentInfo";
import ProductDetails from "../pages/Home/ProductDetails";
import Electronics from "../pages/Electronics/Electronics";
import SingleProduct from "../pages/Electronics/SingleProduct";
import AcSection from "../pages/Electronics/AcSection";
import Fashion from "../pages/Fashion/Fashion";
import Cart from "../pages/Cart/Cart";
import WishList from "../pages/wishList/WishList";
import Seller from "../pages/Seller/Seller";
import AdminDashBoard from "../pages/Dashboard/AdminDashBoard/AdminDashBoard";
import AdminProfile from "../pages/Dashboard/AdminDashBoard/AdminProfile";
import AllUsers from "../pages/Dashboard/AdminDashBoard/AllUsers";

import CategoryProducts from "../pages/Dashboard/AdminDashBoard/CategoryProducts";
import SellerRequest from "../pages/Dashboard/AdminDashBoard/SellerRequest";
import Notification from "../pages/Notification/Notification";
import SellerDashboard from "../pages/Dashboard/SellerDashboard/SellerDashboard";
import SellerProfile from "../pages/Dashboard/SellerDashboard/SellerProfile";
import AddProducts from "../pages/Dashboard/SellerDashboard/AddProducts";
import MyProducts from "../pages/Dashboard/SellerDashboard/MyProducts";
import ComplainUsers from "../pages/Dashboard/AdminDashBoard/ComplainUsers";
import HomeGarden from "../pages/HomeGarden/HomeGarden";
import Page404 from "../pages/404.jsx/Page404";
import PaymentPage from "../pages/Payment/PaymentPage";
import Orders from "../pages/Dashboard/AdminDashBoard/Orders";
import AllPayment from "../pages/Dashboard/AdminDashBoard/AllPayment";
import SettingsPage from "../pages/Dashboard/AdminDashBoard/SettingsPage";


  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      children:[
        {
            path:'/login',
            element:<Login></Login>
        },
        {
            path:'/register',
            element:<Register></Register>
        },
        {
            path:'/',
            element:<Home></Home>,
        },
        {
          path:'/electronics',
          element:<Electronics></Electronics>
        },
        {
          path: 'product/:id',
          element: <ProductDetails />,
        },
        {
          path:'/singleProduct/:id',
          element:<SingleProduct></SingleProduct>
        },
        {
          path:'/fashion',
          element:<Fashion></Fashion>
        },
        {
          path:'/cart',
          element:<Cart></Cart>
        },
        {
          path:'/wishlist',
          element:<WishList></WishList>
        },
        {
          path:'/seller',
          element:<Seller></Seller>
        },
        {
          path:'/notification',
          element:<Notification></Notification>
        },
        {
          path:'/home-garden',
          element:<HomeGarden></HomeGarden>
        },
        {
          path:'/checkout',
          element:<PaymentPage></PaymentPage>
        }

      ]
    },
    {
      path: "/userDashboard",
      element:<UserDashBoard></UserDashBoard>,
      children:[
        
          {
            path: "orders",
            element: <MyOrders></MyOrders>,
          },
          {
            path: "profile",
            element: <UserProfile></UserProfile>,
          },
          {
            path: "wishlist",
            element:<Wishlist></Wishlist>
          },
          {
            path:'addresses',
            element:<DeliveryAddresses></DeliveryAddresses>
          },
          {
            path:'payment',
            element:<PaymentInfo></PaymentInfo>
          }
        
      ]
    },
    {
      path:"/adminDashboard",
      element:<AdminDashBoard></AdminDashBoard>,
      children:[
        {
          path:'profile',
          element:<AdminProfile></AdminProfile>
        },
        {
          path:'allUsers',
          element:<AllUsers></AllUsers>
        },
        {
         path:'categoryProducts',
         element:<CategoryProducts></CategoryProducts>
          
        },
        {
          path:'sellerRequest',
          element:<SellerRequest></SellerRequest>
        },
        {
          path:'complain',
          element:<ComplainUsers></ComplainUsers>
        },
        {
          path:'orders',
          element:<Orders></Orders>
        },
        {
          path:'payment',
          element:<AllPayment></AllPayment>
        },
        {
          path:'settings',
          element:<SettingsPage></SettingsPage>
        }
      ]

    },
    {
      path:'/sellerDashboard',
      element:<SellerDashboard></SellerDashboard>,
      children:[
        {
          path:"profile",
          element:<SellerProfile></SellerProfile>
        },
        {
          path:"addProducts",
          element:<AddProducts></AddProducts>
        },
        {
          path:"myProducts",
          element:<MyProducts></MyProducts>
        }
      ]
    },
    {
      path:"*",
      element:<Page404></Page404>
    }
  ]);
  export default router;