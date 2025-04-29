import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";

const WishList = () => {
  const { user } = useContext(AuthContext);
  const [wishListItems, setWishListItems] = useState([]);
  const [accessories, setAccessories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingAccessories, setLoadingAccessories] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:5000/wishList/${user.email}`)
        .then(res => res.json())
        .then(data => {
          setWishListItems(data);
          setLoading(false);
        })
        .catch(err => {
          console.log(err);
          setLoading(false);
          Swal.fire("Error", "Failed to load wishlist!", "error");
        });
    }
  }, [user?.email]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/ElectronicsAccessorie')
      .then(res => {
        setAccessories(res.data);
        setLoadingAccessories(false);
      })
      .catch(err => {
        console.log(err);
        setLoadingAccessories(false);
        Swal.fire("Error", "Failed to load accessories!", "error");
      });
  }, []);

  const wishIds = wishListItems.map(item => item.productId.toString());
  const matchingItems = accessories.filter(item => wishIds.includes(item._id));

  const handelAddToCart = (item) => {
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login to add items to your cart.",
      });
      return;
    }

    const cartItem = {
      productId: item._id,
      name: item.name,
      price: item.price,
      image: item.image,
      email: user.email,
    };

    axios
      .post("http://localhost:5000/cartItems", cartItem)
      .then((res) => {
        if (res.status === 201) {
          axios
            .delete(`http://localhost:5000/wishList/${user.email}/${item._id}`)
            .then(() => {
              setWishListItems((prev) =>
                prev.filter((wishItem) => wishItem.productId !== item._id)
              );
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Product added to cart and removed from wishlist!",
                showConfirmButton: false,
                timer: 1500,
              });
            })
            .catch((err) => {
              console.log(err);
              Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Failed to remove from wishlist!",
                showConfirmButton: false,
                timer: 1500,
              });
            });
        }
      })
      .catch((err) => {
        if (err.response?.status === 409) {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "This item is already in your cart!",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Failed to add to cart!",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  if (loading || loadingAccessories) {
    return <span className="loading loading-ring loading-lg"></span>;
  }

  return (
    <div className="flex justify-center items-center   p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {matchingItems.length > 0 ? (
          matchingItems.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl shadow-lg p-6 w-96 hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="overflow-hidden rounded-xl">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-52 object-cover transform hover:scale-110 transition-transform duration-300"
                />
              </div>
              <h2 className="text-xl font-bold mt-4">{item.name}</h2>

              <div className="mt-2 text-sm text-gray-700">
                <p>
                  <span className="font-semibold">Brand:</span> {item.brand}
                </p>
                <p>
                  <span className="font-semibold">Price:</span> ${item.price}
                  {item.originalPrice && (
                    <span className="line-through text-red-400 ml-2">
                      ${item.originalPrice}
                    </span>
                  )}
                </p>
                <p>
                  <span className="font-semibold">Discount:</span> {item.discount}%
                </p>
                <p>
                  <span className="font-semibold">Rating:</span> ⭐ {item.rating}
                </p>
                <p>
                  <span className="font-semibold">Stock:</span> {item.stock}
                </p>
                <p>
                  <span className="font-semibold">Colors:</span>{" "}
                  {item.colors?.join(", ")}
                </p>
                <p className="mt-2 font-semibold">Specifications:</p>
                <ul className="list-disc list-inside text-gray-600">
                  {item.specs?.map((spec, index) => (
                    <li key={index}>{spec}</li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => handelAddToCart(item)}
                className="mt-4 w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition duration-300"
              >
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <div className="col-span-full flex justify-center items-center text-3xl font-extrabold ">
          Your WishList is Empty.
        </div>
        )}
      </div>
    </div>
  );
};

export default WishList;
