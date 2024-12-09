// import React, { useState, useEffect } from "react";

// const SellerLogo = ({ id }) => {
//   const [Logo, setLogo] = useState(null);
//   const [preview, setPreview] = useState(null);

//   useEffect(() => {
//     async function fetchLogo() {
//       try {
//         const response = await fetch(`/api/Seller/GetSeller/${id}`);
//         const data = await response.json();
//         if (data.Logo) {
//             setPreview(`/uploads/${data.Logo}`);
//         }
//       } catch (error) {
//         console.error("Error fetching logo:", error);
//       }
//     }
//     fetchLogo();
//   }, [id]);

//   const handleLogoChange = (e) => {
//     const file = e.target.files[0];
//     setLogo(file);
//     setPreview(URL.createObjectURL(file));
//   };

//   const handleLogoUpload = async (e) => {
//     e.preventDefault();
//     if (!Logo) {
//       alert("Please select a logo to upload.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("Logo", Logo);

//     try {
//       const response = await fetch(`/api/upload/sellerLogo/${id}`, {
//         method: "POST",
//         body: formData,
//       });
//       console.log(formData);

//       if (response.ok) {
//         const data = await response.json();
//         alert("Logo uploaded successfully");
//         setPreview(data.Logo);
//       } else {
//         alert("Failed to upload logo.");
//       }
//     } catch (error) {
//       console.error("Error uploading logo:", error);
//       alert("Logo upload failed.");
//     }
//   };

//   const watermelonGreen = '#4CAF50';
//   const watermelonPink = '#FF4081';

//   const buttonStyle = {
//     backgroundColor: watermelonPink,
//     width:"15%",
//     color: 'white',
//     padding: '10px 20px',
//     borderRadius: '5px',
//     border: 'none',
//     cursor: 'pointer',
//     marginRight: '10px',
//     transition: 'background-color 0.3s',
//     marginTop:10
//   };

//   return (
//     <div className="logo-upload">
//       <h3>Logo</h3>
//       <div className="logo-preview">
//         {preview ? (
//           <img src={preview} alt="Logo Preview" className="h-24 w-24 rounded-full object-cover" />
//         ) : (
//           <p>No logo available</p>
//         )}
//       </div>
//       <input type="file" accept="image/*" onChange={handleLogoChange} />
//       <button  style = {buttonStyle}onClick={handleLogoUpload}>Upload Photo</button>
//     </div>
//   );
// };

// export default SellerLogo;

import React, { useState, useEffect } from "react";

const SellerLogo = ({ id,onClose }) => {
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
    console.log("Selected file: ", file); // Debugging
    if (file) {
      setLogo(file);
      setPreview(URL.createObjectURL(file));
    } else {
      console.error("No file selected.");
    }
  };

  const handleLogoUpload = async (e) => {
    e.preventDefault();
    if (!Logo) {
      alert("Please select a logo to upload.");
      return;
    }

    const formData = new FormData();
const mockFile = new File(["test"], "test.txt", { type: "text/plain" });

console.log("Logo before sending:", Logo);

formData.append("Logo", mockFile);
    
    // Debugging FormData
    console.log("FormData content:");
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    try {
      const response = await fetch(`/api/upload/sellerLogo/${id}`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        alert("Logo uploaded successfully");
         setPreview(`/uploads/${data.Logo}`); // Update preview after upload
        //setPreview(`${window.location.origin}/uploads/${data.Logo}`);

      } else {
        alert("Failed to upload logo.");
      }
    } catch (error) {
      console.error("Error uploading logo:", error);
      alert("Logo upload failed.");
    }
  };

  const watermelonGreen = '#4CAF50';
  const watermelonPink = '#FF4081';

  const buttonStyle = {
    backgroundColor: watermelonPink,
    width: "15%",
    color: "white",
    padding: "10px 20px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    marginRight: "10px",
    transition: "background-color 0.3s",
    marginTop: 10,
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

export default SellerLogo;

