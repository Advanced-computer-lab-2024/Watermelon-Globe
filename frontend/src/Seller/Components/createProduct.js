import React, { useState } from 'react';

const CreateProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [description, setDescription] = useState('');
  const seller = "6729244f151b6c9e346dd732"; // Default seller ID
  const [ratings, setRatings] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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
      const response = await fetch('/api/Seller/createProduct', {
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
    <div>
      <form onSubmit={handleSubmit}>
        <label>Product Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

        <label>Price:</label>
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />

        <label>Quantity:</label>
        <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />

        <label>Description:</label>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />

        <label>Ratings:</label>
        <input type="number" value={ratings} onChange={(e) => setRatings(e.target.value)} />

        <button type="submit">Create Product</button>
      </form>

      {/* Display success or error messages */}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default CreateProduct;
