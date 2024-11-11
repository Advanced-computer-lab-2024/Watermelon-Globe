import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Star, MapPin, Clock, Calendar, DollarSign, Languages, Accessibility, Truck, Users } from 'lucide-react';
import { FaStar } from 'react-icons/fa';


const ItineraryDetails = () => {
    const { id } = useParams();
    const [itinerary, setItinerary] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [rating, setRating] = useState(0);

    const fetchItinerary = async () => {
        try {
            const response = await fetch(`/api/Itinerary/getItinerary/${id}`);
            if (!response.ok) {
                throw new Error('Itinerary not found');
            }
            const data = await response.json();
            setItinerary(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchItinerary();
    }, [id]);

    const handleRate = async () => {
        try {
            const response = await fetch(`/api/Tourist/updateRating/${id}?rating=${rating}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Failed to submit rating');
            }
            alert('Rating submitted successfully!');
            fetchItinerary();
        } catch (error) {
            console.error('Error submitting rating:', error);
            alert('Failed to submit rating. Please try again.');
        }
    };

    // Share itinerary functionality
    const handleShareLink = () => {
        const itineraryUrl = `${window.location.origin}/ItineraryDetails/${id}`;
        navigator.clipboard.writeText(itineraryUrl)
            .then(() => alert('Itinerary link copied to clipboard!'))
            .catch(err => alert('Failed to copy link: ' + err));
    };

    const handleShareEmail = () => {
        const itineraryUrl = `${window.location.origin}/ItineraryDetails/${id}`;
        const subject = encodeURIComponent('Check out this itinerary!');
        const body = encodeURIComponent(`I thought you might be interested in this itinerary: ${itineraryUrl}`);
        window.location.href = `mailto:?subject=${subject}&body=${body}`;
    };

    if (loading) return (
        <div className="flex items-center justify-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    );
    if (error) return <div className="text-red-500 text-center text-xl mt-10">Error: {error}</div>;

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">{itinerary.name}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
                        <Clock className="mr-2" size={20} /> Activities
                    </h3>
                    <ul className="list-disc pl-5 space-y-2">
                        {itinerary.activities.map((activity) => (
                            <li key={activity.activityName} className="text-gray-600">
                                {activity.activityName} - {activity.duration}
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
                        <MapPin className="mr-2" size={20} /> Locations
                    </h3>
                    <p className="text-gray-600">{itinerary.locations.join(', ')}</p>
                </div>
            </div>

            <div className="bg-gray-100 p-4 rounded-lg mb-8">
                <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
                    <Calendar className="mr-2" size={20} /> Timeline
                </h3>
                <p className="text-gray-600">{itinerary.timeline}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2 flex items-center">
                        <Languages className="mr-2" size={18} /> Language of Tour
                    </h3>
                    <p className="text-gray-600">{itinerary.languageOfTour}</p>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2 flex items-center">
                        <DollarSign className="mr-2" size={18} /> Price
                    </h3>
                    <p className="text-gray-600">${itinerary.priceOfTour}</p>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2 flex items-center">
                        <Accessibility className="mr-2" size={18} /> Accessibility
                    </h3>
                    <p className="text-gray-600">{itinerary.accessibility ? 'Yes' : 'No'}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
                        <Calendar className="mr-2" size={20} /> Available Dates
                    </h3>
                    <ul className="space-y-2">
                        {itinerary.availableDates.map((date) => (
                            <li key={date} className="text-gray-600">
                                {new Date(date).toLocaleDateString()}
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
                        <Clock className="mr-2" size={20} /> Available Times
                    </h3>
                    <ul className="space-y-2">
                        {itinerary.availableTimes.map((time) => (
                            <li key={time} className="text-gray-600">{time}</li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="bg-gray-100 p-4 rounded-lg mb-8">
                <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
                    <Truck className="mr-2" size={20} /> Pickup/Drop-off Locations
                </h3>
                <ul className="space-y-2">
                    {itinerary.pickupDropoffLocations.map((location, index) => (
                        <li key={index} className="text-gray-600">
                            Pickup: {location.pickup}, Drop-off: {location.dropoff}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="flex items-center justify-between mb-8">
                <div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2 flex items-center">
                        <Users className="mr-2" size={20} /> Bookings Available
                    </h3>
                    <p className="text-gray-600">{itinerary.bookings ? 'Yes' : 'No'}</p>
                </div>

                <div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2 flex items-center">
                        <Star className="mr-2" size={20} /> Average Rating
                    </h3>
                    <p className="text-gray-600">{itinerary.rating.toFixed(1)}</p>
                </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
                    <Star className="mr-2" size={20} /> Rate this Itinerary
                </h3>
                <div className="flex items-center mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                    key={star}
                    size={32}
                    className={`cursor-pointer ${rating >= star ? 'text-yellow-500' : 'text-gray-300'}`}
                    onClick={() => setRating(star)}
                />
            ))}
        </div>
                <button
                    onClick={handleRate}
                    className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                >
                    Submit Rating
                </button>
                {/* Share Button */}
                <div className="share-buttons">
                    <button onClick={handleShareLink} className="share-button">Copy Link</button>
                    <button onClick={handleShareEmail} className="share-button">Share via Email</button>
                </div>
            </div>
        </div>
    );
};

export default ItineraryDetails;