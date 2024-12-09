import { colors } from "@mui/material";
import React, { useState, useEffect } from "react";

const ProfilePhotoUpload = ({ id,onClose }) => {
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
    <div className="logo-upload">
      <h3>Logo</h3>
      <div className="logo-preview">
        {preview ? (
          <img src={preview} alt="Logo Preview" className="h-24 w-24 rounded-full object-cover" />
        ) : (
          <p>No logo available</p>
        )}
      </div>
      <input type="file" accept="image/*" onChange={handlePhotoChange} />
      <div style={{display:"flex" }}>
     <button style={{marginRight:10}}
        className="flex items-center px-4 py-2 bg-[#91c297] hover:bg-[#7A9F77] text-white rounded mt-2"
        onClick={handlePhotoUpload}
      >
        Upload 
      </button>
      <button style={{marginRight:10}}
        className="flex items-center px-4 py-2 bg-[#e89bb5] hover:bg-[#d787a1] text-white rounded mt-2"
        onClick={onClose} // Trigger the onClose function when clicked
      >
        Cancel
      </button>
      </div>
    </div>
  );
};

export default ProfilePhotoUpload;
