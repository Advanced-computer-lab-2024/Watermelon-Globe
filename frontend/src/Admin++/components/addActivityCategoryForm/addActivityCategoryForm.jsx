import React, { useState } from "react";
import axios from "axios";
import { Button, TextField, Typography, Alert } from "@mui/material";
import { FaListAlt } from "react-icons/fa"; // Icon for category
import "./addActivityCategoryForm.scss"; // Import the CSS file
import Navbar from "../../components/navbar/Navbar";

const AddActivityCategoryForm = ({ onCategoryAdded }) => {
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Error state
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!categoryName) {
      setError("Category name is required");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post("/api/Admin/CreateActivityCategory", {
        activity: categoryName,
      });

      setSuccess("Category added successfully!");
      setCategoryName("");
      onCategoryAdded(response.data); // Notify parent component with the new category

      // Reset success message after 5 seconds
      setTimeout(() => setSuccess(null), 5000);
    } catch (err) {
      setError("Failed to add category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="addActivityCategoryForm">
      <Typography variant="h6">
        Add New Activity Category <FaListAlt />
      </Typography>

      {/* Show error Alert if error state is set */}
      {error && (
        <Alert severity="error" className="errorAlert">
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="formContainer">
        <TextField
          label="Category Name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
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
          {loading ? "Adding..." : "Add Category"}
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

export default AddActivityCategoryForm;
