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
        ref: "Product",
      },
    ],
  
    bookedItineraries: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ChildItinerary",
      },
    ],
    bookedActivities: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ActivityBooking",
      },
    ],
    loyaltyPoints: { type: Number, default: 0},
    loyaltyLevel: { type: Number, enum: [1,2,3], default: 1 },
    badge: { type: String, enum: ["Bronze","Silver","Gold"], default: 'Bronze' },

    cart: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],

    addresses: [
      {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zip: { type: String, required: true },
        country: { type: String, required: true },
        isSelected: {
          type: Boolean,
          default: false,  // Default to false, indicating no address is selected by default
        },
      }
    ],

    orders: [
      {
        items: [
          {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
            quantity: { type: Number, required: true },
          },
        ],
        totalPrice: { type: Number, required: true },
        status: { type: String, enum: ['Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'], default: 'Pending' },
        orderDate: { type: Date, default: Date.now },
        deliveryDate: { type: Date },
        cancellationReason: { type: String },
      },
    ],
    
    notifications: [
      {
        message: { type: String, required: false },
        date: { type: Date, default: Date.now },
        read: { type: Boolean, default: false }
      }
    ],


    bookmarkedItineraries: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Itinerary', 
        default: [],
      },
    ],
    bookmarkedActivities: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Activity', 
        default: [],
      },
    ],
 
  },  
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const Tourist = mongoose.model("Tourist", touristSchema);
module.exports = Tourist;
