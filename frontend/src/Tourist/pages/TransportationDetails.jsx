import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, CreditCard, CheckCircle, XCircle } from 'lucide-react';

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
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Error</h2>
          <p className="text-center text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="bg-blue-600 px-4 py-5 sm:px-6">
            <h2 className="text-2xl font-bold text-white">Transportation Details</h2>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center mb-4">
              <Calendar className="w-6 h-6 text-blue-600 mr-2" />
              <h3 className="text-xl font-semibold text-gray-800">{transportation.type}</h3>
            </div>
            <div className="flex items-center mb-4">
              <MapPin className="w-6 h-6 text-blue-600 mr-2" />
              <p className="text-gray-600">Destination: {transportation.destination}</p>
            </div>
            <div className="flex items-center mb-6">
              <CreditCard className="w-6 h-6 text-blue-600 mr-2" />
              <p className="text-gray-600">Price: ${transportation.price}</p>
            </div>
            {transportation.booked ? (
              <div className="bg-green-100 border-l-4 border-green-500 p-4 mb-6">
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-2" />
                  <p className="text-green-700 font-semibold">This transportation is already booked.</p>
                </div>
              </div>
            ) : (
              <button
                onClick={handleBooking}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Book Now
              </button>
            )}
            {bookingStatus && (
              <div className={`mt-4 p-4 rounded-md ${bookingStatus.includes('failed') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                <p className="font-semibold">{bookingStatus}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}