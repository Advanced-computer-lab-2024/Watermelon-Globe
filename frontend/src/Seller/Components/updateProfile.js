import React, { useState } from 'react';

const UpdateProfile = () => {
  // Define state variables to store form input values
  const [id, setId] = useState(''); // State for seller ID
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload on form submission

    // Create an updated profile object with the form input values
    const updatedProfile = { Name: name, Email: email, Description: description };

    try {
      // Make the PUT request to the backend API to update the seller profile
      const response = await fetch(`/api/Seller/updateSeller/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProfile), // Send the updated profile data in the request body
      });

      const json = await response.json(); // Parse the JSON response

      if (!response.ok) {
        // Handle error response from the backend
        setErrorMessage(json.error || 'Failed to update profile. Please try again.');
        setSuccessMessage(''); // Clear success message if there's an error
      } else {
        // On success, clear error message and set success message
        setSuccessMessage('Profile updated successfully!');
        setErrorMessage('');
        // Optionally clear the form fields after successful submission
        setName('');
        setEmail('');
        setDescription('');
      }
    } catch (error) {
      // Handle network or unexpected errors
      setErrorMessage('An error occurred while updating the profile.');
      setSuccessMessage('');
    }
  };

  return (
    <div>
      <h2>Update Profile</h2>
      <form onSubmit={handleSubmit}>
        <label>Seller ID:</label>
        <input
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          required
        />

        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <button type="submit">Update Profile</button>
      </form>

      {/* Display success or error messages */}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default UpdateProfile;
