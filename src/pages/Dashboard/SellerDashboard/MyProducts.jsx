import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";

const MyProducts = () => {
    const [products, setProducts] = useState([]);
    const { user } = useContext(AuthContext);
    const email = user?.email;
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [formData, setFormData] = useState({
        itemName: '',
        itemDescription: '',
        itemPrice: '',
        itemCategory: '',
        itemBrand: '',
        itemQuantity: '',
        itemSize: '',
        itemImage: ''
    });

    useEffect(() => {
        setLoading(true)
        fetch(`http://localhost:5000/sellerProducts/${email}`)
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(err => console.log(err))
            .finally(() => setLoading(false))
    }, [email])

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:5000/sellerProducts/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            const remaining = products.filter(product => product._id !== id);
                            setProducts(remaining);
                            Swal.fire(
                                'Deleted!',
                                'Your product has been deleted.',
                                'success'
                            );
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        Swal.fire(
                            'Error!',
                            'Something went wrong while deleting the product.',
                            'error'
                        );
                    });
            }
        });
    };

    const handleUpdateClick = (product) => {
        setSelectedProduct(product);
        setFormData({
            itemName: product.itemName,
            itemDescription: product.itemDescription,
            itemPrice: product.itemPrice,
            itemCategory: product.itemCategory,
            itemBrand: product.itemBrand,
            itemQuantity: product.itemQuantity,
            itemSize: product.itemSize,
            itemImage: product.itemImage
        });
        setIsModalOpen(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.patch(`http://localhost:5000/sellerProducts/${selectedProduct._id}`, formData)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    Swal.fire(
                        'Updated!',
                        'Your product has been updated.',
                        'success'
                    );
                    // Update the products list
                    const updatedProducts = products.map(product => 
                        product._id === selectedProduct._id ? { ...product, ...formData } : product
                    );
                    setProducts(updatedProducts);
                    setIsModalOpen(false);
                }
            })
            .catch(err => {
                console.log(err);
                Swal.fire(
                    'Error!',
                    'Something went wrong while updating the product.',
                    'error'
                );
            });
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen"><progress className="progress w-56"></progress></div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8">My Products</h1>
            
            {products.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-xl">No products found. Please add some products.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((product, index) => (
                        <div key={index} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                            <figure className="px-4 pt-4">
                                <img 
                                    src={product.itemImage || "https://via.placeholder.com/300"} 
                                    alt={product.itemName} 
                                    className="rounded-xl h-48 w-full object-cover"
                                   
                                />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">{product.itemName}</h2>
                                <p className="text-gray-600 line-clamp-2">{product.itemDescription}</p>
                                <div className="mt-2">
                                    <p><span className="font-semibold">Price:</span> ${product.itemPrice}</p>
                                    <p><span className="font-semibold">Category:</span> {product.itemCategory}</p>
                                    <p><span className="font-semibold">Brand:</span> {product.itemBrand}</p>
                                    <p><span className="font-semibold">Quantity:</span> {product.itemQuantity}</p>
                                    <p><span className="font-semibold">Size:</span> {product.itemSize}</p>
                                </div>
                                <div className="card-actions justify-end mt-4">
                                    <button 
                                        onClick={() => handleUpdateClick(product)} 
                                        className="btn btn-primary"
                                    >
                                        Update
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(product._id)} 
                                        className="btn btn-error"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Update Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold">Update Product</h3>
                            <button 
                                onClick={() => setIsModalOpen(false)} 
                                className="text-gray-500 hover:text-gray-700"
                            >
                                ✕
                            </button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Product Name</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="itemName"
                                        value={formData.itemName}
                                        onChange={handleInputChange}
                                        className="input input-bordered w-full"
                                        required
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Price</span>
                                    </label>
                                    <input
                                        type="number"
                                        name="itemPrice"
                                        value={formData.itemPrice}
                                        onChange={handleInputChange}
                                        className="input input-bordered w-full"
                                        required
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Category</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="itemCategory"
                                        value={formData.itemCategory}
                                        onChange={handleInputChange}
                                        className="input input-bordered w-full"
                                        required
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Brand</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="itemBrand"
                                        value={formData.itemBrand}
                                        onChange={handleInputChange}
                                        className="input input-bordered w-full"
                                        required
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Quantity</span>
                                    </label>
                                    <input
                                        type="number"
                                        name="itemQuantity"
                                        value={formData.itemQuantity}
                                        onChange={handleInputChange}
                                        className="input input-bordered w-full"
                                        required
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Size</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="itemSize"
                                        value={formData.itemSize}
                                        onChange={handleInputChange}
                                        className="input input-bordered w-full"
                                        required
                                    />
                                </div>
                                <div className="form-control md:col-span-2">
                                    <label className="label">
                                        <span className="label-text">Image URL</span>
                                    </label>
                                    <input
                                        type="url"
                                        name="itemImage"
                                        value={formData.itemImage}
                                        onChange={handleInputChange}
                                        className="input input-bordered w-full"
                                    />
                                </div>
                                <div className="form-control md:col-span-2">
                                    <label className="label">
                                        <span className="label-text">Description</span>
                                    </label>
                                    <textarea
                                        name="itemDescription"
                                        value={formData.itemDescription}
                                        onChange={handleInputChange}
                                        className="textarea textarea-bordered h-24"
                                        required
                                    ></textarea>
                                </div>
                            </div>
                            <div className="modal-action mt-6">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-ghost mr-2">
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    Update Product
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyProducts;