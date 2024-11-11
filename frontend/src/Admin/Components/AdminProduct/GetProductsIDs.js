import React, { useEffect, useState } from 'react';

const ProductNamesAndIds = () => {
  const [products, setProducts] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchProductNamesAndIds = async () => {
      try {
        const response = await fetch('/api/Admin/GetProductsIDs');

        if (!response.ok) {
          throw new Error('Failed to fetch product names and IDs');
        }

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setErrorMessage(error.message);
      }
    };

    fetchProductNamesAndIds();
  }, []);

  return (
    <div>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Product Names and IDs</h2>

      {errorMessage && <p style={{ color: 'red', textAlign: 'center' }}>{errorMessage}</p>}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)', // Adjusted for 4 products per row
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
            <p>ID: {product._id}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductNamesAndIds;
