import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [data, setData] = useState(null); // Holds the response data from backend
  const [error, setError] = useState(null); // Holds any error message
  const [itineraryId, setItineraryId] = useState(''); // State for itinerary ID input
  const [childItineraryId, setChildItineraryId] = useState('');
  const [GuideId, setGuideId] = useState('');
  const [rawJson, setRawJson] = useState(''); // State for raw JSON input
  
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

  const handleRequest1 = async (url, method = 'get', rawJson = null) => {
    try {
      let response;
      let options = {};

      if (method === 'post' || method === 'put') {
        const body = JSON.parse(rawJson); // Convert raw JSON input to JS object
        options = {
          headers: { 'Content-Type': 'application/json' },
          data: body // Include the body in the request
        };
      }

      response = await axios({ method, url, ...options });
      setData(response.data);
      setError(null); // Reset error if the request succeeds
      setChildItineraryId('');
      setGuideId('');
      setItineraryId('');
    } catch (err) {
      setError(err.response ? err.response.data : "Something went wrong");
    }
  };

  
  return (
    <div style={{ padding: '20px' }}>
      <h1>Backend Requests</h1>

      {/* Itineraries Routes */}
      <h2>Raw JSON Body</h2>
      <textarea 
        rows={10}
        cols={50}
        value={rawJson}
        onChange={(e) => setRawJson(e.target.value)}
        placeholder="Enter raw JSON Here"
        style={{ width: '100%', marginBottom: '20px' }}
      />
      


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
      <button onClick={() => handleRequest1('/createItinerary', 'post', rawJson)}>
        Create Itinerary
      </button>

      <button onClick={() => handleRequest1('/getAllItineraries')}>
        Get All Itineraries
      </button>

      <button onClick={() => handleRequest1(`/getItinerary/${itineraryId}`)}>
        Get Itinerary by ID
      </button>

      
      <div>
        <input 
          type="text" 
          value={itineraryId} 
          onChange={(e) => setItineraryId(e.target.value)} 
          placeholder="Enter Itinerary ID for Update/Delete" 
        />
      </div>
      
      <button onClick={() => handleRequest1(`/updateItinerary/${itineraryId}`, 'put', rawJson)}>
        Update Itinerary
      </button>
      
      <button onClick={() => handleRequest1(`/deleteItinerary/${itineraryId}`, 'delete')}>
        Delete Itinerary
      </button>

      <button onClick={() => handleRequest1(`/getMyItineraries?guideID=${GuideId}`)}>
        Get My Itineraries
      </button>

      <div>
        <input 
          type="text" 
          value={GuideId} 
          onChange={(e) => setGuideId(e.target.value)} 
          placeholder="Enter Guide ID " 
        />
      </div>


      <hr />

      {/* Child Itineraries Routes */}
      <button onClick={() => handleRequest1('/createChildItinerary', 'post', rawJson)}>
        Create Child Itinerary
      </button>
      <button onClick={() => handleRequest1(`/getChildItinerary/${childItineraryId}`)}>
        Get Child Itinerary by ID
      </button>
      <button onClick={() => handleRequest1('/getAllChildIitineraries')}>
        Get All Child Itineraries
      </button>

      <div>
        <input 
          type="text" 
          value={childItineraryId} 
          onChange={(e) => setChildItineraryId(e.target.value)} 
          placeholder="Enter Itinerary ID for Update/Delete" 
        />
      </div>

      <button onClick={() => handleRequest1(`/updateChildItinerary/${childItineraryId}`, 'put', rawJson)}>
        Update Child Itinerary
      </button>
      <button onClick={() => handleRequest1(`/deleteChildItinerary/${childItineraryId}`, 'delete')}>
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
