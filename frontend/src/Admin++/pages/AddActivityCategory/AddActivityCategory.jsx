import React, { useState, useEffect } from "react";
import "./AddActivityCategory.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import AddActivityCategoryForm from "../../components/addActivityCategoryForm/addActivityCategoryForm";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import CategoryIcon from "@mui/icons-material/Category"; // Use category icon

const AddActivityCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState("");

  // Fetch categories
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/Admin/GetAllActivityCategory/");
      if (!response.ok) throw new Error("Failed to fetch categories");
      const data = await response.json();
      console.log(data);
      setCategories(data);
    } catch (err) {
      setError("Error loading categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Add new category
  const handleCategoryAdded = (newCategory) => {
    setCategories((prevCategories) => [...prevCategories, newCategory]);
  };

  // Delete category
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/Admin/DeleteActivityCategory/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete category");
      setCategories((prevCategories) =>
        prevCategories.filter((category) => category._id !== id)
      );
    } catch (err) {
      console.error("Failed to delete category:", err);
    }
  };

  // Open modal for editing
  const handleEdit = (category) => {
    setCurrentCategory(category);
    setNewCategoryName(category.activity);
    setIsModalOpen(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentCategory(null);
    setNewCategoryName("");
  };

  // Update category
  const handleUpdateCategory = async () => {
    if (!newCategoryName.trim()) {
      alert("Category name cannot be empty");
      return;
    }

    try {
      const response = await fetch(
        `/api/Admin/UpdateActivityCategory/${currentCategory._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ activity: newCategoryName }),
        }
      );
      if (!response.ok) throw new Error("Failed to update category");

      const updatedCategory = await response.json();
      setCategories((prevCategories) =>
        prevCategories.map((category) =>
          category._id === updatedCategory._id ? updatedCategory : category
        )
      );
      handleCloseModal();
    } catch (err) {
      console.error("Error updating category:", err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="addActivityCategory">
      <Sidebar />
      <div className="listContainerActivity">
        <div className="cardsContainerActivity">
          {categories.map((category) => (
            <Card
              key={category._id}
              className="activityCategoryCard"
              sx={{ marginBottom: 2 }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  component="div"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <CategoryIcon style={{ marginRight: "10px" }} />
                  {category.activity}
                </Typography>
                <div className="cardActionsActivity">
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleEdit(category)}
                    sx={{
                      backgroundColor: "#91c297",
                      color: "#fff",
                      "&:hover": { backgroundColor: "#77a17a" },
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleDelete(category._id)}
                    sx={{
                      backgroundColor: "#d32e65",
                      color: "#fff",
                      "&:hover": { backgroundColor: "#b02453" },
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* AddActivityCategoryForm */}
        <AddActivityCategoryForm onCategoryAdded={handleCategoryAdded} />
      </div>

      {/* Modal */}
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="edit-category-modal"
        aria-describedby="modal-to-edit-category-name"
      >
        <div className="modalContent">
          <h2>Edit Category</h2>
          <TextField
            label="Category Name"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            fullWidth
            sx={{
              marginBottom: 2,
              "& .MuiOutlinedInput-root": {
                borderColor: "#91c297", // Outline color when the field is not focused
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#d32e65", // Outline color when hovered
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#d32e65", // Outline color when focused
                },
              },
              "& .MuiInputLabel-root": {
                color: "#555", // Color of the label
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#d32e65", // Color of the label when focused
              },
            }}
          />
          <Button
            onClick={handleUpdateCategory}
            color="primary"
            variant="contained"
            sx={{
              marginTop: 2,
              backgroundColor: "#91c297", // Background color for the button
              color: "#fff", // Text color for the button
              border: "1px solid #4caf50", // Border color
              "&:hover": {
                backgroundColor: "#91c297", // Hover background color
              },
            }}
          >
            Update Category
          </Button>
          <Button
            onClick={handleCloseModal}
            color="secondary"
            sx={{
              marginTop: 2,
              backgroundColor: "#fff", // Background color for the button
              color: "#d32e65", // Text color for the button
              border: "none", // Border color
              "&:hover": {
                backgroundColor: "#f1f1f1", // Hover background color
              },
            }}
          >
            Cancel
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default AddActivityCategory;
