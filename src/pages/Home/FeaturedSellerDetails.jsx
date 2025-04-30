import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { AuthContext } from '../AuthProvider/AuthProvider';

const FeaturedSellerDetails = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [loading, setLoading] = useState(true);
const{user}=useContext(AuthContext);
  useEffect(() => {
    axios.get(`https://e-commerce-backend-fg1k.onrender.com/sellerProducts`)
      .then(res => {
        setProducts(res.data);
        // Find the product with matching ID
        const foundProduct = res.data.find(item => item._id === id);
        setCurrentProduct(foundProduct);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);
console.log("products",currentProduct)
  const handleAddToCart = () => {
    if (!user?.email) {
      return Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login to add items to your cart.",
      });
    }

    const cartItem = {
      productId: currentProduct._id,
      image: currentProduct.itemImage,
      name: currentProduct.itemName,
      price: currentProduct.itemPrice,
      email: user.email,
    };

    axios
      .post("https://e-commerce-backend-fg1k.onrender.com/cartItems", cartItem)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Added to cart",
          text: `${currentProduct.itemName} has been added to your cart.`,
          timer: 2000,
          showConfirmButton: false,
        });
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: "Something went wrong while adding to cart.",
          timer: 2000,
          showConfirmButton: false,
        });
      });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!currentProduct) {
    return <div className="container mx-auto py-8 px-4">Product not found</div>;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <img 
            src={currentProduct.itemImage} 
            alt={currentProduct.itemName}
            className="w-[500px] rounded-lg shadow-lg"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-2">{currentProduct.itemName}</h1>
          <p className="text-gray-600 mb-4">{currentProduct.itemBrand}</p>
          <p className="text-2xl font-bold text-primary mb-4">${currentProduct.itemPrice}</p>
          <p className="mb-6">{currentProduct.itemDescription}</p>
          
          <button onClick={handleAddToCart} className="bg-primary text-white px-6 py-2 rounded hover:bg-secondary transition">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedSellerDetails;