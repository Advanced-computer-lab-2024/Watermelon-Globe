import React, { useState } from 'react';

const FilterProduct = () => {
  const [price, setPrice] = useState(''); // State to store the price input
  const [product, setProduct] = useState(null); // State to store the filtered product
  const [errorMessage, setErrorMessage] = useState(''); // State to handle error messages

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload on form submission

    try {
      // Make the GET request to the correct API endpoint with the price as a URL parameter
      const response = await fetch(`/api/filter/filterProductPrice/${price}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const json = await response.json(); // Parse the response

      if (!response.ok) {
        // Handle error response from backend
        setErrorMessage(json.error || 'Failed to find product. Please try again.');
        setProduct(null); // Clear previous product details if there is an error
      } else {
        setProduct(json); // Update the product state with the filtered product
        setErrorMessage(''); // Clear any error messages if successful
      }
    } catch (error) {
      // Handle network or unexpected errors
      setErrorMessage('An error occurred while fetching the product.');
      setProduct(null); // Clear product in case of an error
    }
  };

  return (
    <div>
      <h2>Filter Product by Price</h2>
      <form onSubmit={handleSubmit}>
        <label>Enter Price:</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <button type="submit">Filter Product</button>
      </form>

      {/* Display error message if any */}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      {/* Display the filtered product details if available */}
      {product && (
        <div>
          <h3>Product Details</h3>
          <p><strong>Name:</strong> {product.name}</p>
          {/* Handle Decimal128 conversion if present */}
          <p><strong>Price:</strong> {product.price && product.price.$numberDecimal ? product.price.$numberDecimal : product.price}</p>
          <p><strong>Quantity:</strong> {product.quantity}</p>
          <p><strong>Description:</strong> {product.description}</p>
          <p><strong>Seller:</strong> {product.seller}</p>
          <p><strong>Ratings:</strong> {product.ratings}</p>
        </div>
      )}
    </div>
  );
};

export default FilterProduct;
