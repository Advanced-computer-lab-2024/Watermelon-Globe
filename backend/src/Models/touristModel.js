const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const touristSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "Please enter a valid email address"],
    },
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 20,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    mobileNumber: {
      type: String,
      required: true,
      match: [/^\+?[0-9]{10,15}$/, "Please enter a valid mobile number"],
    },
    nationality: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          const today = new Date();
          const birthDate = new Date(value);
          let age = today.getFullYear() - birthDate.getFullYear();
          const monthDiff = today.getMonth() - birthDate.getMonth();

          if (
            monthDiff < 0 ||
            (monthDiff === 0 && today.getDate() < birthDate.getDate())
          ) {
            age--;
          }
          return age >= 18;
        },
        message: "You must be at least 18 years old.",
      },
    },
    status: {
      type: String,
      enum: ["job", "student"],
      required: true,
    },
    wallet: {
      type: Number,
      default: 0,
    },
    points: {
      type: Number,
      default: 0,
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
  
 bookedItineraries: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ChildItinerary',
      },
    ],
    bookedActivities: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ActivityBooking',
      },
    ],
    
  },  
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const Tourist = mongoose.model('Tourist', touristSchema);
module.exports = Tourist
