import React, { useState, useContext } from 'react';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import axios from 'axios';
import Swal from 'sweetalert2';
const DeliveryAddresses = () => {
    const { user } = useContext(AuthContext);
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [currentAddress, setCurrentAddress] = useState(null);
    const [showMap, setShowMap] = useState(false);
    const [mapCoords, setMapCoords] = useState({ lat: null, lng: null });

    // Form state
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        postalCode: '',
        country: 'Bangladesh',
        isDefault: false,
        location: { type: 'Point', coordinates: [] }
    });

    // Fetch existing addresses
    React.useEffect(() => {
        if (user?.email) {
            axios.get(`http://localhost:5000/addresses/${user.email}`)
                .then(res => {
                    setAddresses(res.data);
                    setLoading(false);
                })
                .catch(err => {
                    setError('Failed to load addresses');
                    setLoading(false);
                });
        }
    }, [user?.email]);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    // Get user's current location
    const getCurrentLocation = () => {
        if (navigator.geolocation) {
            setShowMap(true);
            navigator.geolocation.getCurrentPosition(
                (position) => {
                  const { latitude, longitude } = position.coords;
                  setMapCoords({ lat: latitude, lng: longitude });
                  setFormData(prev => ({
                    ...prev,
                    location: {
                      type: 'Point',
                      coordinates: [longitude, latitude]
                    }
                  }));
                  Swal.fire(
                    'Location found!',
                    'Your location has been shared.',
                    'success'
                  );
                },
                (err) => {
                  Swal.fire(
                    'Error!',
                    'Unable to retrieve your location: ' + err.message,
                    'error'
                  );
                }
              )
        } else {
            setError('Geolocation is not supported by your browser');
        }
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        const addressData = {
            ...formData,
            email: user.email,
            userId: user.uid
        };

        const request = isEditing && currentAddress
            ? axios.put(`http://localhost:5000/addresses/${currentAddress._id}`, addressData)
            : axios.post('http://localhost:5000/addresses', addressData);

            request.then(res => {
                if (isEditing) {
                  setAddresses(addresses.map(addr => 
                    addr._id === currentAddress._id ? res.data : addr
                  ));
                  Swal.fire(
                    'Updated!',
                    'Your address has been updated.',
                    'success'
                  );
                } else {
                  setAddresses([...addresses, res.data]);
                  Swal.fire(
                    'Saved!',
                    'Your new address has been saved.',
                    'success'
                  );
                }
                resetForm();
              })
              .catch(err => {
                Swal.fire(
                  'Error!',
                  'Failed to save address: ' + err.message,
                  'error'
                );
              })
              .finally(() => setLoading(false));
    };

    // Edit an existing address
    const handleEdit = (address) => {
        setCurrentAddress(address);
        setIsEditing(true);
        setFormData({
            name: address.name,
            phone: address.phone,
            addressLine1: address.addressLine1,
            addressLine2: address.addressLine2,
            city: address.city,
            state: address.state,
            postalCode: address.postalCode,
            country: address.country,
            isDefault: address.isDefault,
            location: address.location
        });
        if (address.location?.coordinates?.length === 2) {
            setMapCoords({
                lat: address.location.coordinates[1],
                lng: address.location.coordinates[0]
            });
            setShowMap(true);
        }
    };

    // Delete an address
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
                setLoading(true);
                // Save the current addresses in case we need to revert
                const previousAddresses = [...addresses];
                
                // Optimistically update the UI
                setAddresses(previousAddresses.filter(addr => addr._id !== id));
                
                axios.delete(`http://localhost:5000/addresses/${id}`)
                    .then(() => {
                        Swal.fire(
                            'Deleted!',
                            'Your address has been deleted.',
                            'success'
                        );
                    })
                    .catch(err => {
                        // Revert the UI change on error
                        setAddresses(previousAddresses);
                        
                        Swal.fire(
                            'Error!',
                            'Failed to delete address: ' + (err.response?.data?.message || err.message),
                            'error'
                        );
                    })
                    .finally(() => setLoading(false));
            }
        });
    };

    // Reset form to initial state
    const resetForm = () => {
        setFormData({
            name: '',
            phone: '',
            addressLine1: '',
            addressLine2: '',
            city: '',
            state: '',
            postalCode: '',
            country: 'Bangladesh',
            isDefault: false,
            location: { type: 'Point', coordinates: [] }
        });
        setCurrentAddress(null);
        setIsEditing(false);
        setShowMap(false);
        setMapCoords({ lat: null, lng: null });
    };

    if (loading && addresses.length === 0) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-ring loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        Delivery Addresses
                    </h1>
                    <p className="mt-3 text-xl text-gray-500">
                        Manage your shipping addresses
                    </p>
                </div>

                {error && (
                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
                        <p>{error}</p>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Address Form */}
                    <div className="bg-white shadow rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4">
                            {isEditing ? 'Edit Address' : 'Add New Address'}
                        </h2>
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Address Line 1</label>
                                    <input
                                        type="text"
                                        name="addressLine1"
                                        value={formData.addressLine1}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Address Line 2 (Optional)</label>
                                    <input
                                        type="text"
                                        name="addressLine2"
                                        value={formData.addressLine2}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">City</label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleChange}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">State/Division</label>
                                        <input
                                            type="text"
                                            name="state"
                                            value={formData.state}
                                            onChange={handleChange}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Postal Code</label>
                                        <input
                                            type="text"
                                            name="postalCode"
                                            value={formData.postalCode}
                                            onChange={handleChange}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Country</label>
                                        <select
                                            name="country"
                                            value={formData.country}
                                            onChange={handleChange}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        >
                                            <option value="Bangladesh">Bangladesh</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        name="isDefault"
                                        checked={formData.isDefault}
                                        onChange={handleChange}
                                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                    />
                                    <label className="ml-2 block text-sm text-gray-700">
                                        Set as default address
                                    </label>
                                </div>

                                <div>
                                    <button
                                        type="button"
                                        onClick={getCurrentLocation}
                                        className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                        </svg>
                                        Share My Location
                                    </button>
                                    {formData.location.coordinates.length > 0 && (
                                        <p className="mt-2 text-sm text-green-600">
                                            Location shared! (Lat: {formData.location.coordinates[1]}, Lng: {formData.location.coordinates[0]})
                                        </p>
                                    )}
                                </div>

                                {showMap && mapCoords.lat && (
                                    <div className="h-64 bg-gray-200 rounded-md overflow-hidden">
                                        <iframe
                                            width="100%"
                                            height="100%"
                                            frameBorder="0"
                                            scrolling="no"
                                            marginHeight="0"
                                            marginWidth="0"
                                            src={`https://maps.google.com/maps?q=${mapCoords.lat},${mapCoords.lng}&z=15&output=embed`}
                                            title="Location Map"
                                        ></iframe>
                                    </div>
                                )}

                                <div className="flex space-x-4 pt-4">
                                    <button
                                        type="submit"
                                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <span className="loading loading-spinner loading-sm"></span>
                                        ) : isEditing ? (
                                            'Update Address'
                                        ) : (
                                            'Save Address'
                                        )}
                                    </button>
                                    {isEditing && (
                                        <button
                                            type="button"
                                            onClick={resetForm}
                                            className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            Cancel
                                        </button>
                                    )}
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Address List */}
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Your Addresses</h2>
                        {addresses.length === 0 ? (
                            <div className="bg-white shadow rounded-lg p-6 text-center">
                                <svg
                                    className="mx-auto h-12 w-12 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                </svg>
                                <h3 className="mt-2 text-lg font-medium text-gray-900">No addresses saved</h3>
                                <p className="mt-1 text-gray-500">Add your first address to get started.</p>
                            </div>
                        ) : (
                            <ul className="space-y-4">
                                {addresses.map((address) => (
                                    <li key={address._id} className="bg-white shadow rounded-lg overflow-hidden">
                                        <div className="p-6">
                                            <div className="flex justify-between">
                                                <h3 className="text-lg font-medium text-gray-900">
                                                    {address.name}
                                                    {address.isDefault && (
                                                        <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                            Default
                                                        </span>
                                                    )}
                                                </h3>
                                                <div className="flex space-x-2">
                                                    <button
                                                        onClick={() => handleEdit(address)}
                                                        className="text-indigo-600 hover:text-indigo-900"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(address._id)}
                                                        className="text-red-600 hover:text-red-900"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                            <p className="mt-1 text-gray-600">{address.phone}</p>
                                            <p className="mt-1 text-gray-600">{address.addressLine1}</p>
                                            {address.addressLine2 && (
                                                <p className="text-gray-600">{address.addressLine2}</p>
                                            )}
                                            <p className="text-gray-600">
                                                {address.city}, {address.state}, {address.postalCode}
                                            </p>
                                            <p className="text-gray-600">{address.country}</p>
                                            {address.location?.coordinates?.length === 2 && (
                                                <div className="mt-2">
                                                    <span className="inline-flex items-center text-sm text-gray-500">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                                        </svg>
                                                        Location shared
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeliveryAddresses;