import { useState, useEffect } from "react";
import { useItineraryContext } from "../hooks/useItineraryContext";

const Itinerary = () => {
  const { itinerary, dispatch } = useItineraryContext();
  const [error, setError] = useState(null); // State to track errors
  const [loading, setLoading] = useState(false); // Loading state

  // Fetch itineraries on component mount
  useEffect(() => {
    const fetchItineraries = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/Itinerary/getAllItineraries");
        const json = await response.json();

        if (response.ok) {
          dispatch({ type: "SET_ITINERARY", payload: json });
        } else {
          setError("Failed to fetch itineraries");
        }
      } catch (err) {
        setError("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchItineraries();
  }, [dispatch]);

  // Handle marking itinerary as inappropriate
  const handleMarkInappropriate = async (itineraryId) => {
    try {
      const response = await fetch(`/api/Admin/markItineraryInappropriate/${itineraryId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const json = await response.json();

      if (response.ok) {
        // Update the inappropriate status locally
        dispatch({
          type: "SET_ITINERARY",
          payload: itinerary.map(item =>
            item._id === itineraryId ? { ...item, inappropriate: true } : item
          ),
        });
      } else {
        setError(json.error || "Failed to mark itinerary as inappropriate.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Itinerary Management</h1>

      {loading && <p className="text-center">Loading itineraries...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="grid gap-6 lg:grid-cols-3 sm:grid-cols-2">
        {itinerary &&
          itinerary.map((itineraryItem) => (
            <div
              key={itineraryItem._id}
              className="bg-white shadow-md p-6 rounded-lg border border-gray-200"
            >
              <h4 className="text-xl font-semibold mb-4">{itineraryItem.name}</h4>
              <p className="mb-2">Destination: {itineraryItem.locations}</p>
              <p className="mb-2">
                Available DDates:
                {itineraryItem.availableDates.map((date, index) => (
                    <span key={index}>
                    {new Date(date).toLocaleDateString("en-US")} {/* You can change the locale to fit your preferences */}
                    {index < itineraryItem.availableDates.length - 1 && ", "} {/* Add a comma between dates */}
                    </span>
                ))}
                </p>
              <p className="mb-4">Available Times: {itineraryItem.availableTimes}</p>

              <label className="flex items-center space-x-3 mb-4">
                <input
                  type="checkbox"
                  checked={itineraryItem.inappropriate}
                  onChange={() => handleMarkInappropriate(itineraryItem._id)}
                  disabled={itineraryItem.inappropriate}
                  className="form-checkbox h-5 w-5 text-red-600"
                />
                <span>Mark as Inappropriate</span>
              </label>

              {itineraryItem.inappropriate && (
                <p className="text-red-500">This itinerary has been marked as inappropriate.</p>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Itinerary;
