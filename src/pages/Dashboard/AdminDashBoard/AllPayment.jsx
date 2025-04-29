import axios from "axios";
import { useEffect, useState } from "react";

const AllPayment = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        setLoading(true);
        axios
            .get("https://e-commerce-backend-fg1k.onrender.com/allPayment")
            .then((res) => {
                setPayments(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err.message);
                setLoading(false);
            });
    }, []);
    
    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-ring loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-center">Payment Records</h1>
            
            {payments.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-xl">No payment records found</p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white rounded-lg overflow-hidden">
                        <thead className="bg-gray-800 text-white">
                            <tr>
                                <th className="py-3 px-4 text-left">Payment ID</th>
                                <th className="py-3 px-4 text-left">Customer Email</th>
                                <th className="py-3 px-4 text-left">Product</th>
                                <th className="py-3 px-4 text-left">Image</th>
                                <th className="py-3 px-4 text-right">Amount</th>
                                <th className="py-3 px-4 text-right">Price</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {payments.map((payment, index) => (
                                <tr key={payment._id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                    <td className="py-4 px-4 font-mono text-sm">
                                        {payment.paymentId.substring(0, 8)}...
                                    </td>
                                    <td className="py-4 px-4">{payment.email}</td>
                                    <td className="py-4 px-4 font-medium">{payment.productName}</td>
                                    <td className="py-4 px-4">
                                        <img 
                                            src={payment.productImage} 
                                            alt={payment.productName} 
                                            className="w-16 h-16 object-cover rounded"
                                            onError={(e) => {
                                                e.target.src = 'https://via.placeholder.com/100?text=No+Image';
                                            }}
                                        />
                                    </td>
                                    <td className="py-4 px-4 text-right font-mono">
                                        ${(payment.amount / 100).toFixed(2)}
                                    </td>
                                    <td className="py-4 px-4 text-right font-mono">
                                        ${payment.productPrice.toFixed(2)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                    <div className="mt-6 text-right">
                        <p className="text-lg font-semibold">
                            Total Payments: {payments.length} | 
                            Total Amount: ${(payments.reduce((sum, payment) => sum + (payment.amount / 100), 0)).toFixed(2)}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllPayment;