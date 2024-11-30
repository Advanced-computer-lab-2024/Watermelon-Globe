import React, { useState, useEffect } from "react";
import "./AddTag.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import AddTagForm from "../../components/addTagForm/addTagForm";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
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

  // Fetch existing tags from API
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch("/api/Admin/GetAllPreferenceTag");
        if (!response.ok) {
          throw new Error("Failed to fetch tags");
        }
        const data = await response.json();
        setTags(data);
        setLoading(false);
      } catch (err) {
        setError("Error loading tags");
        setLoading(false);
      }
    };

    fetchTags();
  }, []);

  // Add new tag handler
  const handleTagAdded = (newTag) => {
    setTags((prevTags) => [...prevTags, newTag]);
  };

  // Delete tag handler
  const handleDelete = async (id) => {
    try {
      await fetch(`/api/Admin/DeletePreferenceTag/${id}`, { method: "DELETE" });
      setTags((prevTags) => prevTags.filter((tag) => tag._id !== id));
    } catch (err) {
      console.error("Failed to delete tag:", err);
    }
  };

  // Open the modal to edit tag
  const handleEdit = (tag) => {
    setCurrentTag(tag);
    setNewTagName(tag.tag); // Set the current tag name in the form
    setIsModalOpen(true);
  };

  // Close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentTag(null);
    setNewTagName("");
  };

  // Handle the edit form submission
  const handleUpdateTag = async () => {
    if (!newTagName) {
      alert("Tag name cannot be empty");
      return;
    }

    try {
      const response = await fetch(
        `/api/UpdatePreferenceTag/${currentTag._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tag: newTagName,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update tag");
      }

      const updatedTag = await response.json();
      setTags((prevTags) =>
        prevTags.map((tag) =>
          tag._id === updatedTag._id ? { ...tag, tag: updatedTag.tag } : tag
        )
      );

      // Close the modal after successful update
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
        <div className="cardsContainerTag">
          {tags.map((tag) => (
            <Card key={tag._id} className="tagCard" sx={{ marginBottom: 2 }}>
              <CardContent>
                <Typography variant="h6" component="div">
                  <SellRoundedIcon />
                  {tag.tag}
                </Typography>
                <div className="cardActionsTag">
                  <IconButton
                    className="edit" // Edit button comes first
                    onClick={() => handleEdit(tag)}
                    aria-label="edit"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    className="delete" // Delete button comes second
                    onClick={() => handleDelete(tag._id)}
                    aria-label="delete"
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* AddTagForm component */}
        <AddTagForm onTagAdded={handleTagAdded} />
      </div>

      {/* Modal for editing the tag */}
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
          />
          <Button
            onClick={handleUpdateTag}
            color="primary"
            variant="contained"
            sx={{ marginTop: 2 }}
          >
            Update Tag
          </Button>
          <Button
            onClick={handleCloseModal}
            color="secondary"
            sx={{ marginTop: 2 }}
          >
            Cancel
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default AddTag;
