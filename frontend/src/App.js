import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [data, setData] = useState(null); // Holds the response data from backend
  const [error, setError] = useState(null); // Holds any error message
  
  const handleRequest = async (url, method = 'get', body = null) => {
    try {
      let response;
      if (method === 'get' || method === 'delete') {
        response = await axios[method](url);
      } else {
        response = await axios[method](url, body);
      }
      setData(response.data);
      setError(null); // Reset error if the request succeeds
    } catch (err) {
      setError(err.response ? err.response.data : "Something went wrong");
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Backend Requests</h1>

      {/* Profile Routes */}
      <button onClick={() => handleRequest('/createProfile', 'post', { name: 'John Doe', email: 'john@example.com' })}>
        Create Profile
      </button>
      <button onClick={() => handleRequest('/updateProfile/1', 'put', { name: 'Jane Doe' })}>
        Update Profile
      </button>
      <button onClick={() => handleRequest('/profiles')}>
        Get Profiles
      </button>
      
      <hr />

      {/* Activity Routes */}
      <button onClick={() => handleRequest('/newActivity', 'post', { name: 'Hiking', price: 50 })}>
        Create Activity
      </button>
      <button onClick={() => handleRequest('/activities')}>
        Get All Activities
      </button>
      <button onClick={() => handleRequest('/activities/1')}>
        Get Activity by ID
      </button>
      <button onClick={() => handleRequest('/updateActivity/1', 'put', { name: 'Updated Activity' })}>
        Update Activity
      </button>
      <button onClick={() => handleRequest('/deleteActivity', 'delete')}>
        Delete Activity
      </button>
      
      <hr />

      {/* Tour Guide Routes */}
      <button onClick={() => handleRequest('/addGuide', 'post', { name: 'Guide 1' })}>
        Add Guide
      </button>
      <button onClick={() => handleRequest('/getGuide')}>
        Get Guide
      </button>
      <button onClick={() => handleRequest('/updateGuide/1', 'put', { name: 'Updated Guide' })}>
        Update Guide
      </button>
      
      <hr />

      {/* Tourism Governor/Sites Routes */}
      <button onClick={() => handleRequest('/addGov', 'post', { name: 'Governor 1' })}>
        Add Governor
      </button>
      <button onClick={() => handleRequest('/addSite', 'post', { name: 'Site 1' })}>
        Add Site
      </button>
      <button onClick={() => handleRequest('/getSite/1')}>
        Get Site
      </button>
      <button onClick={() => handleRequest('/getAllSites')}>
        Get All Sites
      </button>
      <button onClick={() => handleRequest('/updateSite/1', 'put', { name: 'Updated Site' })}>
        Update Site
      </button>
      <button onClick={() => handleRequest('/deleteSite/1', 'delete')}>
        Delete Site
      </button>

      <hr />

      {/* Itineraries Routes */}
      <button onClick={() => handleRequest('/createItinerary', 'post', { name: 'Itinerary 1' })}>
        Create Itinerary
      </button>
      <button onClick={() => handleRequest('/getAllItineraries')}>
        Get All Itineraries
      </button>
      <button onClick={() => handleRequest('/getItinerary/1')}>
        Get Itinerary by ID
      </button>
      <button onClick={() => handleRequest('/updateItinerary/1', 'put', { name: 'Updated Itinerary' })}>
        Update Itinerary
      </button>
      <button onClick={() => handleRequest('/deleteItinerary/1', 'delete')}>
        Delete Itinerary
      </button>
      <button onClick={() => handleRequest('/getMyItineraries')}>
        Get My Itineraries
      </button>

      <hr />

      {/* Child Itineraries Routes */}
      <button onClick={() => handleRequest('/createChildItinerary', 'post', { itinerary: 'Itinerary 1', buyer: 'Buyer 1' })}>
        Create Child Itinerary
      </button>
      <button onClick={() => handleRequest('/getChildItinerary/1')}>
        Get Child Itinerary by ID
      </button>
      <button onClick={() => handleRequest('/getAllChildIitineraries')}>
        Get All Child Itineraries
      </button>
      <button onClick={() => handleRequest('/updateChildItinerary/1', 'put', { name: 'Updated Child Itinerary' })}>
        Update Child Itinerary
      </button>
      <button onClick={() => handleRequest('/deleteChildItinerary/1', 'delete')}>
        Delete Child Itinerary
      </button>

      <hr />

      {/* Display data or error */}
      <div>
        <h2>Response Data:</h2>
        {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </div>
  );
};

export default App;
