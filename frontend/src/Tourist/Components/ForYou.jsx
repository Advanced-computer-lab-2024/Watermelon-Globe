import React, { useState, useRef, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

const ForYou = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const { selectedTags } = state || {}; // Access selectedTags from state
  const [activities, setActivities] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const activitiesScrollRef = useRef(null);

  useEffect(() => {
    if (selectedTags && selectedTags.length > 0) {
      fetchActivities();
    }
  }, [selectedTags]);

  useEffect(() => {
    filterActivities();
  }, [activities, selectedTags]);

  const fetchActivities = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/Activities/getActivitiesNew");
      console.log(response);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data && data.activities && Array.isArray(data.activities)) {
        setActivities(data.activities);
      } else {
        setActivities([]);
      }
    } catch (error) {
      setError("Failed to fetch activities. Please try again later.");
      setActivities([]);
    } finally {
      setIsLoading(false);
    }
  };

  const filterActivities = () => {
    if (!selectedTags || selectedTags.length === 0) {
      setFilteredActivities([]); // No tags, no filtered activities
      return;
    }

    // Filter activities based on selected tags
    const filtered = activities.filter((activity) =>
      selectedTags.some((tag) => activity.tags.includes(tag))
    );
    setFilteredActivities(filtered);
  };

  return (
    <div>
      {selectedTags && selectedTags.length > 0 && (
        <section className="container mx-auto px-4 py-12 bg-gray-50">
          <h2 className="text-3xl font-bold mb-8 text-left text-gray-800">
            Suggested for you
          </h2>
          {isLoading && <p>Loading...</p>}
          {error && <p>{error}</p>}
          <div ref={activitiesScrollRef}>
            {filteredActivities.map((activity) => (
              <div key={activity.id}>
                <h3>{activity.name}</h3>
                <p>{activity.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ForYou;
