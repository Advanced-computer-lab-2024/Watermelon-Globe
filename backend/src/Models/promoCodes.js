const mongoose = require("mongoose");

// Define the PromoCode schema
const promoCodeSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
    },
    discountValue: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
  },
  {
    timestamps: true,
  }
);

// Create the PromoCode model
const PromoCode = mongoose.model("PromoCode", promoCodeSchema);

module.exports = PromoCode;
