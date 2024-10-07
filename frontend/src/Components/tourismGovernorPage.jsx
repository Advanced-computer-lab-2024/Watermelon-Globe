import React, { useState } from 'react';
import axios from 'axios';

const TourismGovernorPage = () => {
  const [data, setData] = useState(null); // Holds the response data from backend
  const [error, setError] = useState(null); // Holds any error message
  const [siteId, setSiteId] = useState(''); // State for site ID input
  const [govId, setGovId] = useState(''); // State for governor ID input
  const [rawJson, setRawJson] = useState(''); // State for raw JSON input

  const handleRequest1 = async (url, method = 'get', rawJson = null) => {
    try {
      let response;
      let options = {
        headers: { 'Content-Type': 'application/json' },
      };

      if (method === 'get' && rawJson) {
        // Convert the raw JSON to query string parameters for GET request
        const queryParams = new URLSearchParams(JSON.parse(rawJson)).toString();
        url = `${url}?${queryParams}`; // Add query parameters to the URL
      } else if (method === 'post' || method === 'put') {
        const body = JSON.parse(rawJson); // Convert raw JSON input to JS object
        options.data = body; // Add the body to the request options
      }

      response = await axios({ method, url, ...options });
      setData(response.data);  // Set the response data
      setError(null);  // Reset error if the request succeeds
      setRawJson('');  // Clear the raw JSON input after the request
      setSiteId('');
      setGovId('');
    } catch (err) {
      setError(err.response ? err.response.data : "Something went wrong");
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Tourism Governor and Sites</h1>

      <h2>Raw JSON Body</h2>
      <textarea 
        rows={10}
        cols={50}
        value={rawJson}
        onChange={(e) => setRawJson(e.target.value)}
        placeholder="Enter raw JSON here"
        style={{ width: '100%', marginBottom: '20px' }}
      />


      {/* Sites Routes */}
      <h2>Tourism Governor</h2>
      <button onClick={() => handleRequest1('/addSite', 'post', rawJson)}>
        Add Site
      </button>
      <button onClick={() => handleRequest1(`/getSite/${siteId}`)}>
        Get Site
      </button>
      <button onClick={() => handleRequest1('/getAllSites')}>
        Get All Sites
      </button>
      <button onClick={() => handleRequest1(`/updateSite/${siteId}`, 'put', rawJson)}>
        Update Site
      </button>
      <button onClick={() => handleRequest1(`/deleteSite/${siteId}`, 'delete')}>
        Delete Site
      </button>

      <div>
        <input 
          type="text" 
          value={siteId} 
          onChange={(e) => setSiteId(e.target.value)} 
          placeholder="Enter Site ID" 
        />
      </div>
      <hr />

      <div>
        <h2>Response Data:</h2>
        {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </div>
  );
};

export default TourismGovernorPage;
