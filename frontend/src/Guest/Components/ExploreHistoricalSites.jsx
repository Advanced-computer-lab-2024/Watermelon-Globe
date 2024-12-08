import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from "../Components/Modal"; // Import a reusable modal component
import { Button } from "../Components/ui/button";

const ExploreHistoricalSites = () => {
  const [sites, setSites] = useState([]);
  const [sitesSearch, setSiteSearch] = useState('');
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState('');
  const [showModal, setShowModal] = useState(false);
  const sitesScrollRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSites();
    fetchTags();
  }, []);

  const fetchSites = async () => {
    try {
      const response = await fetch('/api/governor/getAllSites');
      const data = await response.json();
      setSites(data);
    } catch (error) {
      console.error('Error fetching Sites:', error);
    }
  };

  const fetchTags = async () => {
    try {
      const response = await fetch('/api/Activities/getHistoricalTags');
      const data = await response.json();
      setTags(data);
    } catch (error) {
      console.error('Error fetching tags:', error);
    }
  };

  const handleSiteSearch = (e) => {
    setSiteSearch(e.target.value);
  };

  const handleTagChange = async (event) => {
    const tagId = event.target.value;
    setSelectedTag(tagId);

    if (tagId === "all") {
      fetchSites();
    } else {
      try {
        const response = await fetch(`/api/filter/filterByTags/${tagId}`);
        const filteredSites = await response.json();
        setSites(filteredSites);
      } catch (error) {
        console.error('Error filtering sites:', error);
      }
    }
  };

  const handleSiteClick = (id) => {
    navigate(`/tourist-signup`);
  };

  const handleButtonClick = () => {
    setShowModal(true); // Show the modal when a button is clicked
  };

  const closeModal = () => {
    setShowModal(false); // Close the modal
  };

  const handleSignUpRedirect = () => {
    navigate(`/tourist-signup`);
  };

  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold mb-6">Explore Historical Sites</h2>
      <input
        type="text"
        placeholder="Search sites"
        className="border rounded p-2 mb-4"
        value={sitesSearch}
        onChange={handleSiteSearch}
      />

      <h2>Filter by Tags</h2>
      <select value={selectedTag} onChange={handleTagChange}>
        <option value="">Select a tag</option>
        <option value="all">All</option>
        {tags.map((tag) => (
          <option key={tag._id} value={tag._id}>
            {tag.type}
          </option>
        ))}
      </select>

      <div className="relative">
        <div className="flex overflow-x-auto" ref={sitesScrollRef}>
          {sites.map((site) => (
            <div 
              key={site._id} 
              className="min-w-[250px] rounded-lg overflow-hidden shadow-md mx-2 flex-shrink-0 cursor-pointer"
              onClick={() => handleButtonClick()} // Click handler for navigation
            >
              <div className="p-4">
                <h3 className="font-bold text-lg">{site.name}</h3>
                <p className="text-gray-600">{site.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {showModal && (
        <Modal onClose={closeModal}>
          <div className="p-8  max-w-sm mx-auto">
            <h2 className="text-2xl font-bold text-center text-primary mb-4">Join the Adventure!</h2>
            <p className="text-center text-gray-600 mb-6">Unlock exclusive access to your personal tour guide and travel companion—sign up now to start your journey with us!</p>
            <Button
              onClick={handleSignUpRedirect}
              className="bg-primary text-white font-semibold py-2 px-4 rounded-full w-full transition duration-300 hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50">
              Start Your Adventure
            </Button>
          </div>
        </Modal>
        )}
    </section>
  );
};

export default ExploreHistoricalSites;
