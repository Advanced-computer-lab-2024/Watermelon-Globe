const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//added termsAndCondtions + status attribute
const tourGuideSchema = new Schema(
  {
    name: {
      type: String,
      required: false,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    mobileNumber: {
      type: String,
      required: false,
    },
    nationality: {
      type: String,
      required: false,
    },
    yearsOfExperience: {
      type: Number,
      required: false,
    },
    itineraries: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "itinerary", // References the Itinerary model
      },
    ],
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
    termsAndConditions: {
      type: Boolean,
      default: false,
    },
    idProof: {
      type: String,
      required: false,
    },
    certificates: {
      type: [String],
      required: false,
    },
    deletionRequest: {
      type: String,
      enum: ["Pending", "Accepted", "Rejected"],
      default: null,
    },
  },
  { timestamps: true }
);

const TourGuide = mongoose.model("TourGuide", tourGuideSchema);
module.exports = TourGuide;
