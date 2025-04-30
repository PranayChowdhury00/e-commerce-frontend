
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const FeaturedSellerDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`https://e-commerce-backend-fg1k.onrender.com/sellerProducts/${id}`)
      .then(res => {
        setProduct(res.data);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <img 
            src={product.itemImage} 
            alt={product.itemName}
            className="w-full rounded-lg shadow-lg"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.itemName}</h1>
          <p className="text-gray-600 mb-4">{product.itemBrand}</p>
          <p className="text-2xl font-bold text-primary mb-4">${product.itemPrice}</p>
          <p className="mb-6">{product.itemDescription}</p>
          <button className="bg-primary text-white px-6 py-2 rounded hover:bg-secondary transition">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedSellerDetails;