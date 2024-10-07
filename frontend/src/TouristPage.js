import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TouristPage = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [touristId, setTouristId] = useState('');
  const [rawJson, setRawJson] = useState('');
  // const [childItineraryId, setChildItineraryId] = useState('');
  const navigate = useNavigate();

  const handleRequest = async (url, method = 'get', rawJson = null) => {
    try {
      let response;
      let options = {
        headers: { 'Content-Type': 'application/json' },
      };

      if (method === 'get' && rawJson) {
        const queryParams = new URLSearchParams(JSON.parse(rawJson)).toString();
        url = `${url}?${queryParams}`;
      } else if (method === 'post' || method === 'put') {
        const body = JSON.parse(rawJson);
        options.data = body;
      }

      response = await axios({ method, url, ...options });
      setData(response.data);
      setError(null);
      setRawJson('');
      setTouristId('');
    } catch (err) {
      setError(err.response ? err.response.data : 'Something went wrong');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Tourist Requests</h1>

      <h2>Raw JSON Body</h2>
      <textarea
        rows={10}
        cols={50}
        value={rawJson}
        onChange={(e) => setRawJson(e.target.value)}
        placeholder="Enter raw JSON Here"
        style={{ width: '100%', marginBottom: '20px' }}
      />

      <button onClick={() => handleRequest('/addTourist', 'post', rawJson)}>
        Add Tourist
      </button>

      <button onClick={() => handleRequest(`/updateTourist/${touristId}`, 'put', rawJson)}>
        Update Tourist
      </button>

      <button onClick={() => handleRequest('/getTourists')}>
        Get Tourists
      </button>

      <div>
        <input
          type="text"
          value={touristId}
          onChange={(e) => setTouristId(e.target.value)}
          placeholder="Enter Tourist ID for Update"
        />
      </div>

      <h2>Tourist Itineraries</h2>
      <button onClick={() => handleRequest('/getAllChildIitineraries')}>
         Get All Tourist Itineraries
       </button>

       <h2>Sites</h2>
       <button onClick={() => handleRequest('/getAllSites')}>
        Get All Sites
      </button>

      <h2>Activities</h2>
      <button onClick={() => handleRequest('/activities')}>Get All Activities</button>
      <button onClick={() => handleRequest(`/filterActivities`, 'post', rawJson)}>filter activities</button>

      <hr />
      <button onClick={() => navigate('/')}>
        Go Back
      </button>

      <hr />

      <div>
        <h2>Response Data:</h2>
        {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </div>
  );
};

export default TouristPage;