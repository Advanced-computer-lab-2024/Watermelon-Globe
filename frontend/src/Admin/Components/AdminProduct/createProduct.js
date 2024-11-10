import React, { useState } from 'react';

const CreateProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [description, setDescription] = useState('');
  const [seller, setSeller] = "6729244f151b6c9e346dd732";
  const [ratings, setRatings] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const product = { name, price, quantity, description, seller, ratings };

    const response = await fetch('/api/Admin/CreateProduct', {
      method: 'POST',
      body: JSON.stringify(product),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      setErrorMessage('Failed to create product. Please try again.');
    } else {
      setSuccessMessage('Product created successfully!'); // Set success message
      setErrorMessage(''); // Clear any error message if successful
      // Optionally reset form fields after successful creation
      setName('');
      setPrice('');
      setQuantity('');  
      setDescription('');
      setSeller('');
      setRatings('');
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

        <label>Seller:</label>
        <input type="text" value={seller} onChange={(e) => setSeller(e.target.value)} required />

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

export default CreateProduct;
