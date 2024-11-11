import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function TransportationDetails() {
  const [transportation, setTransportation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookingStatus, setBookingStatus] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchTransportationDetails();
  }, [id]);

  const fetchTransportationDetails = async () => {
    try {
      const response = await fetch(`/api/Tourist/getTransportation/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch transportation details');
      }
      const data = await response.json();
      setTransportation(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async () => {
    try {
      const response = await fetch(`/api/Tourist/bookTransportation/${id}`, {
        method: 'PUT',
      });
      if (!response.ok) {
        throw new Error('Failed to book transportation');
      }
      const data = await response.json();
      setBookingStatus('Booked successfully!');
      setTransportation({ ...transportation, booked: true });
    } catch (err) {
      setBookingStatus(`Booking failed: ${err.message}`);
    }
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-12">Loading...</div>;
  }

  if (error) {
    return <div className="container mx-auto px-4 py-12 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="md:flex">
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              Transportation Details
            </div>
            <h1 className="block mt-1 text-lg leading-tight font-medium text-black">
              {transportation.type}
            </h1>
            <p className="mt-2 text-gray-500">Destination: {transportation.destination}</p>
            <p className="mt-2 text-gray-500">Price: ${transportation.price}</p>
            {transportation.booked ? (
              <p className="mt-4 text-green-500 font-semibold">This transportation is already booked.</p>
            ) : (
              <button
                onClick={handleBooking}
                className="mt-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Book Now
              </button>
            )}
            {bookingStatus && (
              <p className={`mt-4 ${bookingStatus.includes('failed') ? 'text-red-500' : 'text-green-500'}`}>
                {bookingStatus}
              </p>
            )}
            <button
              onClick={() => navigate('/ExploreTransportations')}
              className="mt-4 px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Back to Explore
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}