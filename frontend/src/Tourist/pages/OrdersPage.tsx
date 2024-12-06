import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import WalletComponent from '../Components/Wallet';

const OrdersPage = () => {
    const { touristId } = useParams<{ touristId: string }>();
    const [orders, setOrders] = useState<Order[]>([]); 

    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [cancelReason, setCancelReason] = useState<string>(''); // For storing the cancellation reason

    interface Order {
        _id: string;
        orderDate: string;
        status: string;
        totalPrice: number;
        deliveryDate?: string;
        items: { productId: { name: string }; quantity: number }[]; // More item details can be added as needed
    }

    // Fetch all orders
    const fetchOrders = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`/api/Tourist/viewAllOrders/${touristId}`);
            console.log('Orders API Response:', response.data); // Log the response
            setOrders(response.data.orders); // Access the orders array
            setError(null);
        } catch (err) {
            console.error(err);
            setError('Failed to fetch orders. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const fetchOrderDetails = async (orderId: string) => {
        try {
            setLoading(true);
            const response = await axios.get(`/api/Tourist/viewOrderDetails/${touristId}`, {
                params: { orderId } // Pass orderId as query parameter
            });
            setSelectedOrder(response.data.order); // Assuming `order` is returned as part of the response
            setError(null);
        } catch (err) {
            console.error(err);
            setError('Failed to fetch order details. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    // Cancel an order
    const cancelOrder = async (orderId: string, reason: string) => {
        if (!selectedOrder) {
            alert('No order selected for cancellation');
            return;
        }

        try {
            const response = await axios.put(`/api/Tourist/cancelOrder/${touristId}`, { orderId, reason });
            alert('Order successfully cancelled.');

            // Add the amount from the canceled order back to the wallet
            const orderTotal = selectedOrder.totalPrice; // Get the total price from the canceled order
            await axios.put(`/api/Tourist/updateWallet/${touristId}`, { amount: orderTotal });

            // Refresh the orders list
            fetchOrders();

            // Update the status of the canceled order
            if (selectedOrder._id === orderId) {
                setSelectedOrder({ ...selectedOrder, status: 'Cancelled' });
            }

            // Clear the cancel reason input
            setCancelReason('');
        } catch (err) {
            console.error(err);
            setError('Failed to cancel the order. Please try again later.');
        }
    };

    // Split the orders into current and past orders
    const splitOrders = (orders: Order[]) => {
        const currentOrders = orders.filter(order => order.status === 'Confirmed');
        const pastOrders = orders.filter(order => order.status === 'Delivered' || order.status === 'Cancelled');
        return { currentOrders, pastOrders };
    };

    useEffect(() => {
        fetchOrders();
    }, [touristId]);

    const { currentOrders, pastOrders } = splitOrders(orders);

    return (
        <div className="p-6 bg-gradient-to-r from-primary/25 to-secondary/20" style={{ margin: '-20px' }}>
            <h1 className="text-4xl p-3 font-bold mb-8 text-center text-black bg-lightGray shadow-md rounded-lg">
                My Orders
            </h1>

            {loading && <p className="text-center text-grayText">Loading orders...</p>}
            {error && <p className="text-red-500 text-center">{error}</p>}

            {/* Current Orders */}
            <div className="bg-cardBackground shadow-md rounded-lg p-6 mb-6">
                <h2 className="text-3xl font-semibold text-black mb-6">Current Orders</h2>
                {currentOrders.length === 0 ? (
                    <p className="text-grayText text-center">No current orders.</p>
                ) : (
                    <ul>
                        {currentOrders.map((order) => (
                            <li
                                key={order._id}
                                className="p-4 mb-4 border rounded-lg hover:shadow-md cursor-pointer transition"
                                onClick={() => fetchOrderDetails(order._id)}
                            >
                                <div className="flex justify-between">
                                    <span className="text-secondary font-bold">Order #{order._id}</span>
                                    <span className="text-grayText">{new Date(order.orderDate).toLocaleDateString()}</span>
                                </div>
                                <div className="text-grayText">Status: {order.status}</div>
                                <div className="text-grayText">Total: ${order.totalPrice.toFixed(2)}</div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Past Orders */}
            <div className="bg-cardBackground shadow-md rounded-lg p-6 mb-6">
                <h2 className="text-3xl font-semibold text-black mb-6">Past Orders</h2>
                {pastOrders.length === 0 ? (
                    <p className="text-grayText text-center">No past orders.</p>
                ) : (
                    <ul>
                        {pastOrders.map((order) => (
                            <li
                                key={order._id}
                                className="p-4 mb-4 border rounded-lg hover:shadow-md cursor-pointer transition"
                                onClick={() => fetchOrderDetails(order._id)}
                            >
                                <div className="flex justify-between">
                                    <span className="text-secondary font-bold">Order #{order._id}</span>
                                    <span className="text-grayText">{new Date(order.orderDate).toLocaleDateString()}</span>
                                </div>
                                <div className="text-grayText">Status: {order.status}</div>
                                <div className="text-grayText">Total: ${order.totalPrice.toFixed(2)}</div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Order Details */}
            {selectedOrder && (
                <div className="bg-cardBackground shadow-md rounded-lg p-6 mb-6">
                    <h2 className="text-3xl font-semibold text-black mb-6">Order Details</h2>
                    <p className="text-black font-semibold">Order ID: {selectedOrder._id}</p>
                    <p className="text-grayText">Status: {selectedOrder.status}</p>
                    <p className="text-grayText">
                        Order Date: {new Date(selectedOrder.orderDate).toLocaleDateString()}
                    </p>
                    <p className="text-grayText">
                        Delivery Date:{' '}
                        {selectedOrder.deliveryDate
                            ? new Date(selectedOrder.deliveryDate).toLocaleDateString()
                            : 'N/A'}
                    </p>
                    <p className="text-black font-semibold">Items:</p>
                    <ul className="mb-4">
                        {selectedOrder?.items.map((item: { productId: { name: string }; quantity: number }) => (
                            <li key={item.productId.name} className="text-grayText">
                                {item.productId.name} : {item.quantity} pcs
                            </li>
                        ))}
                    </ul>
                    <p className="text-grayText">Total Price: ${selectedOrder.totalPrice.toFixed(2)}</p>

                    {selectedOrder.status === 'Confirmed' && (
                        <div>
                            {/* Reason Input */}
                            <textarea
                                value={cancelReason}
                                onChange={(e) => setCancelReason(e.target.value)}
                                placeholder="Enter cancellation reason..."
                                className="w-full p-3 mt-4 border rounded-lg"
                            />
                            <button
                                onClick={() => cancelOrder(selectedOrder._id, cancelReason)}
                                className="w-full p-4 mt-4 bg-primary text-white rounded-lg hover:bg-hover transition"
                                disabled={!cancelReason.trim()}
                            >
                                Cancel Order
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default OrdersPage;
