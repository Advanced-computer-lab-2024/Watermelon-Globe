import React, { useState } from 'react';

const CreateProduct = () => {
  const [name, setName] = useState('');
  const [details, setDetails] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [description, setDescription] = useState('');
  const [seller, setSeller] = useState('');
  const [ratings, setRatings] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const product = { name, details, price, quantity, description, seller, ratings };

    const response = await fetch('/api/Seller/createProduct', {
      method: 'POST',
      body: JSON.stringify(product),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setErrorMessage('Failed to create product. Please try again.');
    } else {
      setSuccessMessage('Product created successfully!'); // Set success message
      setErrorMessage(''); // Clear any error message if successful
      // Optionally reset form fields after successful creation
      setName('');
      setDetails('');
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

        <label>Details:</label>
        <input type="text" value={details} onChange={(e) => setDetails(e.target.value)} required />

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
