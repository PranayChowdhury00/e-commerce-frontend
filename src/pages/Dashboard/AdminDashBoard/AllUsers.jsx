import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    setLoading(true);
    axios
      .get("https://e-commerce-backend-fg1k.onrender.com/users")
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        Swal.fire({
          title: "Error!",
          text: "Failed to fetch users",
          icon: "error",
        });
      });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://e-commerce-backend-fg1k.onrender.com/users/${id}`)
          .then(() => {
            Swal.fire("Deleted!", "User has been deleted.", "success");
            fetchUsers();
          })
          .catch((err) => {
            console.log(err);
            Swal.fire("Error!", "Failed to delete user", "error");
          });
      }
    });
  };

  const handleEdit = (id) => {
    const user = users.find((u) => u._id === id);
    setEditingUser(user);
    Swal.fire({
      title: `Change Role for ${user.name}`,
      input: "select",
      inputOptions: {
        user: "User",
        seller: "Seller",
        admin: "Admin",
      },
      inputPlaceholder: "Select a new role",
      inputValue: user.status || "user",
      showCancelButton: true,
      confirmButtonText: "Update",
      inputValidator: (value) => {
        if (!value) return "You need to choose a role!";
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedStatus = result.value;
        axios
          .patch(`https://e-commerce-backend-fg1k.onrender.com/users/${id}`, { status: updatedStatus })
          .then(() => {
            Swal.fire("Success", "User role updated!", "success");
            fetchUsers();
          })
          .catch(() => {
            Swal.fire("Error", "Failed to update role", "error");
          });
      }
    });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">User Management</h2>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : users.length === 0 ? (
        <div className="alert alert-info">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-current shrink-0 w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>No users found.</span>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>SL</th>
                  <th>User</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user, index) => (
                  <tr key={user._id}>
                    <th>{index + 1}</th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12 bg-gray-200">
                            {user.photoURL ? (
                              <img
                                src={user.photoURL}
                                alt={user.name}
                                className="object-cover"
                              />
                            ) : (
                              <div className="flex items-center justify-center h-full text-gray-500 font-bold">
                                {user.name.charAt(0).toUpperCase()}
                              </div>
                            )}
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{user.name}</div>
                          <div className="text-sm opacity-50">
                            ID: {user._id.slice(-6)}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="flex flex-col">
                        <span>{user.email}</span>
                        <span className="badge badge-ghost badge-sm mt-1">
                          Joined:{" "}
                          {user.createdAt
                            ? new Date(user.createdAt).toLocaleDateString()
                            : new Date().toLocaleDateString()}
                        </span>
                      </div>
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          user.status === "admin"
                            ? "badge-primary"
                            : "badge-secondary"
                        } badge-sm`}
                      >
                        {user.status || "user"}
                      </span>
                    </td>
                    <td>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(user._id)}
                          className="btn btn-ghost btn-xs"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(user._id)}
                          className="btn btn-ghost btn-xs text-error"
                          disabled={user.status === "admin"}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Optional Pagination Placeholder */}
          {users.length > 5 && (
            <div className="flex justify-center mt-6">
              <div className="btn-group">
                <button className="btn">«</button>
                <button className="btn btn-active">1</button>
                <button className="btn">2</button>
                <button className="btn">3</button>
                <button className="btn">4</button>
                <button className="btn">»</button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AllUsers;
