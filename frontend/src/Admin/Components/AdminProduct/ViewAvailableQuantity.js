import React, { useEffect, useState } from 'react';

const GetAllProducts = () => {
  const [products, setProducts] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/Admin/getQuantity');

        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setErrorMessage(error.message);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>All Products</h2>

      {errorMessage && <p style={{ color: 'red', textAlign: 'center' }}>{errorMessage}</p>}

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
            <p>Quantity: {product.quantity}</p>
            <p>Sales: {product.sales}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetAllProducts;
