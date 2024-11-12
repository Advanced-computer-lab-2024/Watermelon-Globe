import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const TagSelection = () => {
  const [tags, setTags] = useState([]); // Stores tags fetched from the backend
  const [selectedTags, setSelectedTags] = useState([]); // Stores the selected tags
  const maxSelection = 3; // Maximum number of selectable tags

  const navigate = useNavigate(); // Initialize useNavigate

  // Fetch tags from API when the component mounts
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch("/api/Admin/GetAllPreferenceTag"); // Replace with your API endpoint
        const data = await response.json();
        setTags(data);
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };

    fetchTags();
  }, []);

  // Handles tag selection and ensures selection limit
  const handleTagClick = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag)); // Remove if already selected
    } else if (selectedTags.length < maxSelection) {
      setSelectedTags([...selectedTags, tag]); // Add tag if limit not reached
    }
  };

  // Navigation handlers
  const handleNext = () => {
    navigate("/MainTouristPage/672cd143a72c43a2d8fb01c0", {
      state: { selectedTags },
    }); // Replace with the actual path for the next page
  };

  const handleSkip = () => {
    navigate("/MainTouristPage/672cd143a72c43a2d8fb01c0", {
      state: { selectedTags: [] },
    }); // Replace with the actual path for the skip page
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Choose up to {maxSelection} prefrences</h2>
      <div style={styles.tagGrid}>
        {tags.map((tag) => (
          <button
            key={tag.id}
            onClick={() => handleTagClick(tag.tag)}
            style={{
              ...styles.tag,
              backgroundColor: selectedTags.includes(tag.tag)
                ? "#4CAF50"
                : "#333",
            }}
          >
            {tag.tag}
          </button>
        ))}
      </div>

      {/* Skip and Next Text Links */}
      <div style={styles.textContainer}>
        <span style={styles.skipText} onClick={handleSkip}>
          Skip
        </span>
        <span style={styles.nextText} onClick={handleNext}>
          Next
        </span>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "1200px",
    margin: "20px auto",
    padding: "60px",
    backgroundColor: "#222",
    borderRadius: "16px",
    color: "#fff",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
    height: "auto",
    position: "relative",
  },
  title: {
    marginBottom: "20px",
    fontSize: "32px",
    fontWeight: "bold",
  },
  tagGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
    gap: "16px",
  },
  tag: {
    padding: "16px",
    borderRadius: "8px",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
  },
  textContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    bottom: "20px",
    right: "20px",
    width: "calc(100% - 40px)",
  },
  skipText: {
    color: "#888",
    fontSize: "16px",
    cursor: "pointer",
    textDecoration: "underline",
    marginRight: "auto",
  },
  nextText: {
    color: "#4CAF50",
    fontSize: "16px",
    cursor: "pointer",
    textDecoration: "underline",
  },
};

export default TagSelection;
