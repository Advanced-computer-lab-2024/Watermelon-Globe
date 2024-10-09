import React, { useState, useEffect } from 'react';

const SortProducts = () => {
  const [products, setProducts] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  // Function to fetch and sort products by ratings
  const fetchSortedProducts = async () => {
    try {
      const response = await fetch('/api/Seller/sortProducts', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const json = await response.json();

      if (!response.ok) {
        setErrorMessage('Failed to fetch sorted products. Please try again.');
      } else {
        setProducts(json); // Store the sorted products in the state
        setErrorMessage(''); // Clear error message if successful
      }
    } catch (error) {
      setErrorMessage('An error occurred while fetching the products.');
    }
  };

  // Fetch sorted products when the component mounts
  useEffect(() => {
    fetchSortedProducts();
  }, []);

  return (
    <div>
      <h2>Sorted Products by Ratings</h2>

      {/* Display error message if any */}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      {/* Display the sorted products */}
      {products.length > 0 ? (
        <ul>
          {products.map((product) => (
            <li key={product._id}>
              <p><strong>Name:</strong> {product.name}</p>
              {/* Handle Decimal128 conversion for price */}
              <p><strong>Price:</strong> {product.price && product.price.$numberDecimal ? product.price.$numberDecimal : product.price}</p>
              <p><strong>Quantity:</strong> {product.quantity}</p>
              <p><strong>Description:</strong> {product.description}</p>
              <p><strong>Seller:</strong> {product.seller}</p>
              <p><strong>Ratings:</strong> {product.ratings}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
};

export default SortProducts;
