import React, { useState, useEffect } from "react";

const SellerLogo = ({ id }) => {
  const [Logo, setLogo] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    async function fetchLogo() {
      try {
        const response = await fetch(`/api/Seller/GetSeller/${id}`);
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
      const response = await fetch(`/api/upload/sellerLogo/${id}`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        alert("Logo uploaded successfully");
        setPreview(data.Logo);
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
      <h3>Logo</h3>
      <div className="logo-preview">
        {preview ? (
          <img src={preview} alt="Logo Preview" className="h-24 w-24 rounded-full object-cover" />
        ) : (
          <p>No logo available</p>
        )}
      </div>
      <input type="file" accept="image/*" onChange={handleLogoChange} />
      <button onClick={handleLogoUpload}>Upload Photo</button>
    </div>
  );
};

export default SellerLogo;
