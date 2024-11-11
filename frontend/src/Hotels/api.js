// api.js

import axios from 'axios';


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

// Step 1: Fetch hotel IDs by city

export const getHotelIdsByCity = async (token, cityCode) => {
    try {
        const response = await axios.get(
            `https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city`, 
            {
                params: {
                    cityCode: cityCode,    // city code (e.g., 'PAR' for Paris)
                    radius: 5,             // radius in kilometers to search for hotels
                    radiusUnit: 'KM',
                    hotelSource: 'ALL',    // Include all sources of hotels
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        // Map through the response data to structure the hotel information
        return response.data.data.map(hotel => ({
            id: hotel.hotelId,  // Hotel ID is 'hotelId' in the response
            name: hotel.name,   // Hotel name is 'name' in the response
            location: hotel.address.countryCode,  // Location (country code) is in the 'address'
            distance: hotel.distance ? `${hotel.distance.value} ${hotel.distance.unit}` : 'N/A',  // Distance info from city center
            latitude: hotel.geoCode.latitude,  // Latitude from 'geoCode'
            longitude: hotel.geoCode.longitude, // Longitude from 'geoCode'
        }));
    } catch (error) {
        console.error("Error fetching hotel data:", error);
        return [];  // Return an empty array if there's an error
    }
};



// Step 2: Fetch hotel offers by hotel IDs
export const getHotelOffersById = async ({
    token,
    hotelIds,
    checkInDate,
    checkOutDate,
    adults = 1,
    roomQuantity = 1,
    priceRange,
    rating,
    currency = 'USD',
}) => {
    const url = `https://test.api.amadeus.com/v3/shopping/hotel-offers?hotelIds=${hotelIds.join(',')}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&adults=${adults}&roomQuantity=${roomQuantity}&currency=${currency}`;

    if (priceRange) url += `&priceRange=${priceRange}`;
    if (rating) url += `&rating=${rating}`;

    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) throw new Error('Failed to fetch hotel offers');

    const data = await response.json();
    return data.data; // Adjust based on Amadeus response structure
};
