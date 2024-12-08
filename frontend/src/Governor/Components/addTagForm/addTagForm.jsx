import React, { useState } from "react";
import axios from "axios";
import { Button, TextField, Typography, Alert } from "@mui/material";
import { FaTag } from "react-icons/fa6"; // Use a tag icon
import "./addTagForm.scss"; // Import the CSS file

const AddTagFormGovernor = ({ onTagAdded }) => {
  const [tag, setTag] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Error state
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!tag) {
      setError("Tag name is required");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post("/api/Governor/CreatePreferenceTag", {
        tag,
      });

      setSuccess("Tag added successfully!");
      setTag("");
      onTagAdded(response.data);

      // Reset success message after 5 seconds
      setTimeout(() => setSuccess(null), 5000);
    } catch (err) {
      setError("Failed to add tag");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="addTagForm">
      <Typography variant="h6">
        Add New Tag
        <FaTag />
      </Typography>

      {/* Show error Alert if error state is set */}
      {error && (
        <Alert severity="error" className="errorAlert">
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="formContainer">
        <TextField
          label="Tag Name"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          variant="outlined"
          fullWidth
          margin="normal"
          className="customTextField"
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
          fullWidth
          sx={{
            backgroundColor: "#91c297",
            color: "white", // White text color
            fontSize: "16px",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: "#7f9d74",
            },
            "&:active": {
              backgroundColor: "#6a8e60",
            },
            "&:focus": {
              backgroundColor: "#91c297",
            },
          }}
        >
          {loading ? "Adding..." : "Add Tag"}
        </Button>

        {/* Success Alert - Positioned at the bottom */}
        {success && (
          <Alert severity="success" className="successAlert">
            {success}
          </Alert>
        )}
      </form>
    </div>
  );
};

export default AddTagFormGovernor;
