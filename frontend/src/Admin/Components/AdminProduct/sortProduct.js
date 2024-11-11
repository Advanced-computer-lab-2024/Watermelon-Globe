import React, { useState, useEffect } from 'react';

const SortProducts = () => {
  const [products, setProducts] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  // Function to fetch and sort products by ratings
  const fetchSortedProducts = async () => {
    try {
      const response = await fetch('/api/Sort/sortProducts', {
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
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Sorted Products by Ratings</h2>

      {/* Display error message if any */}
      {errorMessage && <p style={{ color: 'red', textAlign: 'center' }}>{errorMessage}</p>}

      {/* Display the sorted products */}
      {products.length > 0 ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)', // 4 products per row
            gap: '20px',
            padding: '10px',
          }}
        >
          {products.map((product) => (
            <div
              key={product._id}
              style={{
                border: '1px solid #ccc',
                borderRadius: '5px',
                padding: '10px',
                textAlign: 'center',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              }}
            >
              <h4>{product.name}</h4>
              <p>
                <strong>Price:</strong> ${product.price && product.price.$numberDecimal ? product.price.$numberDecimal : product.price}
              </p>
              <p>
                <strong>Quantity:</strong> {product.quantity}
              </p>
              <p>
                <strong>Ratings:</strong> {product.ratings}
              </p>
              <p>
                <strong>Description:</strong> {product.description}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ textAlign: 'center' }}>No products found.</p>
      )}
    </div>
  );
};

export default SortProducts;
