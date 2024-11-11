import React, { useState, useEffect } from "react";

const ProfilePhotoUpload = ({ id }) => {
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    async function fetchPhoto() {
      try {
        const response = await fetch(`/api/TourGuide/getGuide/${id}`);
        const data = await response.json();
        console.log(data);
        if (data.photo) {
            setPreview(`/uploads/${data.photo}`);
            console.log(`/uploads/${data.photo}`);
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

  return (
    <div className="profile-photo-upload">
      <h3>Profile Photo</h3>
      <div className="photo-preview">
        {preview ? (
          <img src={preview} alt="Profile Preview" className="h-24 w-24 rounded-full object-cover" />
        ) : (
          <p>No photo available</p>
        )}
      </div>
      <input type="file" accept="image/*" onChange={handlePhotoChange} />
      <button onClick={handlePhotoUpload}>Upload Photo</button>
    </div>
  );
};

export default ProfilePhotoUpload;
