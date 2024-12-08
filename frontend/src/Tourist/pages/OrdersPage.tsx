import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import TouristNavbar from "../Components/TouristNavBar";
import { FaCalendar, FaDollarSign, FaBox } from 'react-icons/fa';

const OrdersPage = () => {
    const { touristId } = useParams<{ touristId: string }>();
    const [orders, setOrders] = useState<Order[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [cancelReason, setCancelReason] = useState<string>('');
    const [showCancelModal, setShowCancelModal] = useState<boolean>(false);

    interface Order {
        _id: string;
        orderDate: string;
        status: string;
        totalPrice: number;
        deliveryDate?: string;
        items: { productId: { name: string }; quantity: number }[];
    }

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

    const cancelOrder = async (orderId: string, reason: string) => {
        if (!selectedOrder) {
            alert('No order selected for cancellation');
            return;
        }

        try {
            await axios.put(`/api/Tourist/cancelOrder/${touristId}`, { orderId, reason });
            alert('Order successfully cancelled.');

            // Refresh the orders list
            fetchOrders();

            // Clear the cancel reason input and close the modal
            setCancelReason('');
            setShowCancelModal(false);
        } catch (err) {
            console.error(err);
            setError('Failed to cancel the order. Please try again later.');
        }
    };

    const splitOrders = (orders: Order[]) => {
        const currentOrders = orders.filter(order => order.status === 'Confirmed');
        const pastOrders = orders.filter(order => ['Delivered', 'Cancelled'].includes(order.status));
        return { currentOrders, pastOrders };
    };

    const { currentOrders, pastOrders } = splitOrders(orders);

    useEffect(() => {
        fetchOrders();
    }, [touristId]);

    return (
        <div className="min-h-screen bg-background p-8">
            <TouristNavbar id={touristId} />
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="bg-primary p-5 relative">
                        <div className="flex items-center space-x-4">
                            <div className="bg-white rounded-full p-2">
                                <FaDollarSign className="h-16 w-16 text-primary" />
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold text-white">My Orders</h2>
                                <p className="text-white opacity-75">View and manage your orders</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 space-y-12">
                        {/* Current Orders */}
                        <div>
                            <h3 className="text-2xl font-semibold text-black mb-4">Current Orders</h3>
                            <div className="space-y-4">
                                {currentOrders.map(order => (
                                    <div
                                        key={order._id}
                                        className="bg-cardBackground shadow-md rounded-lg p-4 hover:shadow-lg transition-transform duration-300 ease-in-out"
                                    >
                                        <h4 className="text-lg font-semibold text-secondary">Order #{order._id}</h4>
                                        <div className="grid grid-cols-2 gap-2 mt-2">
                                            <p className="flex items-center">
                                                <FaCalendar className="mr-2 text-primary" /> {new Date(order.orderDate).toLocaleDateString()}
                                            </p>
                                            <p className="flex items-center">
                                                <FaDollarSign className="mr-2 text-primary" /> ${order.totalPrice.toFixed(2)}
                                            </p>
                                        </div>
                                        <p className="text-grayText mt-2">
                                            Status: <span className="font-bold">{order.status}</span>
                                        </p>
                                        {order.deliveryDate && (
                                            <p className="text-grayText">
                                                Delivery Date: {new Date(order.deliveryDate).toLocaleDateString()}
                                            </p>
                                        )}
                                        <h5 className="text-md font-semibold mt-4">Items:</h5>
                                        <ul className="list-disc list-inside text-grayText">
                                            {order.items.map(item => (
                                                <li key={item.productId.name}>
                                                    {item.productId.name} (x{item.quantity})
                                                </li>
                                            ))}
                                        </ul>
                                        <button
                                            onClick={() => {
                                                setSelectedOrder(order);
                                                setShowCancelModal(true);
                                            }}
                                            className="mt-3 bg-red-600 text-white text-sm px-4 py-2 rounded-full hover:bg-red-700 transition duration-200 inline-block"
                      style={{ width: 'auto' }}
                      >
                                            Cancel Order
                                        </button>
                                    </div>
                                ))}
                                {currentOrders.length === 0 && <p className="text-gray-500 italic">No current orders.</p>}
                            </div>
                        </div>

                        {/* Past Orders */}
                        <div>
                            <h3 className="text-2xl font-semibold text-black mb-4">Past Orders</h3>
                            <div className="space-y-4">
                                {pastOrders.map(order => (
                                    <div
                                        key={order._id}
                                        className="bg-cardBackground shadow-md rounded-lg p-4 hover:shadow-lg transition-transform duration-300 ease-in-out"
                                    >
                                        <h4 className="text-lg font-semibold text-secondary">Order #{order._id}</h4>
                                        <div className="grid grid-cols-2 gap-2 mt-2">
                                            <p className="flex items-center">
                                                <FaCalendar className="mr-2 text-primary" /> {new Date(order.orderDate).toLocaleDateString()}
                                            </p>
                                            <p className="flex items-center">
                                                <FaDollarSign className="mr-2 text-primary" /> ${order.totalPrice.toFixed(2)}
                                            </p>
                                        </div>
                                        <p className="text-grayText mt-2">
                                            Status: <span className="font-bold">{order.status}</span>
                                        </p>
                                        {order.deliveryDate && (
                                            <p className="text-grayText">
                                                Delivery Date: {new Date(order.deliveryDate).toLocaleDateString()}
                                            </p>
                                        )}
                                        <h5 className="text-md font-semibold mt-4">Items:</h5>
                                        <ul className="list-disc list-inside text-grayText">
                                            {order.items.map(item => (
                                                <li key={item.productId.name}>
                                                    {item.productId.name} (x{item.quantity})
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                                {pastOrders.length === 0 && <p className="text-gray-500 italic">No past orders.</p>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Cancel Modal */}
            {showCancelModal && selectedOrder && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full">
                        <h3 className="text-xl font-semibold text-black mb-4">Cancel Order #{selectedOrder._id}</h3>
                        <textarea
                            value={cancelReason}
                            onChange={(e) => setCancelReason(e.target.value)}
                            placeholder="Enter cancellation reason..."
                            className="w-full p-3 border rounded-lg mb-4"
                        />
                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={() => setShowCancelModal(false)}
                                className="px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => cancelOrder(selectedOrder._id, cancelReason)}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                                disabled={!cancelReason.trim()}
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrdersPage;
