import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Bookmark, MapPin, Calendar, Clock, AlertCircle, ArrowLeft } from 'lucide-react';

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

  const handleBack = () => {
    navigate(`/TouristDetails/${touristId}`);
  };

  const handleItemClick = (bookmark, type) => {
    if (type === 'itinerary') {
      navigate(`/ItineraryDetails/${bookmark._id}/${touristId}`);
    } else if (type === 'activity') {
      navigate(`/TouristActivityDetails/${bookmark._id}/${touristId}`);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#FFE4E1' }}>
        <div style={{ animation: 'spin 1s linear infinite', border: '4px solid #4CAF50', borderTop: '4px solid transparent', borderRadius: '50%', width: '50px', height: '50px' }}></div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#FFE4E1' }}>
        <AlertCircle style={{ color: '#f44336', width: '48px', height: '48px', marginBottom: '1rem' }} />
        <p style={{ color: '#f44336', fontSize: '1.2rem', fontWeight: 'bold' }}>{error}</p>
      </div>
    );
  }

  const BookmarkCard = ({ bookmark, type }) => (
    <div style={{ 
      backgroundColor: 'white', 
      borderRadius: '8px', 
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)', 
      padding: '1rem', 
      marginBottom: '1rem',
      transition: 'box-shadow 0.3s ease-in-out'
    }}
    onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)'}
    onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)'}
    >
      <h3 style={{ color: '#4CAF50', marginBottom: '0.5rem' }}>{type === 'itinerary' ? bookmark.name : bookmark.Name}</h3>
      <p style={{ marginBottom: '0.5rem' }}>{bookmark.description}</p>
      {bookmark.location && (
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
          <MapPin style={{ color: '#4CAF50', marginRight: '0.5rem' }} size={16} />
          <span>{bookmark.location}</span>
        </div>
      )}
      {bookmark.date && (
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
          <Calendar style={{ color: '#4CAF50', marginRight: '0.5rem' }} size={16} />
          <span>{new Date(bookmark.date).toLocaleDateString()}</span>
        </div>
      )}
      {bookmark.duration && (
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
          <Clock style={{ color: '#4CAF50', marginRight: '0.5rem' }} size={16} />
          <span>{bookmark.duration}</span>
        </div>
      )}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
        <button 
          onClick={() => handleItemClick(bookmark, type)}
          style={{
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          View Details
        </button>
        <button 
          onClick={() => handleRemoveBookmark(bookmark._id, type)}
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer'
          }}
          aria-label="Remove bookmark"
        >
          <Bookmark style={{ color: '#f44336' }} size={20} />
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FFE4E1', padding: '2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <button 
          onClick={handleBack}
          style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'transparent',
            border: 'none',
            color: '#4CAF50',
            cursor: 'pointer',
            marginBottom: '2rem'
          }}
        >
          <ArrowLeft style={{ marginRight: '0.5rem' }} />
          Back to Profile
        </button>
        <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#4CAF50', marginBottom: '2rem', textAlign: 'center' }}>Your Bookmarks</h2>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
          <button 
            onClick={() => setActiveTab('itineraries')}
            style={{
              backgroundColor: activeTab === 'itineraries' ? '#4CAF50' : 'white',
              color: activeTab === 'itineraries' ? 'white' : '#4CAF50',
              border: '1px solid #4CAF50',
              padding: '0.5rem 1rem',
              borderRadius: '4px 0 0 4px',
              cursor: 'pointer'
            }}
          >
            Itineraries
          </button>
          <button 
            onClick={() => setActiveTab('activities')}
            style={{
              backgroundColor: activeTab === 'activities' ? '#4CAF50' : 'white',
              color: activeTab === 'activities' ? 'white' : '#4CAF50',
              border: '1px solid #4CAF50',
              padding: '0.5rem 1rem',
              borderRadius: '0 4px 4px 0',
              cursor: 'pointer'
            }}
          >
            Activities
          </button>
        </div>
        {activeTab === 'itineraries' && (
          bookmarks.itineraries.length === 0 ? (
            <p style={{ textAlign: 'center', fontSize: '1.2rem', color: '#666' }}>You have no bookmarked itineraries yet.</p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
              {bookmarks.itineraries.map((bookmark) => (
                <BookmarkCard key={bookmark._id} bookmark={bookmark} type="itinerary" />
              ))}
            </div>
          )
        )}
        {activeTab === 'activities' && (
          bookmarks.activities.length === 0 ? (
            <p style={{ textAlign: 'center', fontSize: '1.2rem', color: '#666' }}>You have no bookmarked activities yet.</p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
              {bookmarks.activities.map((bookmark) => (
                <BookmarkCard key={bookmark._id} bookmark={bookmark} type="activity" />
              ))}
            </div>
          )
        )}
      </div>
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default TouristBookmarks;

