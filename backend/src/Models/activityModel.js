const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ActivitySchema = new Schema({
  Name: {
    type: String,
    required: true
  },
  Date: {
    type: Date,
    required: true
  },
  Time: {
    type: String,
    required: true
  },
  Location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  Price: {
    type: Number,
    required: true
  },
  priceRange: {
    type: [Number],
    required: false
  },
  Category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ActivityCategory',
    required: false
  },
  tags: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PreferenceTag'
  }],
  Discount: {
    type: Number,
    required: true
  },
  bookingOpen: {
    type: Boolean,
    default: true
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
  Advertiser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CompanyProfile',
    required: false
  },
  comments: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tourist', // Reference to the user model
      required: false
    },
    comment: {
      type: String,
      required: false
    },
    date: {
      type: Date,
      default: Date.now
    }
  }]
  ,
  inappropriate: {
    type: Boolean,
    default: false }

}, { timestamps: true });

ActivitySchema.index({ Location: '2dsphere' });

const Activity = mongoose.model('Activity', ActivitySchema);
module.exports = Activity;
