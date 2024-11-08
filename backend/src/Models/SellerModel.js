const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const sellerSchema = new Schema(
  {
    Name: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
    },
    Description: {
      type: String,
      required: true,
    },
    idProof: {
      type: String,
      required: false,
    },
    taxationRegistryCard: {
      type: String,
      required: false,
    },
    Password: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
    termsAndConditions: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
// #amel moshkela idk why
const Seller = mongoose.models.Seller || mongoose.model("Seller", sellerSchema);

module.exports = Seller;
