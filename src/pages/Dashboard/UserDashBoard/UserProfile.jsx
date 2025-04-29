import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../AuthProvider/AuthProvider';

const UserProfile = () => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editName, setEditName] = useState('');
    const [editPhotoURL, setEditPhotoURL] = useState('');

    const { user } = useContext(AuthContext);
    const email = user?.email;

    useEffect(() => {
        if (email) {
            setLoading(true);
            axios.get(`http://localhost:5000/users/${email}`)
                .then((response) => {
                    setData(response.data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error('There was an error!', error);
                    setLoading(false);
                });
        }
    }, [email]);

    if (loading) {
        return <span className="loading loading-spinner loading-xl text-center block mt-10"></span>;
    }

    const handleEditClick = () => {
        setEditName(data.name);
        setEditPhotoURL(data.photoURL);
        setIsModalOpen(true);
    };

    const handleUpdate = async () => {
        const updatedFields = {};

        if (editName && editName !== data.name) {
            updatedFields.name = editName;
        }

        if (editPhotoURL && editPhotoURL !== data.photoURL) {
            updatedFields.photoURL = editPhotoURL;
        }

        if (Object.keys(updatedFields).length === 0) {
            alert('No changes detected.');
            return;
        }

        try {
            await axios.patch(`http://localhost:5000/users/${email}`, updatedFields);
            // Refresh data
            const response = await axios.get(`http://localhost:5000/users/${email}`);
            setData(response.data);
            setIsModalOpen(false);
        } catch (error) {
            console.error('Update failed:', error);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">My Profile</h1>

            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 flex items-center space-x-6">
                <img 
                    src={data.photoURL} 
                    alt="User" 
                    className="w-24 h-24 rounded-full object-cover border-4 border-blue-500"
                />
                <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Name: {data.name}</h2>
                    <p className="text-gray-700 dark:text-gray-300 py-4">Email: {data.email}</p>
                    <button 
                        onClick={handleEditClick}
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Edit Profile
                    </button>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg p-8 w-96">
                        <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
                        <input 
                            type="text"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            placeholder="Enter new name"
                            className="w-full mb-4 p-2 border rounded"
                        />
                        <input 
                            type="text"
                            value={editPhotoURL}
                            onChange={(e) => setEditPhotoURL(e.target.value)}
                            placeholder="Enter new photo URL"
                            className="w-full mb-4 p-2 border rounded"
                        />
                        <div className="flex justify-end space-x-4">
                            <button 
                                onClick={() => setIsModalOpen(false)}
                                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={handleUpdate}
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserProfile;
