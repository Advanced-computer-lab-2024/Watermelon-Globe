import React, { useEffect, useState } from 'react';

const GetAllProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/Seller/GetAllProducts');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const formatPrice = (price) => {
    if (price && price.$numberDecimal) {
      return parseFloat(price.$numberDecimal).toFixed(2);
    }
    return price;
  };

  return (
    <div>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>All Products</h2>
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
            {product.picture && (
              <img
                src={product.picture}
                alt={`Image of ${product.name}`}
                style={{ width: '100%', height: 'auto', marginBottom: '10px' }}
              />
            )}
            <h4>Name: {product.name}</h4>
            <p>Description: {product.description}</p>
            <p>Price: ${formatPrice(product.price)}</p>
            <p>Quantity: {product.quantity}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetAllProducts;
