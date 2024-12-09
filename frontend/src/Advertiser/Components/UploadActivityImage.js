import React, { useState } from 'react';

const UploadActivityPicture = ({ id, onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setErrorMessage('Please select a file to upload');
      return;
    }

    const formData = new FormData();
    formData.append('picture', file);

    try {
      const response = await fetch(`/api/Activities/uploadPicture?id=${id}`, {
        method: 'PUT',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setSuccessMessage(data.message || 'Picture uploaded successfully');
        setErrorMessage('');
        if (onUploadSuccess) {
          onUploadSuccess(data.Activity.picture);
        }
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.error || 'Failed to upload picture');
        setSuccessMessage('');
      }
    } catch (error) {
      setErrorMessage('An error occurred: ' + error.message);
      setSuccessMessage('');
    }
  };

  const watermelonPink = '#FF4081';

  const buttonStyle = {
    backgroundColor: watermelonPink,
    width: "auto",
    color: 'white',
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    marginRight: '10px',
    transition: 'background-color 0.3s',
  };

  return (
    <div>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label>Select Picture:</label>
          <input
            type="file"
            name="picture"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
        </div>
        <button style={buttonStyle} type="submit">Upload Picture</button>
      </form>

      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default UploadActivityPicture;
