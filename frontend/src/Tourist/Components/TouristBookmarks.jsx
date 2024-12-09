import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Bookmark, MapPin, Calendar, Clock, AlertCircle, ClipboardCheckIcon as FaClipboardCheck } from 'lucide-react';
import TouristNavbar from "../Components/TouristNavBar";

const TouristBookmarks = () => {
  const { touristId } = useParams();
  const navigate = useNavigate();
  const [bookmarks, setBookmarks] = useState({ itineraries: [], activities: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('itineraries');

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const response = await axios.get(`/api/Tourist/getBookmarks/${touristId}`);
        setBookmarks({
          itineraries: response.data.bookmarkedItineraries || [],
          activities: response.data.bookmarkedActivities || []
        });
        setLoading(false);
      } catch (err) {
        console.error('Error fetching bookmarks:', err);
        setError('Failed to fetch bookmarks. Please try again.');
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, [touristId]);

  const handleRemoveBookmark = async (bookmarkId, type) => {
    try {
      if (type === 'itinerary') {
        await axios.put(`/api/Tourist/removeBookmarkItinerary/${touristId}/${bookmarkId}`);
        setBookmarks(prev => ({
          ...prev,
          itineraries: prev.itineraries.filter(item => item._id !== bookmarkId)
        }));
      } else if (type === 'activity') {
        await axios.put(`/api/Tourist/removeBookmarkActivity/${touristId}/${bookmarkId}`);
        setBookmarks(prev => ({
          ...prev,
          activities: prev.activities.filter(item => item._id !== bookmarkId)
        }));
      }
    } catch (err) {
      console.error('Error removing bookmark:', err);
      setError('Failed to remove bookmark. Please try again.');
    }
  };

  const handleItemClick = (bookmark, type) => {
    if (type === 'itinerary') {
      navigate(`/ItineraryDetails/${bookmark._id}/${touristId}`);
    } else if (type === 'activity') {
      navigate(`/TouristActivityDetails/${bookmark._id}/${touristId}`);
    }
  };

  const BookmarkCard = ({ bookmark, type }) => (
    <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
      <h3 className="text-lg font-semibold mb-2 text-gray-800">{type === 'itinerary' ? bookmark.name : bookmark.Name}</h3>
      <p className="text-gray-600 mb-3">{bookmark.description}</p>
      {bookmark.location && (
        <div className="flex items-center mb-2">
          <MapPin className="text-primary mr-2" size={16} />
          <span className="text-sm text-gray-600">{bookmark.location}</span>
        </div>
      )}
      {bookmark.date && (
        <div className="flex items-center mb-2">
          <Calendar className="text-primary mr-2" size={16} />
          <span className="text-sm text-gray-600">{new Date(bookmark.date).toLocaleDateString()}</span>
        </div>
      )}
      {bookmark.duration && (
        <div className="flex items-center mb-2">
          <Clock className="text-primary mr-2" size={16} />
          <span className="text-sm text-gray-600">{bookmark.duration}</span>
        </div>
      )}
      <div className="flex justify-between items-center mt-4">
        <button 
          onClick={() => handleItemClick(bookmark, type)}
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-hover transition-colors"
        >
          View Details
        </button>
        <button 
          onClick={() => handleRemoveBookmark(bookmark._id, type)}
          className="text-red-500 hover:text-red-600"
          aria-label="Remove bookmark"
        >
          <Bookmark size={20} />
        </button>
      </div>
    </div>
  );

  if (!touristId) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Authentication Error</h1>
          <p className="text-gray-600 mb-6">Tourist ID is missing. Please log in again to access your bookmarks.</p>
          <button
            onClick={() => navigate('/login')}
            className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-hover transition duration-300 ease-in-out w-full"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-background">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-background">
        <AlertCircle className="text-red-500 w-16 h-16 mb-4" />
        <p className="text-red-500 text-xl font-bold">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-8" style={{ margin: "-20px" }}>
      <TouristNavbar id={touristId} />
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-primary p-5 relative">
            <div className="flex items-center space-x-4">
              <div className="bg-white rounded-full p-2">
                <FaClipboardCheck className="h-16 w-16 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Your Bookmarks</h1>
                <p className="text-white opacity-75">View and manage your saved itineraries and activities</p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div className="flex justify-center mb-8">
              <button 
                onClick={() => setActiveTab('itineraries')}
                className={`px-4 py-2 rounded-l-lg ${activeTab === 'itineraries' ? 'bg-primary text-white' : 'bg-white text-primary border border-primary'}`}
              >
                Itineraries
              </button>
              <button 
                onClick={() => setActiveTab('activities')}
                className={`px-4 py-2 rounded-r-lg ${activeTab === 'activities' ? 'bg-primary text-white' : 'bg-white text-primary border border-primary'}`}
              >
                Activities
              </button>
            </div>

            <div className="bg-cardBackground shadow-md rounded-lg p-4 hover:shadow-lg transition-transform duration-300 ease-in-out">
              <h2 className="text-xl font-semibold text-secondary mb-4 flex items-center">
                <Bookmark className="mr-2" />
                {activeTab === 'itineraries' ? 'Bookmarked Itineraries' : 'Bookmarked Activities'}
              </h2>
              <div className="space-y-4 max-h-[calc(100vh-400px)] overflow-y-auto">
                {activeTab === 'itineraries' && (
                  bookmarks.itineraries.length === 0 ? (
                    <p className="text-gray-600 bg-gray-50 p-4 rounded-lg">You have no bookmarked itineraries yet.</p>
                  ) : (
                    bookmarks.itineraries.map((bookmark) => (
                      <BookmarkCard key={bookmark._id} bookmark={bookmark} type="itinerary" />
                    ))
                  )
                )}
                {activeTab === 'activities' && (
                  bookmarks.activities.length === 0 ? (
                    <p className="text-gray-600 bg-gray-50 p-4 rounded-lg">You have no bookmarked activities yet.</p>
                  ) : (
                    bookmarks.activities.map((bookmark) => (
                      <BookmarkCard key={bookmark._id} bookmark={bookmark} type="activity" />
                    ))
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TouristBookmarks;

