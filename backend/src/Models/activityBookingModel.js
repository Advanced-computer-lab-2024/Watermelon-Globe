const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Activity = require('./activityModel');  
const ActivityBookingSchema = new Schema({
  activity: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Activity',
    required: true
  },
  tourist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tourist',
    required: true
  },
  chosenDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending'
  },
  totalPrice: {
    type: Number,
    required: false
  },
  paymentStatus: {
    type: String,
    enum: ['unpaid', 'paid', 'refunded'],
    default: 'unpaid'
  },
  completed: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });
// Pre-save hook to determine if the activity is completed
ActivityBookingSchema.pre('save', async function (next) {
  try {
    // Correct reference to the Activity model
    const activity = await Activity.findById(this.activity);  // Should correctly reference the model
    if (!activity) {
      throw new Error('Activity not found');
    }
    // Set 'completed' if the chosen date is past and the booking is confirmed
    const currentDate = new Date();
    if (this.status === 'confirmed' && this.chosenDate < currentDate) {
      this.completed = true;
    }

    // Set 'totalPrice' to the price of the booked activity
    this.totalPrice = activity.Price;

    next();
  } catch (error) {
    next(error);
  }
});
const ActivityBooking = mongoose.model('ActivityBooking', ActivityBookingSchema);
module.exports = ActivityBooking;
