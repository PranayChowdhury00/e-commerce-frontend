import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";

const Notification = () => {
  const [seller, setSeller] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
const {user}=useContext(AuthContext);
  useEffect(() => {
    const fetchSellerStatus = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`https://e-commerce-backend-fg1k.onrender.com/seller/${user?.email}`);
        setSeller(res.data);
      } catch (err) {
        setError("Failed to fetch seller data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSellerStatus();
  }, [user?.email]);

  if (loading) return <span className="loading loading-spinner loading-lg flex justify-center items-center"></span>;
  if (error) return <div className="text-center text-red-500 py-10">{error}</div>;

  const isApproved = seller.some(s => s.status === "approved");
console.log(isApproved)
console.log(seller)
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="max-w-xl w-full bg-white shadow-lg rounded-xl p-8 text-center">
        {isApproved ? (
          <>
            <h1 className="text-2xl font-bold text-green-600 mb-4">
              🎉 Your Seller Request is Approved!
            </h1>
            <p className="text-gray-700 text-lg mb-2">You can now sell products on our platform.</p>
            <p className="text-gray-600 mb-6">
              Manage your listings from the{" "}
              <Link to="/sellerDashboard" className="text-indigo-600 font-semibold underline">
                seller dashboard
              </Link>.
            </p>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-yellow-600 mb-4">
              ⏳ Awaiting Approval
            </h1>
            <p className="text-gray-700 text-lg mb-2">
              Your request to become a seller is under review.
            </p>
            <p className="text-gray-600">
              Please wait for admin approval before you can start selling.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Notification;
