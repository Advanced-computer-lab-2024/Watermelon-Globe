

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TourGuideProfile.css";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import Sidebar from "./sidebar/Sidebar";
import ProfilePhotoUpload from "./ProfilePhoto";

const TourGuideProfile = () => {
  const { id } = useParams();
  const [tourGuide, setTourGuide] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showUpload, setShowUpload] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({});
  const navigate = useNavigate();
  const watermelonGreen = "#4CAF50";
  const watermelonPink = "#FF4081";

  useEffect(() => {
    const fetchTourGuideDetails = async () => {
      try {
        const response = await axios.get(`/api/tourGuide/getGuide/${id}`);
        setTourGuide(response.data);
        setEditedData(response.data); // Set initial data for editing
      } catch (err) {
        setError(err.response ? err.response.data.error : "Error loading tour guide details");
      } finally {
        setLoading(false);
      }
    };

    fetchTourGuideDetails();
  }, [id]);

  if (loading) return <p>Loading tour guide details...</p>;
  if (error) return <p>{error}</p>;

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedData({ ...tourGuide }); // Reset changes
  };

  const handleConfirm = async () => {
    try {
      const response = await axios.put(`/api/tourGuide/updateTourGuideNew/${id}`, editedData);
      setTourGuide(response.data);
      alert("Profile updated successfully!");
      setIsEditing(false);
    } catch (err) {
      alert(err.response ? err.response.data.error : "Error updating profile");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
  };

  const handleUploadPicture = () => {
    setShowUpload(true);
  };

  const handleChangePassword = () => {
    navigate(`/ChangePasswordTourGuide/${id}`);
  };

   const handleRequestDeletion = async () => {
    if (window.confirm("Are you sure you want to request account deletion? This action cannot be undone.")) {
      try {
        await axios.put(`/api/tourGuide/requestDeletionGuide/${id}`);
        alert("Your account deletion request has been submitted.");
        // Optionally, you can update the UI to reflect the pending deletion status
        setTourGuide({ ...tourGuide, deletionRequest: "Pending" });
      } catch (error) {
        alert("Error requesting account deletion: " + error.response?.data?.message || error.message);
      }
    }
  };


  const handleDeleteAccount = async () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      try {
        await axios.delete(`/api/TourGuide/deleteGuide/${id}`);
        alert("Your account has been deleted successfully.");
        navigate("/"); // Redirect to home page or login page
      } catch (error) {
        alert("Error deleting account: " + error.response?.data?.message || error.message);
      }
    }
  };

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <div className="tour-guide-profile">
          <div className="profile-header">
            <h1>{tourGuide?.name || "Name not provided"}</h1>
            <div className="profile-photo">
              {<ProfilePhotoUpload id={tourGuide?._id} />}
            </div>
          </div>

          <div className="profile-details">
            <div className="profile-detail">
              <strong>Email:</strong>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={editedData.email || ""}
                  onChange={handleChange}
                  className="border border-green-500 rounded-md p-2 w-full"
                />
              ) : (
                <span>{tourGuide?.email || "Not Provided"}</span>
              )}
            </div>
            <div className="profile-detail">
              <strong>Mobile Number:</strong>
              {isEditing ? (
                <input
                  type="tel"
                  name="mobileNumber"
                  value={editedData.mobileNumber || ""}
                  onChange={handleChange}
                  className="border border-green-500 rounded-md p-2 w-full"
                />
              ) : (
                <span>{tourGuide?.mobileNumber || "Not Provided"}</span>
              )}
            </div>
            <div className="profile-detail">
              <strong>Nationality:</strong>
             
                <span>{tourGuide?.nationality || "Not Provided"}</span>
             
            </div>
            <div className="profile-detail">
              <strong>Years of Experience:</strong>
              {isEditing ? (
                <input
                  type="number"
                  name="yearsOfExperience"
                  value={editedData.yearsOfExperience || ""}
                  onChange={handleChange}
                  className="border border-green-500 rounded-md p-2 w-full"
                />
              ) : (
                <span>{tourGuide?.yearsOfExperience || "Not Provided"}</span>
              )}
            </div>
            <div className="profile-detail">
              <strong>Status:</strong>
              <span >
              
                  {tourGuide?.status || "Not Provided"}
             
              </span>
            </div>
            <div className="profile-detail">
            <strong>Trips:</strong> 
{tourGuide?.itineraries?.length > 0 
  ? tourGuide.itineraries.map((itinerary, index) => (
      <span key={index}>{itinerary.name}{index < tourGuide.itineraries.length - 1 ? ', ' : ''}</span>
    ))
  : 'No trips yet'}
  </div>

            {!isEditing && (
              <button
                className="rounded-md hover:shadow-lg"
                style={{
                  width:"50%",
                  backgroundColor: watermelonPink,
                  color: "white",
                  padding: "10px 20px",
                  fontSize: "1.2rem",
                  border: "none",
                  cursor: "pointer",
                  transition: "background-color 0.3s, transform 0.3s",
                  marginLeft: "150px"
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = "#D8326F")}
                onMouseOut={(e) => (e.target.style.backgroundColor = watermelonPink)}
                onClick={handleChangePassword}
              >
                Change Password
              </button>
              
            )}

            {isEditing ? (
              <div className="flex gap-4 mt-4">
                <button
   className="rounded-md hover:shadow-lg"
                style={{
                  width:"50%",
                  backgroundColor: watermelonPink,
                  color: "white",
                  padding: "10px 20px",
                  fontSize: "1.2rem",
                  border: "none",
                  cursor: "pointer",
                  transition: "background-color 0.3s, transform 0.3s",
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = "#D8326F")}
                onMouseOut={(e) => (e.target.style.backgroundColor = watermelonPink)}  onClick={handleConfirm}
                >
                  Confirm
                </button>
                <button
   className="rounded-md hover:shadow-lg"
   style={{
    width:"50%",
    backgroundColor: watermelonPink,
    color: "white",
    padding: "10px 20px",
    fontSize: "1.2rem",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s, transform 0.3s",
  }}
   onMouseOver={(e) => (e.target.style.backgroundColor = "#D8326F")}
   onMouseOut={(e) => (e.target.style.backgroundColor = watermelonPink)}                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            ) : (
                <>
              <button
              className="rounded-md hover:shadow-lg"
              style={{
                
                marginTop:20,
                backgroundColor: watermelonPink,
                width:"50%",
                color: "white",
                padding: "10px 20px",
                fontSize: "1.2rem",
                border: "none",
                cursor: "pointer",
                transition: "background-color 0.3s, transform 0.3s",
                marginLeft: "150px"
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#D8326F")}
              onMouseOut={(e) => (e.target.style.backgroundColor = watermelonPink)}                onClick={handleEdit}
              >
                Update Profile
              </button>
               <button
                  className="rounded-md hover:shadow-lg"
                  style={{
                    marginTop:20,
                    width:"50%",
                    backgroundColor: "#FF4136",
                    color: "white",
                    padding: "10px 20px",
                    fontSize: "1.2rem",
                    border: "none",
                    cursor: "pointer",
                    transition: "background-color 0.3s, transform 0.3s",
                    marginLeft: "150px"                  }}
                  onMouseOver={(e) => (e.target.style.backgroundColor = "#E60000")}
                  onMouseOut={(e) => (e.target.style.backgroundColor = "#FF4136")}
                  onClick={handleRequestDeletion }
                >
                  Request Account Deletion
                </button>
              </>
            )}
          </div>

          <div className="comments-section">
            <h3>Comments</h3>
            {tourGuide?.comments?.length > 0 ? (
              <ul>
                {tourGuide.comments.map((comment, index) => (
                  <li key={index}>
                    <strong>{comment.user.name}:</strong> {comment.comment}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No comments yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourGuideProfile;
