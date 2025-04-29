import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import Swal from 'sweetalert2';
const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      setLoading(true);
      axios
        .get(`/payment/${user.email}`)
        .then((res) => {
          setOrders(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err.message);
          setLoading(false);
        });
    }
  }, [user?.email]);

  if (loading) {
    return <span className="loading loading-ring loading-lg"></span>;
  }
  

  const handelCancelBtn = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, cancel it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`https://e-commerce-backend-fg1k.onrender.com/save-payment/${id}`)
          .then(res => {
            if (res.data.deletedCount > 0) {
              Swal.fire(
                'Cancelled!',
                'Your order has been cancelled.',
                'success'
              );
            }
          })
          .catch(err => {
            console.error(err.message);
            Swal.fire(
              'Error!',
              'Something went wrong.',
              'error'
            );
          });
      }
    });
  };
  
  return (
    <div className="overflow-x-auto">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>
      {orders.length === 0 ? (
        <div className="flex justify-center items-center h-40">
          <p className="text-xl font-semibold text-gray-500">Your WishList is Empty.</p>
        </div>
      ) : (
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                sl
              </th>
              <th>Product</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order,index) => (
              <tr key={order._id}>
                 <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={order.productImage}
                          alt={order.productName}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{order.productName}</div>
                      <div className="text-sm opacity-50">{order._id}</div>
                    </div>
                  </div>
                </td>
                <td>${order.productPrice}</td>
                <th>
                  <button onClick={()=>handelCancelBtn(order._id)} className="btn btn-error btn-xs">Cancel</button>
                </th>
              </tr>
            ))}
          </tbody>

          {/* foot */}
          <tfoot>
            <tr>
              <th></th>
              <th>Product</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </tfoot>
        </table>
      )}
    </div>
  );
};

export default MyOrders;
