import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  TextField,
  Typography,
  Alert,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { FaUserPlus } from "react-icons/fa6";
import "./addPromoCodeForm.scss"; // Import the CSS file
import QrCode2Icon from "@mui/icons-material/QrCode2";

const AddPromoCodeForm = ({ onAdminAdded }) => {
  const [code, setCode] = useState("");
  const [discountValue, setDiscountValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Error state
  const [success, setSuccess] = useState(null);
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!code || !discountValue) {
      setError("Both code and discount value are required"); // Set error message
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post("/api/Admin/createPromoCode", {
        code,
        discountValue,
      });

      setSuccess("Promo Code added successfully!");
      setCode("");
      setDiscountValue("");
      onAdminAdded(response.data);

      // Reset success message after 5 seconds
      setTimeout(() => setSuccess(null), 5000);
    } catch (err) {
      setError("Failed to add promo code");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="addAdminForm">
      <Typography variant="h6">Add Promo Code</Typography>
      <QrCode2Icon />
      <div className=""></div>

      {/* Show error Alert if error state is set */}
      {error && (
        <Alert severity="error" className="errorAlert">
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="formContainer">
        <TextField
          label="Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          variant="outlined"
          fullWidth
          margin="normal"
          className="customTextField"
        />
        <TextField
          label="Discount Value in %"
          //   type={showPassword ? "text" : "password"} // Toggle between text and password
          value={discountValue}
          onChange={(e) => setDiscountValue(e.target.value)}
          variant="outlined"
          fullWidth
          margin="normal"
          className="customTextField"
          //   InputProps={{
          //     endAdornment: (
          //       <InputAdornment position="end">
          //         <IconButton onClick={() => setShowPassword(!showPassword)}>
          //           {showPassword ? <VisibilityOff /> : <Visibility />}
          //         </IconButton>
          //       </InputAdornment>
          //     ),
          //   }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary" // This can be left as primary, or omitted if you don't want default behavior
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
          {loading ? "Adding..." : "Add Promo Code"}
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

export default AddPromoCodeForm;
