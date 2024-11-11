import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, DollarSign, Globe, MapPin, Star, Users, Accessibility } from "lucide-react";

export default function ItinerarySlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [itineraries, setItineraries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [deleteError, setDeleteError] = useState('');
  const [deleteSuccess, setDeleteSuccess] = useState('');

  useEffect(() => {
    const fetchItineraries = async () => {
      try {
        const response = await fetch('/api/Itinerary/getAllItineraries');
        if (!response.ok) throw new Error('Failed to fetch itineraries');

        const data = await response.json();
        setItineraries(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching itineraries:', error);
        setError('Failed to load itineraries. Please try again later.');
        setIsLoading(false);
      }
    };

    fetchItineraries();
  }, []);

  useEffect(() => {
    if (itineraries.length === 0) return;

    const timer = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % itineraries.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [itineraries.length]);

  const handleDeleteAccount = async () => {
    try {
      const response = await fetch(`/api/TourGuide/requestDeletionGuide/670137227c5a3dade4ba11dc`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        setDeleteError('Failed to delete account.');
        setDeleteSuccess('');
      } else {
        alert('Account deleted successfully.');
        setDeleteError('');
        navigate('/');
      }
    } catch (error) {
      setDeleteError('An error occurred while deleting the account.');
      setDeleteSuccess('');
      console.error('Error deleting account:', error);
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Loading itineraries...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-64 text-red-500">{error}</div>;
  }

  if (itineraries.length === 0) {
    return <div className="flex justify-center items-center h-64">No itineraries found.</div>;
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      {/* Delete Account Button */}
      <div className="flex justify-end">
        <button
          onClick={handleDeleteAccount}
          className="px-4 py-2 mb-4 text-white rounded-md transition duration-200 bg-red-600 hover:bg-red-700"
        >
          Delete Account
        </button>
      </div>

      {/* Display any deletion success or error messages */}
      {deleteSuccess && <div className="text-green-500">{deleteSuccess}</div>}
      {deleteError && <div className="text-red-500">{deleteError}</div>}

      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {itineraries.map((itinerary, index) => (
            <div key={itinerary._id || index} className="w-full flex-shrink-0">
              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-2">{itinerary.Location}</h2>
                  <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
                    <Globe className="w-4 h-4" />
                    <span>{itinerary.bookingOpen ? 'Booking Open' : 'Booking Closed'}</span>
                    <MapPin className="w-4 h-4 ml-2" />
                    <span>{Array.isArray(itinerary.Location) ? itinerary.Location.join(', ') : 'No locations available'}</span>
                  </div>
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">{itinerary.Date || 'No Date Available'}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-semibold">${itinerary.Price || '0.00'}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {Array.isArray(itinerary.tags) && itinerary.tags.length > 0 && itinerary.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="px-2 py-1 bg-gray-200 text-xs rounded-full">{tag}</span>
                      ))}
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold">Discount:</h4>
                      <span className="text-sm">{itinerary.Discount ? `${itinerary.Discount}% off` : 'No discount'}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">{itinerary.Time || 'No time available'}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">Advertiser: {itinerary.Advertiser || 'Unknown'}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm font-semibold">{itinerary.rating || 'No rating'}</span>
                        <span className="text-sm text-gray-500">({itinerary.noOfRatings || 0} ratings)</span>
                      </div>
                      {itinerary.accessibility && (
                        <div className="flex items-center space-x-2">
                          <Accessibility className="w-4 h-4 text-blue-500" />
                          <span className="text-sm">Accessible</span>
                        </div>
                      )}
                    </div>
                    <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-4 space-x-2">
        {itineraries.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${activeIndex === index ? 'bg-blue-500' : 'bg-gray-300'}`}
            onClick={() => setActiveIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
