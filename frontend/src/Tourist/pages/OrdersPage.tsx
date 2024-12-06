import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FaCalendar, FaDollarSign, FaCheckCircle, FaTimesCircle, FaUser } from 'react-icons/fa';
import TouristNavbar from '../Components/TouristNavBar';

const OrdersPage = () => {
    const { touristId } = useParams<{ touristId: string }>();
    const [orders, setOrders] = useState<Order[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [cancelReason, setCancelReason] = useState<string>('');

    interface Order {
        _id: string;
        orderDate: string;
        status: string;
        totalPrice: number;
        deliveryDate?: string;
        items: { productId: { name: string }; quantity: number }[];
    }

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`/api/Tourist/viewAllOrders/${touristId}`);
                setOrders(response.data.orders);
                setError(null);
            } catch (err) {
                setError('Failed to fetch orders. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [touristId]);

    const cancelOrder = async (orderId: string) => {
        if (!cancelReason.trim()) {
            alert('Please provide a reason for cancellation.');
            return;
        }

        try {
            await axios.put(`/api/Tourist/cancelOrder/${touristId}`, { orderId, reason: cancelReason });
            alert('Order successfully cancelled.');
            setOrders((prev) =>
                prev.map((order) =>
                    order._id === orderId ? { ...order, status: 'Cancelled' } : order
                )
            );
            setCancelReason('');
        } catch (err) {
            setError('Failed to cancel the order. Please try again later.');
        }
    };

    const splitOrders = (orders: Order[]) => {
        const currentOrders = orders.filter(order => order.status === 'Confirmed');
        const pastOrders = orders.filter(order => order.status !== 'Confirmed');
        return { currentOrders, pastOrders };
    };

    const { currentOrders, pastOrders } = splitOrders(orders);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-background">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background p-8" style={{ margin: "-20px" }}>
            <TouristNavbar id={touristId} />

            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <p>hello</p>
                    <div className="bg-primary p-5 relative">
                        <div className="flex items-center space-x-4">
                            <div className="bg-white rounded-full p-2">
                                <FaUser className="h-16 w-16 text-primary" />
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold text-white">My Orders</h2>
                                <p className="text-white opacity-75">
                                    Manage your Orders
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="p-6 space-y-12">
                        {/* Current Orders */}
                        <div>
                            <h3 className="text-2xl font-semibold text-black mb-4">
                                Current Orders
                            </h3>
                            <div className="space-y-4">
                                {currentOrders.map((order) => (
                                    <div key={order._id} 
                                    className="bg-cardBackground shadow-md rounded-lg p-4 hover:shadow-lg transition-transform duration-300 ease-in-out"
                                    >
                                        <div className="flex justify-between">
                                            <p className="text-lg font-semibold">
                                                <FaCalendar className="inline-block text-primary mr-2" />
                                                {new Date(order.orderDate).toLocaleDateString()}
                                            </p>
                                            <p className="flex items-center">
                                            <FaDollarSign className="mr-2 text-primary" />
                                                {order.totalPrice.toFixed(2)}</p>
                                        </div>
                                        <p className="text-grayText">Status: {order.status}</p>
                                        <button
                                            onClick={() => cancelOrder(order._id)}
                                            className="mt-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                                        >
                                            Cancel Order
                                        </button>
                                    </div>
                                ))}
                                {currentOrders.length === 0 && (
                                    <p className="text-gray-500 italic">No current orders.</p>
                                )}

                            </div>
                        </div>

                        {/* Past Orders */}
                        <div className="bg-white shadow-md rounded-lg p-6">
                            <h2 className="text-2xl font-semibold text-primary">Past Orders</h2>
                            {pastOrders.length > 0 ? (
                                pastOrders.map((order) => (
                                    <div key={order._id} className="p-4 mb-4 bg-lightGray rounded-lg shadow-sm">
                                        <div className="flex justify-between">
                                            <p className="text-lg font-semibold">
                                                <FaCalendar className="inline-block text-primary mr-2" />
                                                {new Date(order.orderDate).toLocaleDateString()}
                                            </p>
                                            <p className="text-secondary font-bold">Total: ${order.totalPrice.toFixed(2)}</p>
                                        </div>
                                        <p className="text-grayText">
                                            Status:{' '}
                                            {order.status === 'Cancelled' ? (
                                                <FaTimesCircle className="inline-block text-red-500" />
                                            ) : (
                                                <FaCheckCircle className="inline-block text-green-500" />
                                            )}
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 italic">No past orders.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrdersPage;
