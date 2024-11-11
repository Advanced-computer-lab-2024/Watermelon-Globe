import React, { useState } from 'react';

const UploadProductPicture = () => {
  const [productId, setProductId] = useState('');
  const [pictureUrl, setPictureUrl] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a PUT request to update the product's picture
      const response = await fetch(`/api/Seller/uploadPicture?id=${encodeURIComponent(productId)}`, {
        method: 'PUT',
        body: JSON.stringify({ picture: pictureUrl }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setSuccessMessage(data.message || 'Picture uploaded successfully');
        setErrorMessage('');
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.error || 'Failed to upload picture');
        setSuccessMessage('');
      }
    } catch (error) {
      setErrorMessage('An error occurred: ' + error.message);
      setSuccessMessage('');
    }
  };

  return (
    <div>
      <h2>Upload Product Picture</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Product ID:</label>
          <input
            type="text"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            required
            placeholder="Enter product ID"
          />
        </div>
        <div>
          <label>Picture URL:</label>
          <input
            type="text"
            value={pictureUrl}
            onChange={(e) => setPictureUrl(e.target.value)}
            required
            placeholder="Enter picture URL"
          />
        </div>
        <button type="submit">Upload Picture</button>
      </form>

      {/* Display success or error messages */}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default UploadProductPicture;
