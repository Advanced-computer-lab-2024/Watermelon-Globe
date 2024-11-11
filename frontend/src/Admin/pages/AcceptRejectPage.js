import React, { useEffect, useState } from "react";

const TagSelection = () => {
  const [tags, setTags] = useState([]); // Stores tags fetched from the backend
  const [selectedTags, setSelectedTags] = useState([]); // Stores the selected tags
  const maxSelection = 2; // Maximum number of selectable tags

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

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Choose up to {maxSelection} tags</h2>
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
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "1200px", // Doubled width to make the page significantly larger
    margin: "20px auto", // Reduced margin from the top
    padding: "60px", // Decreased padding for more compact content
    backgroundColor: "#222",
    borderRadius: "16px",
    color: "#fff",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
    height: "auto", // Allow the container to expand to fit content
  },
  title: {
    marginBottom: "20px", // Reduced margin to move text upwards
    fontSize: "32px", // Larger font for the title
    fontWeight: "bold",
  },
  tagGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", // Decreased min-width of columns for smaller tags
    gap: "16px", // Decreased gap for more compact arrangement
  },
  tag: {
    padding: "16px", // Reduced padding for smaller tags
    borderRadius: "8px",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    fontSize: "16px", // Slightly smaller font size for tags
  },
};

export default TagSelection;
