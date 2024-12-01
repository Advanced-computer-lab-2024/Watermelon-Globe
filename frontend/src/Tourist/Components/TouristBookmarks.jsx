import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Bookmark, MapPin, Calendar, Clock, AlertCircle, ArrowLeft } from 'lucide-react';

const TouristBookmarks = () => {
  const { touristId } = useParams();
  const navigate = useNavigate();
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const response = await axios.get(`/api/Tourist/getBookmarks/${touristId}`);
        const combinedBookmarks = [
          ...(response.data.bookmarkedItineraries || []).map((item) => ({ ...item, type: 'itinerary' })),
          ...(response.data.bookmarkedActivities || []).map((item) => ({ ...item, type: 'activity' }))
        ];
        setBookmarks(combinedBookmarks);
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
      } else if (type === 'activity') {
        await axios.put(`/api/Tourist/removeBookmarkActivity/${touristId}/${bookmarkId}`);
      }
      setBookmarks(bookmarks.filter(bookmark => bookmark._id !== bookmarkId));
    } catch (err) {
      console.error('Error removing bookmark:', err);
      setError('Failed to remove bookmark. Please try again.');
    }
  };

  const handleBack = () => {
    navigate(`/TouristDetails/${touristId}`);
  };

  const handleItemClick = (bookmark) => {
    if (bookmark.type === 'itinerary') {
      navigate(`/ItineraryDetails/${bookmark._id}/${touristId}`);
    } else if (bookmark.type === 'activity') {
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

  return (
    <div style={{ minHeight: '100vh', background: '#FFE4E1', padding: '2rem' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem' }}>
          <button onClick={handleBack} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            <ArrowLeft style={{ color: '#4CAF50', marginRight: '0.5rem' }} />
            <span style={{ color: '#4CAF50', fontWeight: 'bold' }}>Back to Profile</span>
          </button>
        </div>
        <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#4CAF50', marginBottom: '1.5rem', textAlign: 'center' }}>Your Bookmarks</h2>
        {bookmarks.length === 0 ? (
          <p style={{ textAlign: 'center', fontSize: '1.2rem', color: '#666' }}>You have no bookmarks yet.</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {bookmarks.map((bookmark) => (
              <div 
                key={bookmark._id} 
                style={{ 
                  backgroundColor: 'white', 
                  borderRadius: '10px', 
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', 
                  overflow: 'hidden',
                  cursor: 'pointer'
                }}
                onClick={() => handleItemClick(bookmark)}
              >
                <div style={{ padding: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#4CAF50' }}>{bookmark.name}</h3>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveBookmark(bookmark._id, bookmark.type);
                      }}
                      style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                      aria-label="Remove bookmark"
                    >
                      <Bookmark style={{ color: '#f44336' }} size={20} />
                    </button>
                  </div>
                  <p style={{ color: '#666', marginBottom: '1rem' }}>{bookmark.description}</p>
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
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Clock style={{ color: '#4CAF50', marginRight: '0.5rem' }} size={16} />
                      <span>{bookmark.duration}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
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

