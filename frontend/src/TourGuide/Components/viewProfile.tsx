

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./TourGuideProfile.css";
// import { useParams, useNavigate } from "react-router-dom";
// import Navbar from "./navbar/Navbar";
// import Sidebar from "./sidebar/Sidebar";
// import ProfilePhotoUpload from "./ProfilePhoto";
// import "./guide.scss"

// const TourGuideProfile = () => {
//   const { id } = useParams();
//   const [tourGuide, setTourGuide] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showUpload, setShowUpload] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedData, setEditedData] = useState({});
//   const navigate = useNavigate();
//   const watermelonGreen = "#4CAF50";
//   const watermelonPink = "#FF4081";

//   useEffect(() => {
//     const fetchTourGuideDetails = async () => {
//       try {
//         const response = await axios.get(`/api/tourGuide/getGuide/${id}`);
//         setTourGuide(response.data);
//         setEditedData(response.data); // Set initial data for editing
//       } catch (err) {
//         setError(err.response ? err.response.data.error : "Error loading tour guide details");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTourGuideDetails();
//   }, [id]);

//   if (loading) return <p>Loading tour guide details...</p>;
//   if (error) return <p>{error}</p>;

//   const handleEdit = () => {
//     setIsEditing(true);
//   };

//   const handleCancel = () => {
//     setIsEditing(false);
//     setEditedData({ ...tourGuide }); // Reset changes
//   };

//   const handleConfirm = async () => {
//     try {
//       const response = await axios.put(`/api/tourGuide/updateTourGuideNew/${id}`, editedData);
//       setTourGuide(response.data);
//       alert("Profile updated successfully!");
//       setIsEditing(false);
//     } catch (err) {
//       alert(err.response ? err.response.data.error : "Error updating profile");
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEditedData({ ...editedData, [name]: value });
//   };

//   const handleUploadPicture = () => {
//     setShowUpload(true);
//   };

//   const handleChangePassword = () => {
//     navigate(`/ChangePasswordTourGuide/${id}`);
//   };

//    const handleRequestDeletion = async () => {
//     if (window.confirm("Are you sure you want to request account deletion? This action cannot be undone.")) {
//       try {
//         await axios.put(`/api/tourGuide/requestDeletionGuide/${id}`);
//         alert("Your account deletion request has been submitted.");
//         // Optionally, you can update the UI to reflect the pending deletion status
//         setTourGuide({ ...tourGuide, deletionRequest: "Pending" });
//       } catch (error) {
//         alert("Error requesting account deletion: " + error.response?.data?.message || error.message);
//       }
//     }
//   };


//   const handleDeleteAccount = async () => {
//     if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
//       try {
//         await axios.delete(`/api/TourGuide/deleteGuide/${id}`);
//         alert("Your account has been deleted successfully.");
//         navigate("/"); // Redirect to home page or login page
//       } catch (error) {
//         alert("Error deleting account: " + error.response?.data?.message || error.message);
//       }
//     }
//   };

//   return (
//     <div  className="listGuide">
//       <Sidebar />
//       <div className="listContainerGuide">
//         <Navbar />
//         <div className="tour-guide-profile">
//           <div className="profile-header">
//             <h1>{tourGuide?.name || "Name not provided"}</h1>
//             <div className="profile-photo">
//               {<ProfilePhotoUpload id={tourGuide?._id} />}
//             </div>
//           </div>

//           <div  className="profile-details">
//             <div className="profile-detail">
//               <strong>Email:</strong>
//               {isEditing ? (
//                 <input
//                   type="email"
//                   name="email"
//                   value={editedData.email || ""}
//                   onChange={handleChange}
//                   className="border border-green-500 rounded-md p-2 w-full"
//                 />
//               ) : (
//                 <span>{tourGuide?.email || "Not Provided"}</span>
//               )}
//             </div>
//             <div className="profile-detail">
//               <strong>Mobile Number:</strong>
//               {isEditing ? (
//                 <input
//                   type="tel"
//                   name="mobileNumber"
//                   value={editedData.mobileNumber || ""}
//                   onChange={handleChange}
//                   className="border border-green-500 rounded-md p-2 w-full"
//                 />
//               ) : (
//                 <span>{tourGuide?.mobileNumber || "Not Provided"}</span>
//               )}
//             </div>
//             <div className="profile-detail">
//               <strong>Nationality:</strong>
             
//                 <span>{tourGuide?.nationality || "Not Provided"}</span>
             
//             </div>
//             <div className="profile-detail">
//               <strong>Years of Experience:</strong>
//               {isEditing ? (
//                 <input
//                   type="number"
//                   name="yearsOfExperience"
//                   value={editedData.yearsOfExperience || ""}
//                   onChange={handleChange}
//                   className="border border-green-500 rounded-md p-2 w-full"
//                 />
//               ) : (
//                 <span>{tourGuide?.yearsOfExperience || "Not Provided"}</span>
//               )}
//             </div>
//             <div className="profile-detail">
//               <strong>Status:</strong>
//               <span >
              
//                   {tourGuide?.status || "Not Provided"}
             
//               </span>
//             </div>
//             <div className="profile-detail">
//             <strong>Trips:</strong> 
// {tourGuide?.itineraries?.length > 0 
//   ? tourGuide.itineraries.map((itinerary, index) => (
//       <span key={index}>{itinerary.name}{index < tourGuide.itineraries.length - 1 ? ', ' : ''}</span>
//     ))
//   : 'No trips yet'}
//   </div>

//             {!isEditing && (
//               <button
//                 className="rounded-md hover:shadow-lg"
//                 style={{
//                   width:"50%",
//                   backgroundColor: watermelonPink,
//                   color: "white",
//                   padding: "10px 20px",
//                   fontSize: "1.2rem",
//                   border: "none",
//                   cursor: "pointer",
//                   transition: "background-color 0.3s, transform 0.3s",
//                   marginLeft: "150px"
//                 }}
//                 onMouseOver={(e) => (e.target.style.backgroundColor = "#D8326F")}
//                 onMouseOut={(e) => (e.target.style.backgroundColor = watermelonPink)}
//                 onClick={handleChangePassword}
//               >
//                 Change Password
//               </button>
              
//             )}

//             {isEditing ? (
//               <div className="flex gap-4 mt-4">
//                 <button
//    className="rounded-md hover:shadow-lg"
//                 style={{
//                   width:"50%",
//                   backgroundColor: watermelonPink,
//                   color: "white",
//                   padding: "10px 20px",
//                   fontSize: "1.2rem",
//                   border: "none",
//                   cursor: "pointer",
//                   transition: "background-color 0.3s, transform 0.3s",
//                 }}
//                 onMouseOver={(e) => (e.target.style.backgroundColor = "#D8326F")}
//                 onMouseOut={(e) => (e.target.style.backgroundColor = watermelonPink)}  onClick={handleConfirm}
//                 >
//                   Confirm
//                 </button>
//                 <button
//    className="rounded-md hover:shadow-lg"
//    style={{
//     width:"50%",
//     backgroundColor: watermelonPink,
//     color: "white",
//     padding: "10px 20px",
//     fontSize: "1.2rem",
//     border: "none",
//     cursor: "pointer",
//     transition: "background-color 0.3s, transform 0.3s",
//   }}
//    onMouseOver={(e) => (e.target.style.backgroundColor = "#D8326F")}
//    onMouseOut={(e) => (e.target.style.backgroundColor = watermelonPink)}                  onClick={handleCancel}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             ) : (
//                 <>
//               <button
//               className="rounded-md hover:shadow-lg"
//               style={{
                
//                 marginTop:20,
//                 backgroundColor: watermelonPink,
//                 width:"50%",
//                 color: "white",
//                 padding: "10px 20px",
//                 fontSize: "1.2rem",
//                 border: "none",
//                 cursor: "pointer",
//                 transition: "background-color 0.3s, transform 0.3s",
//                 marginLeft: "150px"
//               }}
//               onMouseOver={(e) => (e.target.style.backgroundColor = "#D8326F")}
//               onMouseOut={(e) => (e.target.style.backgroundColor = watermelonPink)}                onClick={handleEdit}
//               >
//                 Update Profile
//               </button>
//                <button
//                   className="rounded-md hover:shadow-lg"
//                   style={{
//                     marginTop:20,
//                     width:"50%",
//                     backgroundColor: "#FF4136",
//                     color: "white",
//                     padding: "10px 20px",
//                     fontSize: "1.2rem",
//                     border: "none",
//                     cursor: "pointer",
//                     transition: "background-color 0.3s, transform 0.3s",
//                     marginLeft: "150px"                  }}
//                   onMouseOver={(e) => (e.target.style.backgroundColor = "#E60000")}
//                   onMouseOut={(e) => (e.target.style.backgroundColor = "#FF4136")}
//                   onClick={handleRequestDeletion }
//                 >
//                   Request Account Deletion
//                 </button>
//               </>
//             )}
//           </div>

//           <div className="comments-section">
//             <h3>Comments</h3>
//             {tourGuide?.comments?.length > 0 ? (
//               <ul>
//                 {tourGuide.comments.map((comment, index) => (
//                   <li key={index}>
//                     <strong>{comment.user.name}:</strong> {comment.comment}
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <p>No comments yet.</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TourGuideProfile;



import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  FaUser, FaEnvelope, FaFileAlt, FaIdCard, FaFileInvoiceDollar,
  FaEdit, FaCheck, FaTimes, FaTrash, FaKey, FaShoppingBasket
} from 'react-icons/fa';
import Navbar from './navbar/Navbar';
import Sidebar from './sidebar/Sidebar';
import ChangePasswordTourGuide from './changePasswordTourGuide';
import ProfilePhoto from './ProfilePhoto';

interface Guide {
  _id: string;
  username: string;
  email: string;
  idProof: string;
  nationality:string;
  yearsOfExperience:number;
  status: 'pending' | 'accepted' | 'rejected';
  deletionRequest: 'Pending' | 'Accepted' | 'Rejected' | null;
  photo: string;
  mobileNumber:number;
  createdAt: string;
}

interface FormData {
  Username: string;
  Email: string;
  Mobile:number;
  yearsOfExperience:number;

}
const TourGuideProfile = ()=> {
  //const { id } = useParams<{ id: string }>();
  const{id}=useParams();
  const navigate = useNavigate();
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [seller, setSeller] = useState<Guide | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updateLogo,setUpdateLogo]=useState(false);
  const[sellerLogo,setSellerLogo]=useState("");
  const [formData, setFormData] = useState<FormData>({
    Username: '',
    Email: '',
    Mobile : 0,
    yearsOfExperience:0


  });

  useEffect(() => {
    const fetchSeller = async () => {
      try {
        const response = await fetch(`/api/tourGuide/getGuide/${id}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setSeller(data);
        if (data.Logo) {
          setSellerLogo(`/uploads/${data.Logo}`);
        }
        
        setFormData({
          Username: data.Name,
          Email: data.Email,
          Mobile:data.mobileNumber,
          yearsOfExperience:data.yearsOfExperience

        });
      } catch (error) {
        console.error('Error fetching guide details:', error);
        alert('Failed to fetch guide details. Please try again.');
      }
    };

    fetchSeller();
  }, [id]);



  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    setIsEditing(true);
  };

  const handleConfirm = async () => {
    setIsEditing(false);
    try {
      await axios.put(`/api/tourGuide/updateGuide/${id}`, formData);
      alert('guide details updated successfully!');
      const response = await fetch(`/api/Guide/getGuide/${id}`);
      const updatedData = await response.json();
      setSeller(updatedData);
    } catch (error) {
      console.error('Error updating guide details:', error);
      alert('Failed to update guide details. Please try again.');
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (seller) {
      setFormData({
        Username: seller.username,
        Email: seller.email,
        Mobile:seller.mobileNumber,
        yearsOfExperience:seller.yearsOfExperience,
      });
    }
  };

  const handleUpdateLogo = () => {
    setUpdateLogo(true);
  };


  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete your account? This action is irreversible.'
    );
    if (confirmed) {
      try {
        const response = await fetch(
          `/api/tourGuide/requestDeletionGuide/${id}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.ok) {
          alert('Request to delete account sent successfully.');
         // navigate('/');
        } else {
          alert('Failed to send deletion request. Please try again.');
        }
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('An error occurred while trying to delete the account.');
      }
    }
  };

  if (!seller) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#f4eaef76]">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#91c297]"></div>
      </div>
    );
  }

  return (
    <div
        style={{
          backgroundColor: "#fff",
          minHeight: "100vh", // Ensures it covers the full viewport
          width: "102%", // Full width of the viewport
          margin: 0, // Remove default margins
          padding: 0, // Remove default padding
          display: "flex", // Optional: for flexible alignment
          flexDirection: "column",
        }}
      >
        <div className="listAdminProduct">
          <Sidebar  />
          <div className="listContainerAdminProduct">
            <Navbar  />
            <div style={{ padding: "20px" }}>
        <div className="flex-1 max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-[#91c297] p-5 relative">
              <div className="absolute top-4 right-4">
                <button
                  onClick={handleUpdate}
                  className="flex items-center px-3 py-1 bg-white text-[#91c297] hover:bg-[#f9e2eb]/90 rounded shadow"
                >
                  <FaEdit className="mr-1" size="1em" />
                  Edit
                </button>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-white rounded-full p-2">
                <div className="bg-white rounded-full p-2">
                <div className="h-16 w-16 text-[#91c297]">
        {sellerLogo ? (
          <img  className="h-16 w-16 text-[#91c297]" src={sellerLogo} alt="Logo Preview"  />
        ) : (
                   <FaUser className="h-16 w-16 text-[#91c297]" /> 
        )}
      </div>                </div>
                </div>
                
                <div>
  <div className="text-3xl font-bold text-white">
    {isEditing ? (
      <input
        type="text"
        name="Name"
        value={formData.Username}
        onChange={handleInputChange}
        className="w-full text-3xl font-bold text-black p-2 border border-[#91c297] rounded focus:ring-2 focus:ring-[#91c297]"
      />
    ) : (
      <h2
        className="text-3xl font-bold text-white cursor-pointer"
        onClick={() => setIsEditing(true)}
      >
        {seller.username}
      </h2>
    )}
  </div>
  <p className="text-white opacity-75">
    Member since {new Date(seller.createdAt).toLocaleDateString()}
  </p>
</div>

              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center text-[#e89bb5] mb-2">
                    <FaEnvelope className="mr-2 text-[#91c297]" size="1em" />
                    Email:
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="Email"
                      value={formData.Email}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-[#91c297] rounded focus:ring-2 focus:ring-[#91c297]"
                    />
                  ) : (
                    <p className="text-gray-700">{seller.email}</p>
                  )}
                </div>
                <div>
                  <label className="flex items-center text-[#e89bb5] mb-2">
                    <FaFileAlt className="mr-2 text-[#91c297]" size="1em" />
                    Mobile Number:
                  </label>
                  {isEditing ? (
                    <textarea
                      name="Mobile Number"
                      value={formData.Mobile}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-[#91c297] rounded focus:ring-2 focus:ring-[#91c297]"
                      rows={3}
                    />
                  ) : (
                    <p className="text-gray-700">{seller.mobileNumber || 'No description provided'}</p>
                  )}
                </div>
                <div>
                  <label className="flex items-center text-[#e89bb5] mb-2">
                    <FaIdCard className="mr-2 text-[#91c297]" size="1em" />
                    ID Proof:
                  </label>
                  <p className="text-gray-700">{seller.idProof || 'Not provided'}</p>
                </div>
                {/* <div>
                  <label className="flex items-center text-[#e89bb5] mb-2">
                    <FaFileInvoiceDollar className="mr-2 text-[#91c297]" size="1em" />
                    Taxation Registry Card:
                  </label>
                  <p className="text-gray-700">{seller.taxationRegistryCard || 'Not provided'}</p>
                </div> */}
                <div>
                  <label className="flex items-center text-[#e89bb5] mb-2">
                    Status:
                  </label>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    seller.status === 'accepted' ? 'bg-green-100 text-green-800' :
                    seller.status === 'rejected' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {seller.status.charAt(0).toUpperCase() + seller.status.slice(1)}
                  </span>
                </div>
                {/* <div>
                  <label className="flex items-center text-[#e89bb5] mb-2">
                    <FaShoppingBasket className="mr-2 text-[#91c297]" size="1em" />
                    Products:
                  </label>
                  <p className="text-gray-700">{seller.Products.length} products</p>
                </div> */}
              </div>
              <div className="border-t border-gray-200 my-6"></div>

              {isEditing ? (
                <div className="flex justify-end items-center">
                  <div className="flex space-x-4">
                    <button
                      onClick={handleConfirm}
                      className="flex items-center px-4 py-2 bg-[#91c297] hover:bg-[#7ab481] text-white rounded"
                    >
                      <FaCheck className="mr-2" size="1em" />
                      Confirm
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex items-center px-4 py-2 border border-[#91c297] text-[#91c297] hover:bg-[#91c297]/10 rounded"
                    >
                      <FaTimes className="mr-2" size="1em" />
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-4">
                      <button
                        onClick={handleUpdateLogo}
                        className="flex items-center px-4 py-2 border border-[#91c297] text-[#91c297] hover:bg-[#91c297]/10 rounded whitespace-nowrap"
                      >
                        <FaUser className="mr-2" size="1em" />
                        Update Logo
                      </button>
                      <button
                        onClick={() => setShowPasswordModal(true)}
                        className="flex items-center px-4 py-2 border border-[#91c297] text-[#91c297] hover:bg-[#91c297]/10 rounded whitespace-nowrap"
                      >
                        <FaKey className="mr-2" size="1em" />
                        Change Password
                      </button>
                    </div>
                    <button
                      onClick={handleDeleteAccount}
                      className="flex items-center px-4 py-2 bg-[#e89bb5] hover:bg-[#d787a1] text-white rounded whitespace-nowrap"
                    >
                      <FaTrash className="mr-2" size="1em" />
                      Request Account Deletion
                    </button>
                  </div>
                </>
              )}
              {
        updateLogo && (
          <ProfilePhoto 
          id={id}
          //onClose={() => setUpdateLogo(false)}
          />
        )
      }
            </div>
            
          </div>
        </div>
       
      </div>
      
      </div>
     
      </div>
     
      {showPasswordModal && (
        <ChangePasswordTourGuide
        //  id={id}
         // onClose={() => setShowPasswordModal(false)}
        />
      )}
     
    </div>
  );
}
export default TourGuideProfile;

