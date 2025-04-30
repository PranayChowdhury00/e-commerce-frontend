import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const FeaturedSellerDetails = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [loading, setLoading] = useState(true);

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
          
          <button className="bg-primary text-white px-6 py-2 rounded hover:bg-secondary transition">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedSellerDetails;