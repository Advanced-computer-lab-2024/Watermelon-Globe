const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//added termsAndCondtions + status attribute
const advertiserSchema = new Schema(
  {
    Username: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
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

const Advertiser = mongoose.models.Advertiser || mongoose.model('Advertiser', advertiserSchema);
module.exports = Advertiser;
