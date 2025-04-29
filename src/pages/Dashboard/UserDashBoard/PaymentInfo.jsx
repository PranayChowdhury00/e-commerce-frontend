import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import axios from "axios";

const PaymentInfo = () => {
    const { user } = useContext(AuthContext);
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        if (user?.email) {
            setLoading(true);
            axios
                .get(`https://e-commerce-backend-fg1k.onrender.com/payment/${user.email}`)
                .then((res) => {
                    setPayments(res.data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error(err.message);
                    setLoading(false);
                });
        }
    }, [user?.email]);

    if (loading) {
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
                        Your Payment History
                    </h1>
                    <p className="mt-3 text-xl text-gray-500">
                        View all your past transactions
                    </p>
                </div>

                {payments.length === 0 ? (
                    <div className="text-center py-12">
                        <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <h3 className="mt-2 text-lg font-medium text-gray-900">
                            No payments found
                        </h3>
                        <p className="mt-1 text-gray-500">
                            You haven't made any payments yet.
                        </p>
                    </div>
                ) : (
                    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                        <ul className="divide-y divide-gray-200">
                            {payments.map((payment) => (
                                <li key={payment._id} className="p-6">
                                    <div className="flex flex-col sm:flex-row sm:items-center">
                                        <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-6">
                                            <img
                                                className="h-20 w-20 rounded-md object-cover"
                                                src={payment.productImage}
                                                alt={payment.productName}
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between">
                                                <h3 className="text-lg font-medium text-gray-900">
                                                    {payment.productName}
                                                </h3>
                                                <p className="ml-4 text-lg font-semibold text-indigo-600">
                                                    ${payment.productPrice}
                                                </p>
                                            </div>
                                            <div className="mt-2 flex flex-col sm:flex-row sm:flex-wrap sm:space-x-6">
                                                <div className="flex items-center text-sm text-gray-500">
                                                    <svg
                                                        className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                        aria-hidden="true"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                    {new Date(payment.createdAt).toLocaleDateString()}
                                                </div>
                                                <div className="flex items-center text-sm text-gray-500 mt-2 sm:mt-0">
                                                    <svg
                                                        className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                        aria-hidden="true"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                    Payment ID: {payment.paymentId}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                            <svg
                                                className="-ml-0.5 mr-1.5 h-2 w-2 text-green-400"
                                                fill="currentColor"
                                                viewBox="0 0 8 8"
                                            >
                                                <circle cx={4} cy={4} r={3} />
                                            </svg>
                                            Paid
                                        </span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PaymentInfo;