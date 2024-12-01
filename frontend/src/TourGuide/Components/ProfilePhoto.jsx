import { colors } from "@mui/material";
import React, { useState, useEffect } from "react";

const ProfilePhotoUpload = ({ id }) => {
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    async function fetchPhoto() {
      try {
        const response = await fetch(`/api/TourGuide/getGuide/${id}`);
        const data = await response.json();
        if (data.photo) {
          setPreview(`/uploads/${data.photo}`);
        }
      } catch (error) {
        console.error("Error fetching profile photo:", error);
      }
    }
    fetchPhoto();
  }, [id]);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    setPreview(URL.createObjectURL(file));
  };

  const handlePhotoUpload = async (e) => {
    e.preventDefault();
    if (!photo) {
      alert("Please select a photo to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("photo", photo);

    try {
      const response = await fetch(`/api/upload/tourGuidePhoto/${id}`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        alert("Photo uploaded successfully");
        setPreview(data.Photo);
      } else {
        alert("Failed to upload photo.");
      }
    } catch (error) {
      console.error("Error uploading photo:", error);
      alert("Photo upload failed.");
    }
  };

    
  const watermelonGreen = '#4CAF50';
  const watermelonPink = '#FF4081';

  return (
    <div style={{
      borderRadius: 10,
      borderColor: watermelonGreen,
      
      borderWidth: 2,
      borderStyle: "solid", // Ensures the border appears
    }}
     className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-2xl font-semibold text-center mb-4">Profile Photo</h3>
      
      <div className="flex justify-center mb-4">
        {preview ? (
          <img
            src={preview}
            alt="Profile Preview"
            className="h-32 w-32 rounded-full object-cover border-4 border-blue-500"
          />
        ) : (
          <div className="h-32 w-32 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
            <p>No photo available</p>
          </div>
        )}
      </div>

      <input
        type="file"
        accept="image/*"
        onChange={handlePhotoChange}
        className="block w-full text-sm text-gray-500 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-md file:text-sm file:bg-gray-50 hover:file:bg-gray-100 mb-4"
      />

      <button
        onClick={handlePhotoUpload} style={{backgroundColor:watermelonGreen}}
        className="w-full py-2 px-4  text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400"
      >
        Upload Photo
      </button>
    </div>
  );
};

export default ProfilePhotoUpload;
