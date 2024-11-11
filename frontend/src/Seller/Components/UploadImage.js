import React, { useState } from 'react';

const SearchProductImageByName = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [imageLink, setImageLink] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Fetch the product image by name
      const response = await fetch(`/api/Seller/uploadImage?name=${encodeURIComponent(searchTerm)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.picture) {
          setImageLink(data.picture); // Use the base64 image link
          setErrorMessage('');
        } else {
          setImageLink('');
          setErrorMessage('No image found for this product.');
        }
      } else {
        setErrorMessage('Error fetching the product image.');
      }
    } catch (error) {
      setErrorMessage('An error occurred: ' + error.message);
    }
  };

  return (
    <div>
      <h2>Search and Load Product Image</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Product Name:</label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            required
            placeholder="Enter product name"
          />
        </div>
        <button type="submit">Search</button>
      </form>

      {/* Display Error Message */}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      {/* Display Product Image */}
      {imageLink && (
        <div>
          <h3>Product Image</h3>
          <img src={imageLink} alt={`Image of ${searchTerm}`} style={{ width: '300px', height: 'auto' }} />
        </div>
      )}
    </div>
  );
};

export default SearchProductImageByName;