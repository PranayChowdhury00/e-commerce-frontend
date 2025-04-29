import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import axios from "axios";

const AdminProfile = () => {
  const { user } = useContext(AuthContext);
  const email = user?.email;
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (email) {
      axios
        .get(`https://e-commerce-backend-fg1k.onrender.com/users/${email}`)
        .then((res) => setUserData(res.data))
        .catch((err) => console.error("Error fetching user:", err));
    }
  }, [email]);
  console.log(userData);

  return (
    <div className="p-6 max-w-md mx-auto ">
      <h2 className="text-xl font-bold mb-4">Admin Profile</h2>
      <div className="card bg-base-100 w-96 shadow-sm">
        <figure>
          <img
            src={userData?.image}
            alt={userData?.name}
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{userData?.name}</h2>
          <p>
            {userData?.email}
          </p>
          
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
