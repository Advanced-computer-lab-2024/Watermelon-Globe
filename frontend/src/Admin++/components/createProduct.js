

import React, { useState } from 'react';
import Navbar from './navbar/Navbar';
import Sidebar from './sidebar/Sidebar';
import { useParams } from 'react-router-dom';

const CreateProductAdmin = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [description, setDescription] = useState('');
  const seller = "6729244f151b6c9e346dd732"; // Default seller ID
  const [ratings, setRatings] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const product = {
      name,
      price,
      quantity,
      description,
      seller,
      ratings: ratings || 0,
    };

    try {
      const response = await fetch(`/api/Admin/CreateProduct`, {
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
    <div className=" min-h-screen flex flex-col border-8 border-green-700">
     
          <div className="p-8">
            <div className="bg-white shadow-2xl rounded-lg p-6 border-2 border-green-500">
              <h2  style ={{color:"#d32e65"}}className="text-3xl font-extrabold  text-center mb-8">
                Create New Product
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-800 font-semibold mb-2">Product Name:</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-3 border  border-green-400 rounded-lg shadow-sm focus:ring  focus:outline-none"
                    placeholder="Enter product name"
                    required
                  />
                </div>
                <div style={{display:"flex"}}>
        
                
                <div style={{marginRight:100}}>
                  <label className="block text-gray-800 font-semibold mb-2">Price:</label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full p-3 border border-green-400 rounded-lg shadow-sm focus:ring  focus:outline-none"
                    placeholder="Enter product price"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-800 font-semibold mb-2">Quantity:</label>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full p-3 border border-green-400 rounded-lg shadow-sm focus:ring 
                     focus:outline-none"
                    placeholder="Enter product quantity"
                    required
                  />
                </div>
                </div>
                <div>
                  <label className="block text-gray-800 font-semibold mb-2">Description:</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-3 border  border-green-400 rounded-lg shadow-sm focus:ring focus:outline-none"
                    placeholder="Enter product description"
                    rows="3"
                    required
                  ></textarea>
                </div>
                <div className="flex justify-center">
                  <button
                  style={{backgroundColor:"#91c297"
                  }}
                    type="submit"
                    className=" text-white py-3 px-6 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transform transition duration-300"
                  >
                    Create Product
                  </button>
                </div>
              </form>

              {/* Display success or error messages */}
              {successMessage && (
                <p className="text-green-700 font-medium mt-4 text-center">{successMessage}</p>
              )}
              {errorMessage && (
                <p className="text-red-600 font-medium mt-4 text-center">{errorMessage}</p>
              )}
            </div>
          </div>
        </div>
      </div>
      </div>
      </div>
      </div>
     
  );
};

export default CreateProductAdmin;
