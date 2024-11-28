import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './navbar/Navbar';
import Sidebar from './sidebar/Sidebar';
import"./actions.scss"

const ViewQuantity = () => {
  const [products, setProducts] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const {id}=useParams();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`/api/Seller/getQuantity/${id}`);

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
  }, [id]);

  return (
    <div>
      <div className="list">
      
      <Sidebar />
      <div className="listContainer">
      <Navbar/>
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
      <h2 style={{ color:'#4CAF50' ,textAlign: 'center', marginBottom: '20px' }}> Quantities and Sales</h2>

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
               border: '1px solid #4CAF50'
            }}
          >
            <h4>{product.name}</h4>
            <p>Quantity: {product.quantity}</p>
            <p>Sales: {product.sales}</p>
          </div>
        ))}
      </div>
    </div>
    </div>
    </div>
    </div>
  );
};

export default ViewQuantity;
