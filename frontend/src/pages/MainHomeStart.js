import { useState, useRef, useEffect } from "react";
import './styles.css';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
// import { ChevronLeft, ChevronRight } from 'lucide-react';
import './Navbar.css';
import Navbar from './Navbar.jsx';

export default function HomePage() {
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
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [startDateActivity, setStartDateActivity] = useState(null);
  const [endDateActivity, setEndDateActivity] = useState(null);
  const [minPriceActivity, setMinPriceActivity] = useState(null);
  const [maxPriceActivity, setMaxPriceActivity] = useState(null);
  const [ratingActivity, setRatingActivity] = useState(null);
  const [languageOfTour, setLanguageOfTour] = useState('');
  const [itineraries, setItineraries] = useState([]);
  const [sites, setSites] = useState([]);
  const [sitesSearch, setSiteSearch] = useState('');
  const [siteFilter, setSiteFilter] = useState('all');
  const [activities, setActivities] = useState([]);
  const [tripSort, setTripSort] = useState('');
  const [activitySort, setActivitySort] = useState('');
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState('');
  const [filteredSites2, setFilteredSites2] = useState([]);
  const [prefItinerary, setPrefItinerary] = useState([]);
  const [selectedPrefItinerary, setSelectedPrefItinerary] = useState('');

  const tripScrollRef = useRef(null);
  const activitiesScrollRef = useRef(null);

  const 
  
handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', { destination, dates, guests });
  };

  const handleSiteSearch = (e) => {
    setSiteSearch(e.target.value);
  };

  const handleTripSearch = (e) => {
    setTripSearch(e.target.value);
  };

  const handleActivitySearch = (e) => {
    setActivitySearch(e.target.value);
  };

  const handleActivityFilter = (e) => {
    setActivityFilter(e.target.value);
  };

  const handleSiteFilter = (e) => {
    setSiteFilter(e.target.value);
  };

  const handleFilter = async () => {
    const formatDate = (date) => {
      if (!date) return null;
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-based
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };
    
    const params = {
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
      languageOfTour,
      minPrice,
      maxPrice,
    };
    

    try {
      const response = await axios.get('/itineraryFilter', { params });
      if (response==null) {
        setItineraries([]); 
      } else {
        setItineraries(response.data);}
    } catch (error) {
      console.error("Error fetching itineraries", error);
    }
  };

  const handleTagChange = async (event) => {
    const tagId = event.target.value;
    setSelectedTag(tagId);

    

  if (tagId === "all") {
    fetchSites();
  }
  else{


    if (tagId) {
      try {
        const response = await fetch(`/filterByTags/${tagId}`); // Adjust API endpoint as necessary
        const sites = await response.json();
        setFilteredSites2(sites);
      } catch (error) {
        console.error('Error filtering sites:', error);
      }
    } else {
      setFilteredSites2([]); // Reset filtered sites if no tag is selected
    }
  };}

  const handlePrefIChange = async (event) => {
    const tagId = event.target.value;
    setSelectedTag(tagId);

    

  if (tagId === "all") {
    fetchTrips();
  }
  else{


    if (tagId) {
      try {
        const response = await fetch(`/filterByPreferenceItineraries/${tagId}`); // Adjust API endpoint as necessary
        const trips = await response.json();
        setItineraries(trips);
      } catch (error) {
        console.error('Error filtering sites:', error);
      }
    } else {
      setItineraries([]); // Reset filtered sites if no tag is selected
    }
  };}

  const handlePrefAChange = async (event) => {
    const tagId = event.target.value;
    setSelectedTag(tagId);

    

  if (tagId === "all") {
    fetchActivities();
  }
  else{


    if (tagId) {
      try {
        const response = await fetch(`/filterByPreferenceItineraries/${tagId}`); // Adjust API endpoint as necessary
        const trips = await response.json();
        setItineraries(trips);
      } catch (error) {
        console.error('Error filtering sites:', error);
      }
    } else {
      setItineraries([]); // Reset filtered sites if no tag is selected
    }
  };}

  const handleFilterActivity = async () => {
    const formatDate = (date) => {
      if (!date) return null;
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-based
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };
    
    const params = {
      startDateActivity: formatDate(startDate),
      endDateActivity: formatDate(endDate),
      minPriceActivity,
      maxPriceActivity,
      ratingActivity

      
    };
    

    try {
      const response = await axios.get('/filterActivities', { params });
      if (response==null) {
        setActivities([]); 
      } else {
        setActivities(response.data);}
    } catch (error) {
      console.error("Error fetching activities", error);
    }
  };

  const fetchTrips = async () => {
    try {
      const response = await fetch('/getAllItineraries');
      const data = await response.json();
      setItineraries(data);
    } catch (error) {
      console.error('Error fetching trips:', error);
    }
  };
  const fetchSites = async () => {
    try {
      const response = await fetch('/getAllSites');
      const data = await response.json();
      setFilteredSites2(data);
    } catch (error) {
      console.error('Error fetching Sites:', error);
    }
  };

  const fetchActivities = async () => {
    try {
      const response = await fetch('/getActivitiesNew');
      const data = await response.json();
      setActivities(data);
    } catch (error) {
      console.error('Error fetching activities:', error);
    }
  };


  useEffect(() => {
    fetchTrips();

    const fetchTags = async () => {
      try {
        const response = await fetch('/getTags'); // Adjust the endpoint according to your API
        const data = await response.json();
        setTags(data);
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    };

    const fetchPref =async()=>{
      try {
        const response = await fetch('/api/Admin/PreferenceTag'); // Adjust the endpoint according to your API
        const data = await response.json();
        setPrefItinerary(data);
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    }
    fetchPref();

    fetchTags();
  
    fetchActivities();
    fetchSites();
  }, []);

  const resetFiltersAndFetchAll = () => {
    setStartDate(null);
    setEndDate(null);
    setMinPrice(null);
    setMaxPrice(null);
    setLanguageOfTour('');
    setTripSearch('');
    setTripFilter('all');
    fetchTrips();
  };

  const resetFiltersAndFetchAllActivity = () => {
    setStartDateActivity(null);
    setEndDateActivity(null);
    setMinPriceActivity(null);
    setMaxPriceActivity(null);

    setActivitySearch('');
    setActivityFilter('all');
    fetchActivities();
  };

  const filteredItineraries = itineraries.filter(trip =>
    trip && trip.name && trip.name.toLowerCase().includes(tripSearch.toLowerCase())
  );

  const filteredSites = sites.filter(site =>
    site && site.name && site.name.toLowerCase().includes(sitesSearch.toLowerCase())
  );

  const sortedItineraries = [...itineraries].sort((a, b) => {
    if (tripSort === 'priceAsc') return (a.priceOfTour || 0) - (b.priceOfTour || 0);
    if (tripSort === 'priceDesc') return (b.priceOfTour || 0) - (a.priceOfTour || 0);
    if (tripSort === 'ratingAsc') return (a.rating || 0) - (b.rating || 0);
    if (tripSort === 'ratingDesc') return (b.rating || 0) - (a.rating || 0);
    return 0;
  });

  // const filteredActivities = activities.filter(activity =>
  //   activity && activity.name && activity.name.toLowerCase().includes(activitySearch.toLowerCase()) &&
  //   (activityFilter === 'all' || activity.category === activityFilter)
  // );

  // const sortedActivities = [...filteredActivities].sort((a, b) => {
  //   if (activitySort === 'priceAsc') return (a.price || 0) - (b.price || 0);
  //   if (activitySort === 'priceDesc') return (b.price || 0) - (a.price || 0);
  //   if (activitySort === 'ratingAsc') return (a.rating || 0) - (b.rating || 0);
  //   if (activitySort === 'ratingDesc') return (b.rating || 0) - (a.rating || 0);
  //   return 0;
  // });

  const handleTripClick = (tripId) => {
    navigate(`/itineraryDetails/${tripId}`);
  };

  const scrollLeft = (ref) => {
    ref.current.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = (ref) => {
    ref.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      
      <header className="bg-white shadow-md">
      <Navbar />
      </header>

      <main className="flex-grow">
        <section className="relative h-[600px] flex items-center justify-center text-center text-white">
          <div className="absolute inset-0 bg-cover bg-center"></div>
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
          </form>
        </section>

        <section className="container mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold mb-6">Exclusive deals just for you!</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-100 rounded-lg overflow-hidden shadow-md">
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">Exclusive Flight Deals Just For You!</h3>
                <p className="text-blue-600 font-bold">50% Off</p>
              </div>
            </div>
            <div className="bg-gray-100 rounded-lg overflow-hidden shadow-md">
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">Exclusive Rental Deals Just For You!</h3>
                <p className="text-blue-600 font-bold">25% Off</p>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold mb-6">Explore Trips</h2>
          <div className="flex flex-wrap gap-4 mb-4">
            <input
              type="text"
              placeholder="Search trips"
              className="border rounded p-2"
              value={tripSearch}
              onChange={handleTripSearch}
            />
            <select
              className="border rounded p-2"
              value={tripSort}
              onChange={(e) => setTripSort(e.target.value)}
            >
              <option value="">Sort by</option>
              <option value="priceAsc">Price: Low to High</option>
              <option value="priceDesc">Price: High to Low</option>
              <option value="ratingAsc">Rating: Low to High</option>
              <option value="ratingDesc">Rating: High to Low</option>
            </select>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Filter Itineraries</h3>
            <div className="flex flex-wrap gap-4 mb-4">
              <div>
                <label>Start Date:</label>
                <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
              </div>
              <div>
                <label>End Date:</label>
                <DatePicker selected={endDate} onChange={date => setEndDate(date)} />
              </div>
              <div>
                <label>Min Price:</label>
                <input
                  type="number"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="border rounded p-2"
                />
              </div>
              <div>
                <label>Max Price:</label>
                <input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="border rounded p-2"
                />
              </div>
              <div>
                <label>Language of Tour:</label>
                <input
                  type="text"
                  value={languageOfTour}
                  onChange={(e) => setLanguageOfTour(e.target.value)}
                  className="border rounded p-2"
                />
              </div>
            </div>
            <button className="border rounded p-2 mr-2" onClick={handleFilter}>Filter Itineraries</button>
            <button className="border rounded p-2" onClick={resetFiltersAndFetchAll}>All</button>
          </div>

          <h2>Filter by Preference</h2>
          <select value={selectedTag} onChange={handlePrefIChange}>
          <option value="">Select a tag</option>
          <option value="all">All</option> {/* Added 'All' option */}
          {prefItinerary.map((tag) => (
            <option key={tag._id} value={tag._id}>
              {tag.tag}
            </option>
          ))}
        </select>

          <div className="relative mt-4">
            <div className="flex overflow-x-auto" ref={tripScrollRef}>
              {sortedItineraries.map((trip) => (
                <div key={trip._id} 
                  className="min-w-[250px] rounded-lg overflow-hidden shadow-md mx-2 flex-shrink-0"
                  onClick={() => handleTripClick(trip._id)}>
                  <img src={trip.image} alt={trip.name} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="font-bold text-lg">{trip.name}</h3>
                    <p className="text-gray-600">{trip.location}</p>
                    <p className="text-blue-600 font-bold">${trip.priceOfTour}</p>
                    <p className="text-yellow-500">Rating: {trip.rating}/5</p>
                  </div>
                </div>
              ))}
            </div>
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
          {/* <select
            className="border rounded p-2 mb-4"
            value={activityFilter}
            onChange={handleActivityFilter}
          >
            <option value="all">All</option>
            <option value="adventure">Adventure</option>
            <option value="relaxation">Relaxation</option>
            <option value="culture">Culture</option>
          </select> */}


          <div>
            <h3 className="text-xl font-bold mb-4">Filter Activities</h3>
            <div className="flex flex-wrap gap-4 mb-4">
              <div>
                <label>Start Date:</label>
                <DatePicker selected={startDate} onChange={date => setStartDateActivity(date)} />
              </div>
              <div>
                <label>End Date:</label>
                <DatePicker selected={endDate} onChange={date => setEndDateActivity(date)} />
              </div>
              <div>
                <label>Min Price:</label>
                <input
                  type="number"
                  value={minPrice}
                  onChange={(e) => setMinPriceActivity(e.target.value)}
                  className="border rounded p-2"
                />
              </div>
              <div>
                <label>Max Price:</label>
                <input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPriceActivity(e.target.value)}
                  className="border rounded p-2"
                />
              </div>

            </div>
            <button className="border rounded p-2 mr-2" onClick={handleFilterActivity}>Filter Activities</button>
            <button className="border rounded p-2" onClick={resetFiltersAndFetchAllActivity}>All</button>


            <h2>Filter by Preference</h2>
            <select value={selectedTag} onChange={handlePrefAChange}>
            <option value="">Select a tag</option>
            <option value="all">All</option> {/* Added 'All' option */}
            {prefItinerary.map((tag) => (
              <option key={tag._id} value={tag._id}>
                {tag.tag}
              </option>
            ))}
          </select>
{/* 
          </div>
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
            ))} */}
            
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
          {/* <select
            className="border rounded p-2 mb-4"
            value={siteFilter}
            onChange={handleSiteFilter}
          >
            <option value="all">All</option>
            <option value="ancient">Ancient</option>
            <option value="medieval">Medieval</option>
            <option value="modern">Modern</option>
          </select> */}

<h2>Filter by Tags</h2>
<select value={selectedTag} onChange={handleTagChange}>
  <option value="">Select a tag</option>
  <option value="all">All</option> {/* Added 'All' option */}
  {tags.map((tag) => (
    <option key={tag._id} value={tag._id}>
      {tag.type}
    </option>
  ))}
</select>


          <div className="relative">
            <div className="flex overflow-x-auto" ref={activitiesScrollRef}>
              {filteredSites2.map((site) => (
                <div key={site._id} className="min-w-[250px] rounded-lg overflow-hidden shadow-md mx-2 flex-shrink-0">
                  <div className="p-4">
                    <h3 className="font-bold text-lg">{site.name}</h3>
                    <p className="text-gray-600">{site.location}</p>
                   
                  </div>
                </div>
              ))}
            </div>
            {/* <button 
              onClick={() => scrollLeft(activitiesScrollRef)} 
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full shadow-md z-10"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-6 h-6" />
            </button> */}
            {/* <button 
              onClick={() => scrollRight(activitiesScrollRef)} 
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full shadow-md z-10"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-6 h-6" />
            </button> */}
          </div>

        </section>
      </main>

      <footer className="bg-gray-800 text-white py-4 text-center">
        <p>&copy; 2023 WaterMelon Globe. All rights reserved.</p>
      </footer>
    </div>
  );
}