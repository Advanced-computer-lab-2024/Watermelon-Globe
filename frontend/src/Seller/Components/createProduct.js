import React, { useState } from 'react';
import Navbar from './navbar/Navbar';
import Sidebar from './sidebar/Sidebar';
import "./actions.scss"
import { useParams } from 'react-router-dom';

const CreateProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [description, setDescription] = useState('');
  const seller = "6729244f151b6c9e346dd732"; // Default seller ID
  const [ratings, setRatings] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const {id} = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const product = { 
      name, 
      price, 
      quantity, 
      description, 
      seller, // Use default seller ID
      ratings: ratings || 0
    };


    try {
      const response = await fetch(`/api/Seller/CreateProduct/${id}`, {
        method: 'POST',
        body: JSON.stringify(product),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.error || 'Failed to create product. Please try again.');
      } else {
        setSuccessMessage('Product created successfully!');
        setErrorMessage('');
        
        // Reset form fields
        setName('');
        setPrice('');
        setQuantity('');
        setDescription('');
        setRatings('');
      }
    } catch (error) {
      setErrorMessage('An error occurred: ' + error.message);
    }
  };

 
    return (
      <div
        style={{
          backgroundColor: "#fff",
          minHeight: "100vh", // Ensures it covers the full viewport
          width: "102%", // Full width of the viewport
          margin: 0, // Remove default margins
          padding: 0, // Remove default padding
          display: "flex", // Optional: for flexible alignment
          flexDirection: "column",
        }}
      >
        <div className="listAdminProduct">
          <Sidebar />
          <div className="listContainerAdminProduct">
            <Navbar />
            <div style={{ padding: "20px" }}>
          <div className=" bg-white p-6 rounded-lg ">
           
            <h2 style={{ color: '#2E8B57' }} className="text-2xl font-bold text-800 text-center mb-6">Create New Product</h2>
           
      <form onSubmit={handleSubmit}>
        <label>Product Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

        <label>Price:</label>
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />

        <label>Quantity:</label>
        <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />

        <label>Description:</label>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />

       
       
        <div className="flex justify-center">
  <button  style={{width:"25%", marginTop:10}} className="bg-green-700 text-white px-4 py-2  rounded mt-6" type="submit">
    Create Product
  </button>
</div>

       
      </form>
      {/* </div> */}
      </div>

      {/* Display success or error messages */}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
    </div>
    </div>
    </div>
  );
};

export default CreateProduct;
