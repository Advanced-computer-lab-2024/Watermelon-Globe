import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, Clock, Calendar, DollarSign, Languages, Accessibility, Truck, Users, AlertCircle } from 'lucide-react';

const ItineraryDetails = () => {
    const { tripid } = useParams();
    const [itinerary, setItinerary] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [bookingMessage, setBookingMessage] = useState(null);

    useEffect(() => {
        const fetchItinerary = async () => {
            try {
                const response = await fetch(`/api/Itinerary/getItinerary/${tripid}`);
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

        fetchItinerary();
    }, [tripid]);

    const handleBooking = async (e) => {
        e.preventDefault();
        if (!itinerary.bookings) {
            setBookingMessage("Sorry, this itinerary is not available for booking at the moment.");
            return;
        }
        if (!selectedDate || !selectedTime) {
            setBookingMessage("Please select both a date and time before booking.");
            return;
        }
        try {
            const response = await fetch('/api/TouristItinerary/createChildItinerary', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    itinerary: tripid,
                    buyer: "672cd143a72c43a2d8fb01c0", // Replace with actual buyer ID
                    chosenDates: [selectedDate],
                    chosenTimes: [selectedTime],
                    totalPrice: itinerary.priceOfTour,
                    status: "pending"
                }),
            });
            if (!response.ok) {
                throw new Error('Failed to book itinerary');
            }
            setBookingMessage('Itinerary booked successfully!');
        } catch (error) {
            console.error('Error booking itinerary:', error);
            setBookingMessage('Failed to book itinerary. Please try again.');
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    );

    if (error) return <div className="text-red-500 text-center text-xl mt-10">Error: {error}</div>;

    if (!itinerary) return null;

    return (
        <div className="container mx-auto p-6 bg-white shadow-2xl rounded-lg mt-10 max-w-4xl">
            <h2 className="text-4xl font-bold text-gray-800 mb-6 border-b pb-4">{itinerary.name}</h2>
            
            <div className="flex items-center text-gray-600 mb-8">
                <MapPin className="mr-2" size={24} />
                <span className="text-lg">{itinerary.locations.join(', ')}</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                    <h3 className="text-2xl font-semibold text-gray-700 mb-4 flex items-center">
                        <Clock className="mr-2" size={24} /> Activities
                    </h3>
                    <ul className="space-y-3 max-h-60 overflow-y-auto pr-4">
                        {itinerary.activities.map((activity, index) => (
                            <li key={index} className="flex justify-between items-center bg-white p-3 rounded shadow">
                                <span className="text-gray-800 font-medium">{activity.activityName}</span>
                                <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full">{activity.duration}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                    <h3 className="text-2xl font-semibold text-gray-700 mb-4 flex items-center">
                        <Calendar className="mr-2" size={24} /> Timeline
                    </h3>
                    <p className="text-gray-600 leading-relaxed">{itinerary.timeline}</p>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 bg-gray-100 p-6 rounded-lg shadow-inner">
                <div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2 flex items-center">
                        <Languages className="mr-2" size={20} /> Language of Tour
                    </h3>
                    <p className="text-gray-600">{itinerary.languageOfTour}</p>
                </div>
                
                <div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2 flex items-center">
                        <DollarSign className="mr-2" size={20} /> Price
                    </h3>
                    <p className="text-gray-600 text-2xl font-bold">${itinerary.priceOfTour}</p>
                </div>
                
                <div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2 flex items-center">
                        <Accessibility className="mr-2" size={20} /> Accessibility
                    </h3>
                    <p className="text-gray-600">{itinerary.accessibility ? 'Yes' : 'No'}</p>
                </div>
            </div>
            
            <form onSubmit={handleBooking} className="bg-gray-50 p-6 rounded-lg shadow-md mb-12">
                <h3 className="text-2xl font-semibold text-gray-700 mb-6">Book Your Itinerary</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div>
                        <h4 className="text-lg font-semibold text-gray-700 mb-3 flex items-center">
                            <Calendar className="mr-2" size={20} /> Choose Date
                        </h4>
                        <div className="space-y-2 max-h-40 overflow-y-auto pr-4">
                            {itinerary.availableDates.map((date, index) => (
                                <label key={index} className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        name="date"
                                        value={date}
                                        checked={selectedDate === date}
                                        onChange={() => setSelectedDate(date)}
                                        className="form-radio h-5 w-5 text-blue-600"
                                    />
                                    <span className="text-gray-700">{new Date(date).toLocaleDateString()}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    
                    <div>
                        <h4 className="text-lg font-semibold text-gray-700 mb-3 flex items-center">
                            <Clock className="mr-2" size={20} /> Choose Time
                        </h4>
                        <div className="space-y-2 max-h-40 overflow-y-auto pr-4">
                            {itinerary.availableTimes.map((time, index) => (
                                <label key={index} className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        name="time"
                                        value={time}
                                        checked={selectedTime === time}
                                        onChange={() => setSelectedTime(time)}
                                        className="form-radio h-5 w-5 text-blue-600"
                                    />
                                    <span className="text-gray-700">{time}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
                
                <button
                    type="submit"
                    className="w-full px-6 py-3 rounded-lg text-white font-semibold transition duration-300 bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                    Book Itinerary
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
            
            <div className="bg-gray-100 p-6 rounded-lg shadow-inner mb-12">
                <h3 className="text-2xl font-semibold text-gray-700 mb-4 flex items-center">
                    <Truck className="mr-2" size={24} /> Pickup/Drop-off Locations
                </h3>
                <ul className="space-y-3">
                    {itinerary.pickupDropoffLocations.map((location, index) => (
                        <li key={index} className="bg-white p-4 rounded shadow flex justify-between items-center">
                            <span className="text-gray-800"><strong>Pickup:</strong> {location.pickup}</span>
                            <span className="text-gray-800"><strong>Drop-off:</strong> {location.dropoff}</span>
                        </li>
                    ))}
                </ul>
            </div>
            
            <div className="flex items-center justify-between bg-blue-50 p-6 rounded-lg shadow-md">
                <div className="flex items-center">
                    <Users className="mr-2" size={24} />
                    <h3 className="text-2xl font-semibold text-gray-700">Bookings Available</h3>
                </div>
                <span className={`px-4 py-2 rounded-full text-lg font-semibold ${itinerary.bookings ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                    {itinerary.bookings ? 'Yes' : 'No'}
                </span>
            </div>
        </div>
    );
};

export default ItineraryDetails;