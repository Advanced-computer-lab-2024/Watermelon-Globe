import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const AdvertiserLogo = ({id,onClose}) => {
   // const {id} = useParams();
    const [Logo, setLogo] = useState(null);
    const [preview, setPreview] = useState(null);
    const navigate = useNavigate();


  console.log(id);

  useEffect(() => {
    async function fetchLogo() {
      try {
        const response = await fetch(`/api/Advertiser/profiles/${id}`);
        const data = await response.json();
        if (data.Logo) {
            setPreview(`/uploads/${data.Logo}`);
        }
      } catch (error) {
        console.error("Error fetching logo:", error);
      }
    }
    fetchLogo();
  }, [id]);

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    setLogo(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleLogoUpload = async (e) => {
    e.preventDefault();
    if (!Logo) {
      alert("Please select a logo to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("Logo", Logo);

    try {
      const response = await fetch(`/api/upload/advertiserLogo/${id}`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        alert("Logo uploaded successfully");
        setPreview(data.Logo);
        navigate('/advertiser');
      } else {
        alert("Failed to upload logo.");
      }
    } catch (error) {
      console.error("Error uploading logo:", error);
      alert("Logo upload failed.");
    }
  };

  return (
    <div className="logo-upload">
      <div className="logo-preview">
        {preview ? (
          <img src={preview} alt="Logo Preview" className="h-24 w-24 rounded-full object-cover" />
        ) : (
          <p>No logo available</p>
        )}
      </div>
      <input type="file" accept="image/*" onChange={handleLogoChange} />
      {/* <button onClick={handleLogoUpload}>Upload Photo</button> */}
      <div style={{display:"flex" }}>
     <button style={{marginRight:10}}
        className="flex items-center px-4 py-2 bg-[#91c297] hover:bg-[#7A9F77] text-white rounded mt-2"
        onClick={handleLogoUpload}
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

export default AdvertiserLogo;
