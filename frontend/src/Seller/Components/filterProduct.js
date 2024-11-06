import React, { useState } from 'react';

const FilterProduct = () => {
  const [price, setPrice] = useState(''); // State to store the price input
  const [products, setProducts] = useState([]); // State to store the filtered products array
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
        setErrorMessage(json.error || 'Failed to find products. Please try again.');
        setProducts([]); // Clear previous products if there is an error
      } else {
        setProducts(json); // Update the products state with the filtered products array
        setErrorMessage(''); // Clear any error messages if successful
      }
    } catch (error) {
      // Handle network or unexpected errors
      setErrorMessage('An error occurred while fetching the products.');
      setProducts([]); // Clear products in case of an error
    }
  };

  return (
    <div>
      <h2>Filter Products by Price</h2>
      <form onSubmit={handleSubmit}>
        <label>Enter Price:</label>
        <input
          type="number"
          step="0.01"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <button type="submit">Filter Products</button>
      </form>

      {/* Display error message if any */}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      {/* Display the filtered products list if available */}
      {products.length > 0 ? (
        <div>
          <h3>Filtered Products</h3>
          <ul>
            {products.map((product) => (
              <li key={product._id}>
                <p><strong>Name:</strong> {product.name}</p>
                <p><strong>Price:</strong> {product.price && product.price.$numberDecimal ? product.price.$numberDecimal : product.price}</p>
                <p><strong>Quantity:</strong> {product.quantity}</p>
                <p><strong>Description:</strong> {product.description}</p>
                <p><strong>Seller:</strong> {product.seller}</p>
                <p><strong>Ratings:</strong> {product.ratings}</p>
                <hr />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No products found at this price.</p>
      )}
    </div>
  );
};

export default FilterProduct;
