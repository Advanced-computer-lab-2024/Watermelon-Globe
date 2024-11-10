import React, { useState } from 'react';

const UnarchiveProductByName = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [product, setProduct] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a PUT request to unarchive the product by name
      const response = await fetch(`/api/Seller/unarchiveProduct?name=${encodeURIComponent(searchTerm)}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setProduct(data.product); // Set the product details
        setSuccessMessage(data.message); // Set success message from API
        setErrorMessage(''); // Clear any error message
      } else {
        setProduct(null);
        setSuccessMessage(''); // Clear any success message
        setErrorMessage('Error unarchiving the product.');
      }
    } catch (error) {
      setProduct(null);
      setSuccessMessage('');
      setErrorMessage('Error unarchiving product: ' + error.message);
    }
  };

  const formatPrice = (price) => {
    if (price && price.$numberDecimal) {
      return parseFloat(price.$numberDecimal).toFixed(2); // Convert Decimal128 to number and format it
    }
    return price; // Return the price as-is if it's already a number or string
  };

  return (
    <div>
      <h2>Unarchive Product by Name</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Product Name:</label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            required
          />
        </div>
        <button type="submit">Unarchive</button>
      </form>

      {/* Display Success or Error Message */}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      {/* Display Unarchived Product Details */}
      {product && (
        <div className="product-details">
          <h4>{product.name}</h4>
          <p>{product.description}</p>
          <p>Price: ${formatPrice(product.price)}</p>
          <p>Quantity: {product.quantity}</p>
          <p>Status: Active</p>
        </div>
      )}
    </div>
  );
};

export default UnarchiveProductByName;