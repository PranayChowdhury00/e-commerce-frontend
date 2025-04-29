import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Notification = () => {
  const [notification, setNotification] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    axios
      .get("https://e-commerce-backend-fg1k.onrender.com/seller")

      .then((res) => setNotification(res.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);
  return <div>
    <h1>Your Request is Approved by admin</h1>
    <h2>You can now sell product</h2>
    <h3>For see your product. Visit here <Link></Link></h3>
  </div>;
};

export default Notification;
