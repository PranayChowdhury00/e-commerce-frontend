import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const CategoryProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);
    
    // Form state
    const [formData, setFormData] = useState({
        id: "",
        name: "",
        price: 0,
        discount: 0,
        description: "",
        image: "",
        category: "",
        subCategory: ""
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = () => {
        setLoading(true);
        axios.get("http://localhost:5000/categoryPage")
            .then((res) => {
                setProducts(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
                Swal.fire({
                    title: "Error!",
                    text: "Failed to fetch products",
                    icon: "error"
                });
            });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (isEditing) {
            // Update existing product
            axios.patch(`http://localhost:5000/categoryPage/${currentProduct._id}`, formData)
                .then(() => {
                    Swal.fire({
                        title: "Success!",
                        text: "Product updated successfully",
                        icon: "success"
                    });
                    fetchProducts();
                    resetForm();
                })
                .catch(err => {
                    console.log(err);
                    Swal.fire({
                        title: "Error!",
                        text: "Failed to update product",
                        icon: "error"
                    });
                });
        } else {
            // Add new product
            axios.post("http://localhost:5000/categoryPage", formData)
                .then(() => {
                    Swal.fire({
                        title: "Success!",
                        text: "Product added successfully",
                        icon: "success"
                    });
                    fetchProducts();
                    resetForm();
                })
                .catch(err => {
                    console.log(err);
                    Swal.fire({
                        title: "Error!",
                        text: "Failed to add product",
                        icon: "error"
                    });
                });
        }
    };

    const handleEdit = (product) => {
        setIsEditing(true);
        setCurrentProduct(product);
        setFormData({
            id: product.id,
            name: product.name,
            price: product.price,
            discount: product.discount,
            description: product.description,
            image: product.image,
            category: product.category,
            subCategory: product.subCategory
        });
    };

    const resetForm = () => {
        setFormData({
            id: "",
            name: "",
            price: 0,
            discount: 0,
            description: "",
            image: "",
            category: "",
            subCategory: ""
        });
        setIsEditing(false);
        setCurrentProduct(null);
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:5000/categoryPage/${id}`)
                    .then(() => {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Product has been deleted.",
                            icon: "success"
                        });
                        fetchProducts();
                    })
                    .catch(err => {
                        console.log(err);
                        Swal.fire({
                            title: "Error!",
                            text: "Failed to delete product",
                            icon: "error"
                        });
                    });
            }
        });
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Featured Products Management</h2>
            
            {/* Product Form */}
            <div className="bg-white p-6 rounded-lg shadow mb-6">
                <h3 className="text-xl font-semibold mb-4">
                    {isEditing ? "Edit Product" : "Add New Product"}
                </h3>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Product ID</span>
                            </label>
                            <input
                                type="text"
                                name="id"
                                value={formData.id}
                                onChange={handleInputChange}
                                className="input input-bordered"
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Product Name</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="input input-bordered"
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Price ($)</span>
                            </label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleInputChange}
                                className="input input-bordered"
                                required
                                min="0"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Discount (%)</span>
                            </label>
                            <input
                                type="number"
                                name="discount"
                                value={formData.discount}
                                onChange={handleInputChange}
                                className="input input-bordered"
                                min="0"
                                max="100"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Category</span>
                            </label>
                            <input
                                type="text"
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                className="input input-bordered"
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Sub Category</span>
                            </label>
                            <input
                                type="text"
                                name="subCategory"
                                value={formData.subCategory}
                                onChange={handleInputChange}
                                className="input input-bordered"
                            />
                        </div>
                        <div className="form-control md:col-span-2">
                            <label className="label">
                                <span className="label-text">Image URL</span>
                            </label>
                            <input
                                type="url"
                                name="image"
                                value={formData.image}
                                onChange={handleInputChange}
                                className="input input-bordered"
                                required
                            />
                        </div>
                        <div className="form-control md:col-span-2">
                            <label className="label">
                                <span className="label-text">Description</span>
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                className="textarea textarea-bordered h-24"
                                required
                            ></textarea>
                        </div>
                    </div>
                    <div className="flex justify-end gap-2 mt-4">
                        {isEditing && (
                            <button
                                type="button"
                                onClick={resetForm}
                                className="btn btn-ghost"
                            >
                                Cancel
                            </button>
                        )}
                        <button type="submit" className="btn btn-primary">
                            {isEditing ? "Update Product" : "Add Product"}
                        </button>
                    </div>
                </form>
            </div>

            {/* Products List */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Discount</th>
                                <th>Category</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="6" className="text-center py-8">
                                        <span className="loading loading-spinner loading-lg"></span>
                                    </td>
                                </tr>
                            ) : products.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="text-center py-8">
                                        No products found
                                    </td>
                                </tr>
                            ) : (
                                products.map(product => (
                                    <tr key={product._id}>
                                        <td>{product.id}</td>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img src={product.image} alt={product.name} />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{product.name}</div>
                                                    <div className="text-sm opacity-50 line-clamp-1">
                                                        {product.description}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>${product.price}</td>
                                        <td>{product.discount}%</td>
                                        <td>
                                            <div className="flex flex-col">
                                                <span>{product.category}</span>
                                                {product.subCategory && (
                                                    <span className="text-xs opacity-70">
                                                        {product.subCategory}
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleEdit(product)}
                                                    className="btn btn-ghost btn-xs"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(product._id)}
                                                    className="btn btn-ghost btn-xs text-error"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CategoryProducts;