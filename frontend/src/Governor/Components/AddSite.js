import React, { useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../Components/sidebar/Sidebar";
import Navbar from "../Components/navbar/Navbar";
import "./actions.scss";

const CreateSite = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [pictures, setPictures] = useState('');
  const [location, setLocation] = useState('');
  const [openingHours, setOpeningHours] = useState('');
  const [ticketPrices, setTicketPrices] = useState('');
  const [tag, setTag] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { id } = useParams(); // Extract governor ID

  const watermelonGreen = '#4CAF50';
  const watermelonPink = '#FF4081';

  const handleSubmit = async (e) => {
    e.preventDefault();

    const siteData = {
      name,
      description,
      pictures: pictures.split(',').map((pic) => pic.trim()), // Convert to an array
      location,
      openingHours,
      ticketPrices,
      tag,
      tourismGovernor: id, // Add governor ID
    };

    try {
      const response = await fetch("/api/Governor/addSite", {
        method: "POST",
        body: JSON.stringify(siteData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.error || "Failed to create site.");
        setSuccessMessage('');
      } else {
        setSuccessMessage("Site created successfully!");
        setErrorMessage('');
        // Reset the form
        setName('');
        setDescription('');
        setPictures('');
        setLocation('');
        setOpeningHours('');
        setTicketPrices('');
        setTag('');
        // Optionally navigate to another page
        navigate(`/GetMySites/${id}`);
      }
    } catch (error) {
      setErrorMessage("An error occurred: " + error.message);
      setSuccessMessage('');
    }
  };

  const cardStyle = {
    backgroundColor: 'white',
    borderRadius: '15px',
    padding: '20px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    borderRadius: '5px',
    border: `1px solid ${watermelonGreen}`,
  };

  const buttonStyle = {
    backgroundColor: watermelonPink,
    color: 'white',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  };

  return (
    <div>
      <div className="listGovernor">
        <Sidebar id={id} />
        <div className="listContainerGovernor">
          <Navbar />
          <div style={cardStyle}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px', color: watermelonGreen }}>
              Add a New Site
            </h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
              <input
                type="text"
                placeholder="Site Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={inputStyle}
                required
              />
              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{ ...inputStyle, height: '100px' }}
                required
              />
              <input
                type="text"
                placeholder="Pictures (comma-separated URLs)"
                value={pictures}
                onChange={(e) => setPictures(e.target.value)}
                style={inputStyle}
              />
              <input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                style={inputStyle}
                required
              />
              <input
                type="text"
                placeholder="Opening Hours"
                value={openingHours}
                onChange={(e) => setOpeningHours(e.target.value)}
                style={inputStyle}
                required
              />
              <input
                type="text"
                placeholder="Ticket Prices"
                value={ticketPrices}
                onChange={(e) => setTicketPrices(e.target.value)}
                style={inputStyle}
                required
              />
              <input
                type="text"
                placeholder="Tag"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                style={inputStyle}
              />
              <button type="submit" style={buttonStyle}>
                Create Site
              </button>
            </form>
            {successMessage && (
              <p style={{ color: watermelonGreen, marginTop: '20px', textAlign: 'center' }}>
                {successMessage}
              </p>
            )}
            {errorMessage && (
              <p style={{ color: watermelonPink, marginTop: '20px', textAlign: 'center' }}>
                {errorMessage}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateSite;
