import React, { useState } from 'react';
import { searchFlights } from '../api';
import { format } from 'date-fns';
import { Plane, Calendar, Users, CreditCard } from 'lucide-react';
import { FaCalendarAlt , FaSearch} from 'react-icons/fa'
import CabinClassSelector from './CabinClassSelector'; // Import the CabinClassSelector component
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import the datepicker CSS

interface FlightSearchProps {
  token: string;
  setFlights: (flights: any[]) => void;
}

const FlightSearch: React.FC<FlightSearchProps> = ({ token, setFlights }) => {
  const [origin, setOrigin] = useState<string>('');
  const [destination, setDestination] = useState<string>('');
  const [departureDate, setDepartureDate] = useState<string>('');
  const [returnDate, setReturnDate] = useState<string>('');
  const [adults, setAdults] = useState<number>(1);
  const [children, setChildren] = useState<number>(0);
  const [infants, setInfants] = useState<number>(0);
  const [travelClass, setTravelClass] = useState<string>('ECONOMY');
  const [nonStop, setNonStop] = useState<boolean>(false);
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleSearch = async () => {
    if (!origin || !destination || !departureDate) {
      setMessage('Please fill in the origin, destination, and departure date.');
      return;
    }

    try {
      const flights = await searchFlights({
        token,
        origin,
        destination,
        departureDate,
        returnDate: returnDate || undefined,
        adults,
        children,
        infants,
        travelClass,
        nonStop,
        maxPrice: maxPrice ? parseInt(maxPrice, 10) : undefined,
      });

      if (flights.length === 0) {
        setMessage('No flights found.');
      } else {
        setMessage('');
      }

      setFlights(flights);
    } catch (error) {
      console.error('Error fetching flight offers:', error);
      setMessage('An error occurred while fetching flights.');
    }
  };

  return (
    <div className="space-y-6 p-6 bg-cardBackground rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="origin" className="block text-sm font-medium text-gray-600">From</label>
          <input
            id="origin"
            type="text"
            placeholder="Enter city code (e.g., CAI)"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            className="w-full px-3 py-2 border border-lightGray rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary bg-white text-black"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="destination" className="block text-sm font-medium text-gray-600">To</label>
          <input
            id="destination"
            type="text"
            placeholder="Enter city code (e.g., JED)"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full px-3 py-2 border border-lightGray rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary bg-white text-black"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="departureDate" className="block text-sm font-medium text-gray-600">Departure Date</label>
          <div className="relative">
            <DatePicker
              selected={departureDate ? new Date(departureDate) : new Date()}
              onChange={(date: Date | null) => setDepartureDate(date ? format(date, 'yyyy-MM-dd') : '')}
              className="w-full px-3 py-2 pl-10 border border-lightGray rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary bg-white text-black"
            />
            <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <input
          id="non-stop"
          type="checkbox"
          checked={nonStop}
          onChange={(e) => setNonStop(e.target.checked)}
          className="h-4 w-4 peer text-primary focus:ring-primary border-lightGray rounded bg-lightGray peer-checked:bg-primary peer-checked:border-primary"
        />
        <label htmlFor="non-stop" className="text-sm font-medium text-gray-600">
          Direct flights only
        </label>
      </div>



      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label htmlFor="adults" className="block text-sm font-medium text-gray-600">Adults</label>
          <input
            id="adults"
            type="number"
            min="1"
            value={adults}
            onChange={(e) => setAdults(parseInt(e.target.value, 10))}
            className="w-full px-3 py-2 border border-lightGray rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary bg-white text-black"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="children" className="block text-sm font-medium text-gray-600">Children</label>
          <input
            id="children"
            type="number"
            min="0"
            value={children}
            onChange={(e) => setChildren(parseInt(e.target.value, 10))}
            className="w-full px-3 py-2 border border-lightGray rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary bg-white text-black"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="class" className="block text-sm font-medium text-gray-600">Class</label>
          <select
            id="class"
            value={travelClass}
            onChange={(e) => setTravelClass(e.target.value)}
            className="w-full px-3 py-2 border border-lightGray rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary bg-white text-black"
          >
            <option value="ECONOMY">Economy</option>
            <option value="PREMIUM_ECONOMY">Premium Economy</option>
            <option value="BUSINESS">Business</option>
            <option value="FIRST">First</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-600">Max Price</label>
        <input
          id="maxPrice"
          type="number"
          min="0"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          placeholder="Enter maximum price"
          className="w-full px-3 py-2 border border-lightGray rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary bg-white text-black"
        />
      </div>

      <button
        onClick={handleSearch}
        className="w-full bg-secondary text-white py-2 px-4 rounded-lg hover:bg-secondaryHover focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 transition-colors text-2xl font-semibold shadow-md hover:shadow-lg"
      >
        <FaSearch className="inline-block mr-2 mb-1" /> Search Flights
      </button>

      {message && <p className="text-darkPink mt-4 text-center">{message}</p>}
    </div>
  );
}

export default FlightSearch;
