import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdvertiserPage = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [activId, setActivId] = useState('');
  const [profId, setProfId] = useState('');
  const [rawJson, setRawJson] = useState('');
  const navigate = useNavigate();

  const handleRequest1 = async (url, method = 'get', rawJson = null) => {
    try {
      let response;
      let options = { headers: { 'Content-Type': 'application/json' } };

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
    } catch (err) {
      setError(err.response ? err.response.data : "Something went wrong");
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Advertiser Page</h1>

      <h2>Raw JSON Body</h2>
      <textarea 
        rows={10}
        cols={50}
        value={rawJson}
        onChange={(e) => setRawJson(e.target.value)}
        placeholder="Enter raw JSON here"
        style={{ width: '100%', marginBottom: '20px' }}
      />

      <h2>Profiles</h2>
      <button onClick={() => handleRequest1('/createProfile', 'post', rawJson)}>Create Profile</button>
      <button onClick={() => handleRequest1(`/updateProfile/${profId}`, 'put', rawJson)}>Update Profile</button>
      <button onClick={() => handleRequest1(`/profiles/${profId}`)}>Get Profiles</button>

      <input 
        type="text" 
        value={profId} 
        onChange={(e) => setProfId(e.target.value)} 
        placeholder="Enter profile ID" 
      />
      
      <hr />

      <h2>Activities</h2>
      <button onClick={() => handleRequest1('/newActivity', 'post', rawJson)}>Create Activity</button>
      <button onClick={() => handleRequest1('/activities')}>Get All Activities</button>
      <button onClick={() => handleRequest1(`/activities/${activId}`)}>Get Activity by ID</button>
      <button onClick={() => handleRequest1(`/UpdateActivity/${activId}`, 'put', rawJson)}>Update Activity</button>
      <button onClick={() => handleRequest1(`/deleteActivity/${activId}`, 'delete')}>Delete Activity</button>

      <input 
        type="text" 
        value={activId} 
        onChange={(e) => setActivId(e.target.value)} 
        placeholder="Enter activity ID" 
      />

      <hr />

      <button onClick={() => navigate('/')}>
          Back to Home
        </button>
      <div>
        <h2>Response Data:</h2>
        {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>

      
    </div>
  );
};

export default AdvertiserPage;
