// SellerRequest.jsx
import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import Swal from 'sweetalert2';

const SellerRequest = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSellers();
  }, []);

  const fetchSellers = async () => {
    try {
      const res = await axios.get('https://e-commerce-backend-fg1k.onrender.com/seller', { withCredentials: true });
      setSellers(res.data);
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch seller requests');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = (id, status) => {
    Swal.fire({
      title: `Are you sure you want to ${status} this request?`,
      text: `This action will ${status === 'approved' ? 'grant seller privileges' : 'reject the seller application'}.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: status === 'approved' ? '#3085d6' : '#d33',
      cancelButtonColor: '#6c757d',
      confirmButtonText: `Yes, ${status} it!`,
      cancelButtonText: 'Cancel',
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          Swal.fire({
            title: 'Processing...',
            allowOutsideClick: false,
            didOpen: () => Swal.showLoading(),
          });

          await axios.patch(`https://e-commerce-backend-fg1k.onrender.com/seller/${id}`, { status }, { withCredentials: true });

          Swal.fire({
            title: 'Success!',
            text: `Request has been ${status}`,
            icon: 'success',
            timer: 1500,
            showConfirmButton: false,
          });

          fetchSellers();
        } catch (error) {
          console.error(error);
          Swal.fire({
            title: 'Error!',
            text: 'Failed to update status',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
      }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">All Seller Requests</h1>

        {sellers.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No seller requests found</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sellers.map((seller) => (
              <div key={seller._id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">{seller.name}</h2>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      seller.status === 'approved' ? 'bg-green-100 text-green-800' :
                      seller.status === 'rejected' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {seller.status}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="text-gray-700">{seller.email}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="text-gray-700">{seller.phone}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">Address</p>
                      <p className="text-gray-700">{seller.address}</p>
                    </div>

                    <div className="border-t border-gray-200 pt-3 mt-3">
                      <h3 className="font-medium text-gray-800 mb-2">Product Details</h3>
                      <div className="flex items-center mb-3">
                        <img
                          src={seller.itemImage}
                          alt={seller.itemName}
                          className="w-16 h-16 object-cover rounded mr-3"
                          
                        />
                        <div>
                          <p className="font-medium">{seller.itemName}</p>
                          <p className="text-sm text-gray-600">${seller.itemPrice}</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700"><span className="font-medium">Category:</span> {seller.itemCategory}</p>
                      <p className="text-sm text-gray-700"><span className="font-medium">Brand:</span> {seller.itemBrand}</p>
                      <p className="text-sm text-gray-700"><span className="font-medium">Quantity:</span> {seller.itemQuantity}</p>
                      <p className="text-sm text-gray-700"><span className="font-medium">Size:</span> {seller.itemSize}</p>
                    </div>
                  </div>

                  {seller.status === 'pending' && (
                    <div className="flex space-x-3 mt-6 pt-4 border-t border-gray-200">
                      <button
                        onClick={() => handleStatusUpdate(seller._id, 'approved')}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition duration-200"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(seller._id, 'rejected')}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md transition duration-200"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerRequest;
