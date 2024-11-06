import { useState, useRef, useEffect } from "react";
import './styles.css';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {useParams, useNavigate } from 'react-router-dom';

// import Homeimg from './homeback.jpg';
// import flightimg from './jason-rosewell-P5aY_FocXAI-unsplash (1).jpg';
// import carrent from './carrent.jpg';
// import villa1 from './villa1.jpg';
// import villa4 from './donor1.jpg';

export default function HomePage() {
const { id } = useParams()
  const navigate = useNavigate();
  const [destination, setDestination] = useState('');
  const [dates, setDates] = useState('');
  const [guests, setGuests] = useState('');
  const [tripSearch, setTripSearch] = useState('');
  const [tripFilter, setTripFilter] = useState('all');
  const [activitySearch, setActivitySearch] = useState('');
  const [activityFilter, setActivityFilter] = useState('all');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000); // Set max price as required
  const [languageOfTour, setLanguageOfTour] = useState('');
  const [itineraries, setItineraries] = useState([]);
  const [sites,setSites]=useState([]);
  const [sitesSearch, setSiteSearch] = useState('');
  const [siteFilter, setSiteFilter] = useState('all');


 // const [minPrice, setMinPrice] = useState('');
 // const [maxPrice, setMaxPrice] = useState('');
  

 //const [tripTypes, setTripTypes] = useState([]);


  //const [tripTypes, setTripTypes] = useState([]);

  const [trips, setTrips] = useState([]); // State for trips
  const [activities, setActivities] = useState([]); // State for activities

  const tripScrollRef = useRef(null);
  const activitiesScrollRef = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', { destination, dates, guests });
  };

  const handleSiteSearch =(e) =>{
   setSiteSearch(e.target.value);
  }

  const handleTripSearch = (e) => {
    setTripSearch(e.target.value);
  };


  const handleActivitySearch = (e) => {
    setActivitySearch(e.target.value);
  };

  const handleActivityFilter = (e) => {
    setActivityFilter(e.target.value);
  };

  const handleSiteFilter =(e)=>{
    setSiteFilter(e.target.value);
  }

  const handleFilter = async () => {
    const params = {
      startDate: startDate ? startDate.toISOString() : null,
      endDate: endDate ? endDate.toISOString() : null,
      languageOfTour,
      minPrice,
      maxPrice,
    };
  
    try {
      const response = await axios.get('/itineraryFilter', { params });
  
      if (response.data && response.data.length > 0) {
        setItineraries(response.data);
      } else {
        setItineraries([]); // Empty result case
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log('No itineraries found, setting itineraries to an empty array');
        setItineraries([]); // Handling 404 error, setting empty array
      } else {
        console.error("Error fetching itineraries", error);
      }
    }
  };
  
const fetchTrips = async () => {
  try {
    const response = await fetch('/getAllItineraries'); // Replace with your actual API endpoint
    const data = await response.json();
    setItineraries(data); // Assuming data is an array of trips
  } catch (error) {
    console.error('Error fetching trips:', error);
  }
};
  // Fetch trips and activities from the backend
  useEffect(() => {
    fetchTrips();
    

    const fetchActivities = async () => {
      try {
        const response = await fetch('/getActivities'); // Replace with your actual API endpoint
        const data = await response.json();
        setActivities(data); // Assuming data is an array of activities
        activities=data;
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    };

    const fetchSites= async()=>{
      try{
        const response = await fetch('/getAllSites');
        const data = await response.json();
        setSites(data);
        sites=data;
      }
      catch(error){
        console.error('Error fetching Sites');
      }
    }

    fetchTrips();
    fetchActivities();
    fetchSites();
  }, []);

  const resetFiltersAndFetchAll = () => {
    setStartDate(null);
    setEndDate(null);
    setMinPrice(0);
    setMaxPrice(1000); // Reset to the initial max value
    setLanguageOfTour('');
    setTripSearch('');
    setTripFilter('all');
   
    
    fetchTrips(); // Fetch all trips after resetting filters
  };

  const filteredItineraries = itineraries.filter(trip =>
    trip.name.toLowerCase().includes(tripSearch.toLowerCase())
  );

  const handleTripClick = (tripId) => {
    navigate(`/itineraryDetails/${tripId}`);
  };

  
  




  //Filter and search activities
  // const filteredActivities = activities.filter(activity => 
  //   (activityFilter === 'all' && activity.name.toLowerCase().includes(activitySearch.toLowerCase()) 
  //   )
  //);

  // Scroll functions
  const scrollLeft = (ref) => {
    ref.current.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = (ref) => {
    ref.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-md">
        <nav className="container mx-auto px-9 py-9 flex justify-between items-center">
          <div className="text-2xl font-bold">WaterMelon Globe</div>
          <div className="hidden md:flex space-x-4">
            <a href="#" className="text-gray-600 hover:text-gray-900">Hotel</a>
            <a href="#" className="text-gray-600 hover:text-gray-900">Flight</a>
            <a href="#" className="text-gray-600 hover:text-gray-900">Train</a>
            <a href="#" className="text-gray-600 hover:text-gray-900">Travel</a>
            <a href="#" className="text-gray-600 hover:text-gray-900">Car Rental</a>
            <a href="#" onClick={() => navigate(`/RatingsAndCommentsPage/${id}`)} className="text-gray-600 hover:text-gray-900">Ratings & Comments</a>
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-9 py-1 border rounded">EN</button>
            <button onClick={()=> navigate ('/')}className="px-9 py-1 border rounded">Log out</button>
            <button onClick={() => navigate(`/TouristDetails/${id}`)}className="px-9 py-1 bg-blue-600 text-white rounded">View Profile</button>
          </div>
        </nav>
      </header>

      <main className="flex-grow">
        <section className="relative h-[600px] flex items-center justify-center text-center text-white">
          <div 
            className="absolute inset-0 bg-cover bg-center" 
        //    style={{backgroundImage: `url(${Homeimg})`}}
          ></div>
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="relative z-10 max-w-4xl mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Discover Your Next Great Adventure</h1>
            <p className="text-xl mb-8">Immerse yourself in the wonders of the world with our handpicked selection of unforgettable journeys</p>
          </div>
        </section>

        <section className="container mx-auto px-4 -mt-16 relative z-20">
          <form onSubmit={handleSearch} className="bg-white rounded-lg shadow-lg p-6 flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-1">Find Location</label>
              <input
                type="text"
                id="destination"
                placeholder="Where are you going?"
                className="w-full p-2 border rounded"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
            <div className="flex-1 min-w-[200px]">
              <label htmlFor="dates" className="block text-sm font-medium text-gray-700 mb-1">Check in and Check out date</label>
              <input
                type="text"
                id="dates"
                placeholder="Add dates"
                className="w-full p-2 border rounded"
                value={dates}
                onChange={(e) => setDates(e.target.value)}
              />
            </div>
            <div className="flex-1 min-w-[200px]">
              <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-1">Special Travels</label>
              <select
                id="guests"
                className="w-full p-2 border rounded"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
              >
                <option value="">Add guests</option>
                <option value="1">1 Guest</option>
                <option value="2">2 Guests</option>
                <option value="3">3 Guests</option>
                <option value="4">4+ Guests</option>
              </select>
            </div>
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors">
              Search
            </button>
          </form>
        </section>

        <section className="container mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold mb-6">Exclusive deals just for you!</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-100 rounded-lg overflow-hidden shadow-md">
              {/* <img src={flightimg} alt="Exclusive Flight Deal" className="w-full h-48 object-cover" /> */}
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">Exclusive Flight Deals Just For You!</h3>
                <p className="text-blue-600 font-bold">50% Off</p>
              </div>
            </div>
            <div className="bg-gray-100 rounded-lg overflow-hidden shadow-md">
              {/* <img src={carrent} alt="Exclusive Rental Deal" className="w-full h-48 object-cover" /> */}
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">Exclusive Rental Deals Just For You!</h3>
                <p className="text-blue-600 font-bold">25% Off</p>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold mb-6">Explore Trips</h2>
          <input
            type="text"
            placeholder="Search trips"
            className="border rounded p-2 mb-4"
            value={tripSearch}
            onChange={handleTripSearch}

          />
         
<div>
            <h1>Filter Itineraries</h1>

            <div>
    {/* Date Range Filter */}
    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <div>
            <label>Start Date:</label>
            <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
        </div>

        <div>
            <label>End Date:</label>
            <DatePicker selected={endDate} onChange={date => setEndDate(date)} />
        </div>
    </div>

    {/* Price Range Filter */}
    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <div>
            <label>Min Price:</label>
            <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
            />
        </div>

        <div>
            <label>Max Price:</label>
            <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
            />
        </div>
    </div>

    {/* Language Filter */}
    <div style={{ marginBottom: '1rem' }}>
        <label>Language of Tour:</label>
        <input
            type="text"
            value={languageOfTour}
            onChange={(e) => setLanguageOfTour(e.target.value)}
        />
    </div>
</div>
      

            <button  className="border rounded w-24 p-2 mb-4" onClick={handleFilter}>Filter Itineraries</button>
            <button  className="border rounded w-24 p-50 mb-4" onClick={resetFiltersAndFetchAll}>All</button>


           
        </div>
{/* 

*/}

          {/* <select
            className="border rounded p-2 mb-4"
            value={tripFilter}
            onChange={handleTripFilter}
          >
            <option value="all">All</option>
            <option value="beach">0-200</option>
            <option value="mountain">200-1000</option>
            <option value="adventure">1000-2000</option>
          </select> */}
              {/* <select
                  className="border rounded p-2 mb-4"
                  value={tripFilter}
                  onChange={handleTripFilter}
                >
                  <option value="all">All</option>
                  {tripTypes.map((priceOfTour, index) => (
                    <option key={index} value={priceOfTour}>
                      {priceOfTour}
                    </option>
                  ))}
                </select> */}
          <div className="flex overflow-x-auto" ref={tripScrollRef}>
            {filteredItineraries.map((trip) => (
              <div key={trip.id} 
              className="min-w-[250px] rounded-lg overflow-hidden shadow-md mx-2"
              onClick={() => handleTripClick(trip._id)}>
                <img src={trip.image} alt={trip.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="font-bold text-lg">{trip.name}</h3>
                  <p className="text-gray-600">{trip.location}</p>
                  <p className="text-blue-600 font-bold">{trip.price}</p>
                </div>
              </div>
            ))}
            <button onClick={() => scrollLeft(tripScrollRef)} className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full">◀</button>
            <button onClick={() => scrollRight(tripScrollRef)} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full">▶</button>
          </div>
        </section>

        <section className="container mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold mb-6">Explore Activities</h2>
          <input
            type="text"
            placeholder="Search activities"
            className="border rounded p-2 mb-4"
            value={activitySearch}
            onChange={handleActivitySearch}
          />
          <select
            className="border rounded p-2 mb-4"
            value={activityFilter}
            onChange={handleActivityFilter}
          >
            <option value="all">All</option>
            <option value="adventure">Adventure</option>
            <option value="relaxation">Relaxation</option>
            <option value="culture">Culture</option>
          </select>
          <div className="flex overflow-x-auto" ref={activitiesScrollRef}>
            {activities.map((activity) => (
              <div key={activity.id} className="min-w-[250px] rounded-lg overflow-hidden shadow-md mx-2">
                <img src={activity.image} alt={activity.Category} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="font-bold text-lg">{activity.name}</h3>
                  <p className="text-gray-600">{activity.location}</p>
                  <p className="text-blue-600 font-bold">{activity.price}</p>
                </div>
              </div>
            ))}
            <button onClick={() => scrollLeft(activitiesScrollRef)} className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full">◀</button>
            <button onClick={() => scrollRight(activitiesScrollRef)} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full">▶</button>
          </div>
        </section>

        <section className="container mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold mb-6">Explore Historical Sites</h2>
          <input
            type="text"
            placeholder="Search sites"
            className="border rounded p-2 mb-4"
            value={sitesSearch}
            onChange={handleSiteSearch}
          />
          <select
            className="border rounded p-2 mb-4"
            value={activityFilter}
            onChange={handleSiteFilter}
          >
            <option value="all">All</option>
            <option value="adventure">Adventure</option>
            <option value="relaxation">Relaxation</option>
            <option value="culture">Culture</option>
          </select>
          <div className="flex overflow-x-auto" ref={activitiesScrollRef}>
            {sites.map((site) => (
              <div key={site.id} className="min-w-[250px] rounded-lg overflow-hidden shadow-md mx-2">
                {/* <img src={activity.image} alt={activity.Category} className="w-full h-48 object-cover" /> */}
                <div className="p-4">
                  <h3 className="font-bold text-lg">{site.name}</h3>
                  {/* <p className="text-gray-600">{activity.location}</p>
                  <p className="text-blue-600 font-bold">{activity.price}</p> */}
                </div>
              </div>
            ))}
            <button onClick={() => scrollLeft(activitiesScrollRef)} className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full">◀</button>
            <button onClick={() => scrollRight(activitiesScrollRef)} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full">▶</button>
          </div>
        </section>

      </main>

      <footer className="bg-gray-800 text-white py-4 text-center">
        <p>&copy; 2023 WaterMelon Globe. All rights reserved.</p>
      </footer>
    </div>
  );
}
