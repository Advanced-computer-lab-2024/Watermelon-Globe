export const fetchAccessToken = async () => {
    const response = await fetch('https://test.api.amadeus.com/v1/security/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: 'JqFVpFzJdoaqMJhAYG9SbcgiHbKGOWWl',
        client_secret: 'hwuh05PDn0AlbYwU',
        grant_type: 'client_credentials',
      }),
    });
    
    const data = await response.json();
    return data.access_token;
  };
  
  export const searchFlights = async (token, origin, destination, departureDate, returnDate) => {
    const response = await fetch(
      `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${origin}&destinationLocationCode=${destination}&departureDate=${departureDate}&adults=1&nonStop=false&max=250`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    
    const data = await response.json();
    return data.data;  // Adjust this based on Amadeus API response structure
  };
  
  export const bookFlight = async (token, flightId, passengerName) => {
    const response = await fetch(
      `https://test.api.amadeus.com/v2/booking/flights/${flightId}/book`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          passengerName,
        }),
      }
    );
    
    const data = await response.json();
    return data;  // Adjust based on booking API response
  };
  