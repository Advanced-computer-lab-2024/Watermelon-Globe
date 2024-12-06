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
        ref: "Itinerary", // References the Itinerary model
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
    photo: {
      type: String, 
      required: false,
    },
    deletionRequest: {
      type: String,
      enum: ["Pending", "Accepted", "Rejected"],
      default: null,
    },
    ratings: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'Tourist', required: true },
        rating: { type: Number, required: true, min: 1, max: 5 }
      }
    ],
    rating: { type: Number, default: 0 },
    noOfRatings: {type:Number ,required:false},
    ratingsSum:{type:Number,required:false},// Reference to the tour guide
    comments: [{
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tourist', // Reference to the user model
        required: true
      },
      comment: {
        type: String,
        required: true
      },
      date: {
        type: Date,
        default: Date.now
      }
    }],
    notifications :[{
      type:String,
      required: false}
    ]

  },
  { timestamps: true }

);


const TourGuide = mongoose.model("TourGuide", tourGuideSchema);
module.exports = TourGuide;
