import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import axios from "axios";

const SellerProfile = () => {
  const { user } = useContext(AuthContext);
  const [seller, setSeller] = useState({});
  const [loading, setLoading] = useState(true);
  const email = user?.email;

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://e-commerce-backend-fg1k.onrender.com/users/${email}`)
      .then((res) => setSeller(res.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [email]);

  if (loading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow space-y-4">
      <div className="flex items-center space-x-4">
        <img
          src={seller.photoURL}
          alt={seller.name}
          className="w-24 h-24 rounded-full object-cover"
        />
        <div>
          <h2 className="text-2xl font-bold">{seller.name}</h2>
          <p className="text-gray-600">{seller.email}</p>
          <p className="text-primary font-semibold capitalize">{seller.status}</p>
        </div>
      </div>
    </div>
  );
};

export default SellerProfile;
