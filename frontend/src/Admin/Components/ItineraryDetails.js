import { useState } from "react";

const ItineraryDetails = ({ itinerary, onViewDescription }) => {
  const [inappropriate, setInappropriate] = useState(itinerary.inappropriate);
  const [error, setError] = useState(null); // State to track error messages

  // Function to handle checkbox change
  const handleCheckboxChange = async (e) => {
    const isChecked = e.target.checked;

    try {
      // Make a PUT request to mark the itinerary as inappropriate
      const response = await fetch(`/api/Admin/markItineraryInappropriate/` + itinerary._id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        }
      });

      const json = await response.json();

      if (response.ok) {
        // Set the inappropriate state to true on successful API call
        setInappropriate(true);
      } else {
        // Handle errors returned by the server
        setError(json.error || "Failed to mark itinerary as inappropriate.");
      }
    } catch (err) {
      // Handle any network or unexpected errors
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="activitycategory-details">
      <h4>{itinerary.name}</h4>

      {/* Checkbox to mark itinerary as inappropriate */}
      <label>
        <input
          type="checkbox"
          checked={inappropriate}
          onChange={handleCheckboxChange}
          disabled={inappropriate} // Disable if already inappropriate
        />
        Mark as Inappropriate
      </label>

      {/* Display error message if any */}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default ItineraryDetails;
