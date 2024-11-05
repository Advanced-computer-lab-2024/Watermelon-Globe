import React, { useState } from 'react';

const SearchProductByName = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [product, setProduct] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Use a GET request and include the search term as a query parameter
      const response = await fetch(`/api/Seller/searchProductName?name=${encodeURIComponent(searchTerm)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.length > 0) {
          setProduct(data[0]); // Assuming the API returns an array of products
          setErrorMessage('');
        } else {
          setProduct(null);
          setErrorMessage('No product found with this name.');
        }
      } else {
        setErrorMessage('Error fetching the product.');
      }
    } catch (error) {
      setErrorMessage('Error searching for product: ' + error.message);
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
      <h2>Search Product by Name</h2>
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
        <button type="submit">Search</button>
      </form>

      {/* Display Product or Error Message */}
      {product ? (
        <div className="product-details">
          <h4>{product.name}</h4>
          <p>{product.description}</p>
          <p>Price: ${formatPrice(product.price)}</p>
          <p>Quantity: {product.quantity}</p>
        </div>
      ) : (
        errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>
      )}
    </div>
  );
};

export default SearchProductByName;
