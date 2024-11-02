import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export function ExploreTrips() {
  const navigate = useNavigate();
  const [tripSearch, setTripSearch] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [languageOfTour, setLanguageOfTour] = useState('');
  const [itineraries, setItineraries] = useState([]);
  const tripScrollRef = useRef(null);

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      const response = await fetch('/getAllItineraries');
      const data = await response.json();
      setItineraries(data);
    } catch (error) {
      console.error('Error fetching trips:', error);
    }
  };

  const handleFilter = async () => {
    const params = new URLSearchParams({
      startDate: startDate ? startDate.toISOString() : '',
      endDate: endDate ? endDate.toISOString() : '',
      languageOfTour,
      minPrice: minPrice.toString(),
      maxPrice: maxPrice.toString(),
    });

    try {
      const response = await fetch(`/itineraryFilter?${params}`);
      const data = await response.json();
      setItineraries(data);
    } catch (error) {
      console.error("Error fetching itineraries", error);
    }
  };

  const resetFiltersAndFetchAll = () => {
    setStartDate(null);
    setEndDate(null);
    setMinPrice(0);
    setMaxPrice(1000);
    setLanguageOfTour('');
    setTripSearch('');
    fetchTrips();
  };

  const filteredItineraries = itineraries.filter(trip =>
    trip.name.toLowerCase().includes(tripSearch.toLowerCase())
  );

  const handleTripClick = (tripId) => {
    navigate(`/itineraryDetails/${tripId}`);
  };

  const scrollLeft = () => {
    tripScrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    tripScrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold mb-6">Explore Trips</h2>
      <input
        type="text"
        placeholder="Search trips"
        className="border rounded p-2 mb-4"
        value={tripSearch}
        onChange={(e) => setTripSearch(e.target.value)}
      />
      <div>
        <h3 className="text-xl font-bold mb-4">Filter Itineraries</h3>
        <div className="flex flex-wrap gap-4 mb-4">
          <div>
            <label className="block mb-1">Start Date:</label>
            <DatePicker selected={startDate} onChange={date => setStartDate(date)} className="border rounded p-2" />
          </div>
          <div>
            <label className="block mb-1">End Date:</label>
            <DatePicker selected={endDate} onChange={date => setEndDate(date)} className="border rounded p-2" />
          </div>
          <div>
            <label className="block mb-1">Min Price:</label>
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="border rounded p-2"
            />
          </div>
          <div>
            <label className="block mb-1">Max Price:</label>
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="border rounded p-2"
            />
          </div>
          <div>
            <label className="block mb-1">Language of Tour:</label>
            <input
              type="text"
              value={languageOfTour}
              onChange={(e) => setLanguageOfTour(e.target.value)}
              className="border rounded p-2"
            />
          </div>
        </div>
        <div className="flex gap-4 mb-6">
          <button className="border rounded px-4 py-2 bg-blue-600 text-white" onClick={handleFilter}>Filter Itineraries</button>
          <button className="border rounded px-4 py-2" onClick={resetFiltersAndFetchAll}>Reset Filters</button>
        </div>
      </div>
      <div className="relative">
        <div className="flex overflow-x-auto" ref={tripScrollRef}>
          {filteredItineraries.map((trip) => (
            <div key={trip._id} 
              className="min-w-[250px] rounded-lg overflow-hidden shadow-md mx-2 cursor-pointer"
              onClick={() => handleTripClick(trip._id)}>
              <img src={trip.image || "/placeholder.svg?height=200&width=250"} alt={trip.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="font-bold text-lg">{trip.name}</h3>
                <p className="text-gray-600">{trip.location}</p>
                <p className="text-blue-600 font-bold">{trip.price}</p>
              </div>
            </div>
          ))}
        </div>
        <button onClick={scrollLeft} className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full">◀</button>
        <button onClick={scrollRight} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full">▶</button>
      </div>
    </section>
  );
}

export function ExploreActivities() {
  const [activitySearch, setActivitySearch] = useState('');
  const [activityFilter, setActivityFilter] = useState('all');
  const [activities, setActivities] = useState([]);
  const activitiesScrollRef = useRef(null);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const response = await fetch('/getActivities');
      const data = await response.json();
      setActivities(data);
    } catch (error) {
      console.error('Error fetching activities:', error);
    }
  };

  const filteredActivities = activities.filter(activity =>
    activity.name.toLowerCase().includes(activitySearch.toLowerCase()) &&
    (activityFilter === 'all' || activity.category === activityFilter)
  );

  const scrollLeft = () => {
    activitiesScrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    activitiesScrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold mb-6">Explore Activities</h2>
      <input
        type="text"
        placeholder="Search activities"
        className="border rounded p-2 mb-4"
        value={activitySearch}
        onChange={(e) => setActivitySearch(e.target.value)}
      />
      <select
        className="border rounded p-2 mb-4"
        value={activityFilter}
        onChange={(e) =>   setActivityFilter(e.target.value)}
      >
        <option value="all">All</option>
        <option value="adventure">Adventure</option>
        <option value="relaxation">Relaxation</option>
        <option value="culture">Culture</option>
      </select>
      <div className="relative">
        <div className="flex overflow-x-auto" ref={activitiesScrollRef}>
          {filteredActivities.map((activity) => (
            <div key={activity.id} className="min-w-[250px] rounded-lg overflow-hidden shadow-md mx-2">
              <img src={activity.image || "/placeholder.svg?height=200&width=250"} alt={activity.category} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="font-bold text-lg">{activity.name}</h3>
                <p className="text-gray-600">{activity.location}</p>
                <p className="text-blue-600 font-bold">{activity.price}</p>
              </div>
            </div>
          ))}
        </div>
        <button onClick={scrollLeft} className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full">◀</button>
        <button onClick={scrollRight} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full">▶</button>
      </div>
    </section>
  );
}

export function ExploreHistoricalSites() {
  const [sitesSearch, setSitesSearch] = useState('');
  const [siteFilter, setSiteFilter] = useState('all');
  const [sites, setSites] = useState([]);
  const sitesScrollRef = useRef(null);

  useEffect(() => {
    fetchSites();
  }, []);

  const fetchSites = async () => {
    try {
      const response = await fetch('/getAllSites');
      const data = await response.json();
      setSites(data);
    } catch (error) {
      console.error('Error fetching Sites:', error);
    }
  };

  const filteredSites = sites.filter(site =>
    site.name.toLowerCase().includes(sitesSearch.toLowerCase()) &&
    (siteFilter === 'all' || site.category === siteFilter)
  );

  const scrollLeft = () => {
    sitesScrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    sitesScrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold mb-6">Explore Historical Sites</h2>
      <input
        type="text"
        placeholder="Search sites"
        className="border rounded p-2 mb-4"
        value={sitesSearch}
        onChange={(e) => setSitesSearch(e.target.value)}
      />
      <select
        className="border rounded p-2 mb-4"
        value={siteFilter}
        onChange={(e) => setSiteFilter(e.target.value)}
      >
        <option value="all">All</option>
        <option value="ancient">Ancient</option>
        <option value="medieval">Medieval</option>
        <option value="modern">Modern</option>
      </select>
      <div className="relative">
        <div className="flex overflow-x-auto" ref={sitesScrollRef}>
          {filteredSites.map((site) => (
            <div key={site.id} className="min-w-[250px] rounded-lg overflow-hidden shadow-md mx-2">
              <img src={site.image || "/placeholder.svg?height=200&width=250"} alt={site.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="font-bold text-lg">{site.name}</h3>
                <p className="text-gray-600">{site.location}</p>
              </div>
            </div>
          ))}
        </div>
        <button onClick={scrollLeft} className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full">◀</button>
        <button onClick={scrollRight} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full">▶</button>
      </div>
    </section>
  );
}