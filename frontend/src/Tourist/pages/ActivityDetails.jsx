import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, Clock, Calendar, DollarSign, Tag, AlertCircle, Star, Users, Percent } from 'lucide-react';
import axios from 'axios';

const ActivityDetails = () => {
    const { activityId, id } = useParams();
    const [activity, setActivity] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [bookingMessage, setBookingMessage] = useState(null);

    useEffect(() => {
        const fetchActivity = async () => {
            try {
                const response = await fetch(`/api/Activities/getActivityById/${activityId}`);
                if (!response.ok) {
                    throw new Error('Activity not found');
                }
                const data = await response.json();
                setActivity(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchActivity();
    }, [activityId]);

    const handleBooking = async (e) => {
        e.preventDefault();
        if (!activity.bookingOpen) {
            setBookingMessage("Sorry, this activity is not available for booking at the moment.");
            return;
        }
        try {
            const response = await fetch('/api/TouristItinerary/createActivityBooking', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    activity: activityId,
                    tourist: id, // Replace with actual user ID
                    chosenDate: activity.Date,
                }),
            });
            const response2 = await axios.put(`/api/Tourist/updateLoyaltyPoints/${id}`, {
                amountPaid: activity.Price
              });
            if (!response.ok) {
                throw new Error('Failed to book activity');
            }
            alert(`You have successfully booked your Itinerary! \nLoyalty Points: ${response2.data.loyaltyPoints}\nBadge: ${response2.data.badge}`);

            setBookingMessage('Activity booked successfully!');
        } catch (error) {
            console.error('Error booking activity:', error);
            setBookingMessage('Failed to book activity. Please try again.');
        }
    };

    const handleShareLink = () => {
        const activityUrl = `${window.location.origin}/TouristActivityDetails/${activityId}/${id}`;
        navigator.clipboard.writeText(activityUrl)
          .then(() => alert('Activity link copied to clipboard!'))
          .catch(err => alert('Failed to copy link: ' + err));
      };
    
      const handleShareEmail = () => {
        const activityUrl = `${window.location.origin}/TouristActivityDetails/${activityId}/${id}`;
        const subject = encodeURIComponent('Check out this activity!');
        const body = encodeURIComponent(`I thought you might be interested in this activity: ${activityUrl}`);
        window.location.href = `mailto:?subject=${subject}&body=${body}`;
      };

    if (loading) return (
        <div className="flex items-center justify-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    );

    if (error) return <div className="text-red-500 text-center text-xl mt-10">Error: {error}</div>;

    if (!activity) return null;

    return (
        <div className="container mx-auto p-6 bg-white shadow-2xl rounded-lg mt-10 max-w-4xl">
            <h2 className="text-4xl font-bold text-gray-800 mb-6 border-b pb-4">{activity.Name}</h2>

            <div className="flex items-center text-gray-600 mb-8">
                <MapPin className="mr-2" size={24} />
                <span className="text-lg">{`${activity.Location.coordinates[1]}, ${activity.Location.coordinates[0]}`}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                    <h3 className="text-2xl font-semibold text-gray-700 mb-4 flex items-center">
                        <Calendar className="mr-2" size={24} /> Date and Time
                    </h3>
                    <p className="text-gray-600 mb-2">Date: {new Date(activity.Date).toLocaleDateString()}</p>
                    <p className="text-gray-600">Time: {activity.Time}</p>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                    <h3 className="text-2xl font-semibold text-gray-700 mb-4 flex items-center">
                        <Tag className="mr-2" size={24} /> Category and Tags
                    </h3>
                    <p className="text-gray-600 mb-2">Category: {activity.Category ? activity.Category.name : 'N/A'}</p>
                    <div className="flex flex-wrap gap-2">
                        {activity.tags.map((tag, index) => (
                            <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                                {tag.name}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 bg-gray-100 p-6 rounded-lg shadow-inner">
                <div>

                    <p className="text-gray-600 text-2xl font-bold">Price: ${activity.Price}</p>
                    {/* {activity.priceRange && (
                        <p className="text-sm text-gray-500">Range: ${activity.priceRange[0]} - ${activity.priceRange[1]}</p>
                    )} */}
                </div>

                <div>  <h3 className="text-xl font-semibold text-gray-700 mb-2 flex items-center">
                    __________________
                </h3>

                    <p className="text-gray-600 text-2xl font-bold">Discount: {activity.Discount}%</p>
                </div>

                <div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2 flex items-center">
                        ------------------------------
                    </h3>
                    <p className="text-gray-600 text-2xl font-bold">Rating: {activity.Rating ? `${activity.Rating}/5` : 'N/A'}  <Star className="mr-2" size={20} /> </p>
                </div>
            </div>

            <form onSubmit={handleBooking} className="bg-gray-50 p-6 rounded-lg shadow-md mb-12">
                <h3 className="text-2xl font-semibold text-gray-700 mb-6">Book This Activity</h3>
                <button
                    type="submit"
                    className="w-full px-6 py-3 rounded-lg text-white font-semibold transition duration-300 bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                    Book Activity
                </button>

                {bookingMessage && (
                    <div className={`mt-4 p-4 rounded-lg ${bookingMessage.includes('successfully') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        <p className="flex items-center">
                            <AlertCircle className="mr-2" size={20} />
                            {bookingMessage}
                        </p>
                    </div>
                )}
            </form>

            <div className="flex items-center justify-between bg-blue-50 p-6 rounded-lg shadow-md">
                <div className="flex items-center">
                    <Users className="mr-2" size={24} />
                    <h3 className="text-2xl font-semibold text-gray-700">Bookings Available</h3>
                </div>
                <span className={`px-4 py-2 rounded-full text-lg font-semibold ${activity.bookingOpen ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                    {activity.bookingOpen ? 'Yes' : 'No'}
                </span>
            </div>
            {/* Share Buttons */}
            <div className="share-buttons mt-6">
                <button onClick={handleShareLink} className="share-button mr-4">Copy Link</button>
                <button onClick={handleShareEmail} className="share-button">Share via Email</button>
            </div>
        </div>
    );
};

export default ActivityDetails;