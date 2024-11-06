import React, { useState } from 'react';

const UpdateProduct = () => {
  const [productId, setProductId] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Build the update data with only name, description, and price if they are defined
    const updateData = {};
    if (name) updateData.name = name;
    if (description) updateData.description = description;
    if (price) updateData.price = parseFloat(price);

    try {
      // Pass the productId as a query parameter in the fetch URL
      const response = await fetch(`/api/Seller/editProduct?id=${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      if (response.ok) {
        const updatedProduct = await response.json();
        setSuccessMessage('Product updated successfully!');
        setErrorMessage('');
        // Optionally clear the form
        setProductId('');
        setName('');
        setDescription('');
        setPrice('');
      } else {
        setErrorMessage('Error updating the product.');
        setSuccessMessage('');
      }
    } catch (error) {
      setErrorMessage('Error updating product: ' + error.message);
      setSuccessMessage('');
    }
  };

  return (
    <div>
      <h2>Update Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Product ID:</label>
          <input
            type="text"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Product Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            step="0.01"
          />
        </div>
        <button type="submit">Update Product</button>
      </form>

      {/* Success or Error Messages */}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default UpdateProduct;
