import React, { useState, useEffect } from "react";
import "./AddTag.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import AddTagForm from "../../components/addTagForm/addTagForm";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import SellRoundedIcon from "@mui/icons-material/SellRounded";

const AddTag = () => {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTag, setCurrentTag] = useState(null);
  const [newTagName, setNewTagName] = useState("");

  // Fetch tags
  const fetchTags = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/Admin/GetAllPreferenceTag");
      if (!response.ok) throw new Error("Failed to fetch tags");
      const data = await response.json();
      setTags(data);
    } catch (err) {
      setError("Error loading tags");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  // Add new tag
  const handleTagAdded = (newTag) => {
    setTags((prevTags) => [...prevTags, newTag]);
  };

  // Delete tag
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/Admin/DeletePreferenceTag/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete tag");
      setTags((prevTags) => prevTags.filter((tag) => tag._id !== id));
    } catch (err) {
      console.error("Failed to delete tag:", err);
    }
  };

  // Open modal for editing
  const handleEdit = (tag) => {
    setCurrentTag(tag);
    setNewTagName(tag.tag);
    setIsModalOpen(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentTag(null);
    setNewTagName("");
  };

  // Update tag
  const handleUpdateTag = async () => {
    if (!newTagName.trim()) {
      alert("Tag name cannot be empty");
      return;
    }

    try {
      const response = await fetch(
        `/api/Admin/UpdatePreferenceTag/${currentTag._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tag: newTagName }),
        }
      );
      if (!response.ok) throw new Error("Failed to update tag");

      const updatedTag = await response.json();
      console.log(updatedTag);
      setTags((prevTags) =>
        prevTags.map((tag) => (tag._id === updatedTag._id ? updatedTag : tag))
      );
      handleCloseModal();
    } catch (err) {
      console.error("Error updating tag:", err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="listTag">
      <Sidebar />
      <div className="listContainerTag">
        <Navbar />
        <div className="cardsContainerTag">
          {tags.map((tag) => (
            <Card
              key={tag._id}
              className="tagCard"
              sx={{
                marginBottom: 2,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" component="div">
                  <SellRoundedIcon />
                  {tag.tag}
                </Typography>
              </CardContent>

              <div
                className="cardActionsTag"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "10px",
                }}
              >
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => handleEdit(tag)}
                  sx={{
                    backgroundColor: "#91c297",
                    color: "#fff",
                    "&:hover": { backgroundColor: "#77a17a" },
                    width: "50%",
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => handleDelete(tag._id)}
                  sx={{
                    backgroundColor: "#d32e65",
                    color: "#fff",
                    "&:hover": { backgroundColor: "#b02453" },
                    width: "50%",
                  }}
                >
                  Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* AddTagForm */}
        <AddTagForm onTagAdded={handleTagAdded} />
      </div>

      {/* Modal */}
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="edit-tag-modal"
        aria-describedby="modal-to-edit-tag-name"
      >
        <div className="modalContent">
          <h2>Edit Tag</h2>
          <TextField
            label="Tag Name"
            value={newTagName}
            onChange={(e) => setNewTagName(e.target.value)}
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
            onClick={handleUpdateTag}
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
            Update Tag
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

export default AddTag;
