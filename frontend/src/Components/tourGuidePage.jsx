import React, { useState } from 'react';
import axios from 'axios';

const TourGuidePage = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [GuideId, setGuideId] = useState('');
  const [Guide1Id, setGuide1Id] = useState('');
  const [itineraryId, setItineraryId] = useState('');
  const [childItineraryId, setChildItineraryId] = useState('');
  const [rawJson, setRawJson] = useState('');
  

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
      <h1>Tour Guide</h1>

      <h2>Raw JSON Body</h2>
      <textarea 
        rows={10}
        cols={50}
        value={rawJson}
        onChange={(e) => setRawJson(e.target.value)}
        placeholder="Enter raw JSON here"
        style={{ width: '100%', marginBottom: '20px' }}
      />

      <h2>Tour Guides</h2>
      <button onClick={() => handleRequest1('/addGuide', 'post', rawJson)}>Add Guide</button>
      <button onClick={() => handleRequest1(`/getGuide/${Guide1Id}`,)}>Get Guide</button>
      <button onClick={() => handleRequest1('/getAllGuides')}>Get All Guides</button>
      <button onClick={() => handleRequest1(`/updateGuide/${Guide1Id}`, 'put', rawJson)}>Update Guide</button>

      <input 
        type="text" 
        value={Guide1Id} 
        onChange={(e) => setGuide1Id(e.target.value)} 
        placeholder="Enter Guide ID" 
      />

      <hr />

      <h2>Itineraries</h2>
      <button onClick={() => handleRequest1('/createItinerary', 'post', rawJson)}>Create Itinerary</button>
      <button onClick={() => handleRequest1(`/getItinerary/${itineraryId}`)}>Get Itinerary by ID</button>
      <button onClick={() => handleRequest1('/getAllItineraries')}>Get All Itineraries</button>
      <button onClick={() => handleRequest1(`/updateItinerary/${itineraryId}`, 'put', rawJson)}>
        Update Itinerary
      </button>
      <button onClick={() => handleRequest1(`/deleteItinerary/${itineraryId}`, 'delete')}>
        Delete Itinerary
      </button>
      <button onClick={() => handleRequest1(`/getMyItineraries?guideID=${Guide1Id}`)}>
        Get My Itineraries
      </button>
      <input 
        type="text" 
        value={itineraryId} 
        onChange={(e) => setItineraryId(e.target.value)} 
        placeholder="Enter Itinerary ID" 
      />

      <hr />

      <h2>Tourist Itineraries</h2>
      <button onClick={() => handleRequest1('/createChildItinerary', 'post', rawJson)}>Create Tourist Itinerary</button>
      <button onClick={() => handleRequest1(`/getChildItinerary/${childItineraryId}`)}>Get Tourist Itinerary by ID</button>
      <button onClick={() => handleRequest1('/getAllChildIitineraries')}>
         Get All Tourist Itineraries
       </button>
              <button onClick={() => handleRequest1(`/updateChildItinerary/${childItineraryId}`, 'put', rawJson)}>
         Update Tourist Itinerary
       </button>
       <button onClick={() => handleRequest1(`/deleteChildItinerary/${childItineraryId}`, 'delete')}>
         Delete Tourist Itinerary
       </button>
      <input 
        type="text" 
        value={childItineraryId} 
        onChange={(e) => setChildItineraryId(e.target.value)} 
        placeholder="Enter Itinerary ID" 
      />

      <hr />

      <div>
        <h2>Response Data:</h2>
        {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </div>
  );
};

export default TourGuidePage;
