import React, { useEffect, useState } from 'react';

const GetAllProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/Seller/products');
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
      return parseFloat(price.$numberDecimal).toFixed(2); // Adjusting to a number and formatting it
    }
    return price; // Return as is if not an object
  };

  return (
    <div>
      <h2>All Products</h2>
      <div>
        {products.map((product) => (
          <div key={product._id} className="product-details">
            <h4>{product.name}</h4>
            <p>{product.description}</p>
            <p>Price: ${formatPrice(product.price)}</p>
            <p>Quantity: {product.quantity}</p>
            {/* Add any other product details you want to display */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetAllProducts;
