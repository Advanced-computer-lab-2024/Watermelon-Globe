import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaEdit, FaImage, FaStar, FaStarHalfAlt } from "react-icons/fa";
import UploadActivityPicture from "../UploadActivityImage";
import Sidebar from "../../Components/sidebar/Sidebar";
import Navbar from "../../Components/AdvertiserNavbar";
import { Category } from "@mui/icons-material";
import { Tags } from "lucide-react";

const ActivityDetails = () => {
  const { id } = useParams();
  const [activity, setActivity] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState({
    Name: "",
    Price: "",
    Date: "",
    Time: "",
    Category: "",
    Tags: "",
    description: "",
  });
  const [showUpdatePicture, setShowUpdatePicture] = useState(false);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const response = await axios.get(`/api/Activities/getActivityById/${id}`);
        setActivity(response.data);
      } catch (error) {
        console.error("Error fetching activity details:", error);
      }
    };
    fetchActivity();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    setIsEditing(false);
    setUpdatedProduct({ name: "", price: "", description: "" });
  };

  const handleUpdateProduct = async () => {
    const filteredUpdateData = Object.fromEntries(
      Object.entries(updatedProduct).filter(([key, value]) => value.trim() !== "")
    );

    try {
      const response = await fetch(`/api/Seller/editProduct?id=${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(filteredUpdateData),
      });

      if (response.ok) {
        const updatedDetails = await response.json();
        setActivity({ ...activity, ...updatedDetails });
        setIsEditing(false);
      } else {
        console.error("Failed to update activity");
      }
    } catch (error) {
      console.error("Error updating activity:", error);
    }
  };

  const renderRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`star-${i}`} className="text-[#e89bb5]" />);
    }

    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half-star" className="text-[#e89bb5]" />);
    }

    while (stars.length < 5) {
      stars.push(<FaStar key={`empty-star-${stars.length}`} className="text-gray-300" />);
    }

    return stars;
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f4eaef76" }}>
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
          <Sidebar />
          <div className="listContainerAdminProduct">
            <Navbar />
            <div style={{ padding: "20px" }}>
        <div className="flex-1 p-8">
          <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden border-2 border-[#91c297]">
            <div className="md:flex">
              <div className="md:flex-shrink-0 md:w-1/3">
                <img
                  className="h-full w-full object-cover md:w-full"
                  src={activity?.picture || "https://via.placeholder.com/300"}
                  alt={activity?.Name}
                />
              </div>
              <div className="p-8 md:w-2/3">
                {isEditing ? (
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Edit Activity Details</h2>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Activity Name :
                      </label>
                    <input
                      name="name"
                      placeholder="Enter Product Name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onChange={handleInputChange}
                      defaultValue={activity?.Name}
                    />

<                   label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                        Activity Price :
                      </label>
                    <input
                      name="price"
                      placeholder="Enter Product Price"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onChange={handleInputChange}
                      defaultValue={activity?.Price}
                    />
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                        Description :
                      </label>
                    <textarea
                    
                      name="description"
                      placeholder="Enter Product Description"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onChange={handleInputChange}
                      defaultValue={activity?.description}
                      rows="4"
                    />
                    <div className="flex space-x-4">
                      <button
                        className="px-4 py-2 bg-[#91c297] text-white rounded-md hover:bg-[#7ab481] transition duration-300"
                        onClick={handleUpdateProduct}
                      >
                        Save Changes
                      </button>
                      <button
                        className="px-4 py-2 bg-[#e89bb5] text-gray-700 rounded-md hover:bg-[#d787a1] transition duration-300"
                        onClick={handleCancel}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="uppercase tracking-wide text-sm text-[#91c297] font-semibold mb-1">
                      Acivity Details
                    </div>
                    <h1 className="text-3xl font-bold text-black mb-2">{activity?.Name}</h1>
                    <p style={{marginLeft:5}} className="font-semibold text-gray-900">${activity?.Price}</p>
                    <p className="text-gray-600 mb-4">{activity?.Time}</p>
                    <p className="text-gray-600 mb-4">{activity?.Date}</p>
                    <p className="text-gray-600 mb-4">{activity?.Category}</p>
                    <div className="flex items-baseline mt-4 mb-6 pb-6 border-b border-gray-200">
                      <div className="space-x-2 flex text-sm">
                        
                        
                      </div>
                    </div>
                    <div className="mt-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Tags</h3>
                        {activity?.tags?.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                            {activity.tags.map((tag, index) => (
                                <span
                                key={index}
                                className="bg-[#91c297] text-white px-3 py-1 rounded-md text-sm"
                                >
                                {tag.name}
                                </span>
                            ))}
                            </div>
                        ) : (
                            <p className="text-gray-500">No tags associated with this activity.</p>
                        )}
                    </div>

                    <div className="flex items-center mb-4">
                      <div className="flex items-center">
                        {renderRatingStars(activity?.rating || 0)}
                      </div>
                      <p className="ml-2 text-sm text-gray-600">
                        {activity?.rating ? `${activity.rating} out of 5 stars` : "Not rated yet"}
                      </p>
                    </div>
                    <div className="bg-[#f4eaef76] px-4 py-3 sm:px-6 rounded-md mb-4 border border-[#e89bb5]">
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">Date </span> {activity?.Date}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Reviews</h3>
                      {activity?.reviews?.length > 0 ? (
                        activity.reviews.map((review, index) => (
                          <div key={index} className="mb-4 pb-4 border-b border-gray-200 last:border-b-0">
                            <p className="text-gray-700">{review.review || "No review provided"}</p>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-500">No reviews yet for this activity.</p>
                      )}
                    </div>
                    <div className="mt-6 flex items-center space-x-4">
                      {/* <button
                        className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#91c297] hover:bg-[#7ab481] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={() => setIsEditing(true)}
                      >
                        <FaEdit className="mr-2" />
                        Edit Product
                      </button> */}
                      {/* <button
                        className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-black bg-[#e89bb5] hover:bg-[#d787a1] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={() => setShowUpdatePicture(!showUpdatePicture)}
                      >
                        <FaImage className="mr-2" />
                        Update Picture
                      </button> */}
                    </div>
                  </>
                )}
               <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Update Activity Picture</h3>
                    <UploadActivityPicture
                        id={id}
                        onSuccess={(newPicture) =>
                        setActivity((prev) => ({ ...prev, picture: newPicture }))
                        }
                    />
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>
    </div>
  );
};

export default ActivityDetails;