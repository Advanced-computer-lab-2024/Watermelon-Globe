import React, { useEffect, useState } from 'react';

const GetAllProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/Admin/getQuantity');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h2>All Products</h2>
      <div>
        {products.map((product) => (
          <div key={product._id} className="product-details">
            <h4>{product.name}</h4>
            <p>Quantity: {product.quantity}</p>
            <p>Sales: {product.sales}</p>
            {/* Add any other product details you want to display */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetAllProducts;