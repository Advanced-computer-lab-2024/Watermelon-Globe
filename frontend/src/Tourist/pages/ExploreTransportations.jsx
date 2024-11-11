import React, { useState, useEffect } from 'react';

const ExploreTransportations = () => {
  const [transportations, setTransportations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchTransportations();
  }, []);

  const fetchTransportations = async () => {
    try {
      const response = await fetch('/api/transportation/getAllTransportations');
      const data = await response.json();
      setTransportations(data);
    } catch (error) {
      console.error('Error fetching transportations:', error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredTransportations = transportations.filter((transportation) =>
    transportation.destination.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold mb-6">Explore Transportations</h2>
      
      <input
        type="text"
        placeholder="Search by destination"
        className="border rounded p-2 mb-4"
        value={searchTerm}
        onChange={handleSearch}
      />

      <div className="relative">
        <div className="flex overflow-x-auto">
          {filteredTransportations.map((transportation) => (
            <div 
              key={transportation._id} 
              className="min-w-[250px] rounded-lg overflow-hidden shadow-md mx-2 flex-shrink-0"
            >
              <div className="p-4">
                <h3 className="font-bold text-lg">{transportation.type}</h3>
                <p className="text-gray-600">Destination: {transportation.destination}</p>
                <p className="text-gray-600">Price: ${transportation.price}</p>
                <p className="text-gray-600">Booking Date: {new Date(transportation.bookingDate).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExploreTransportations;
