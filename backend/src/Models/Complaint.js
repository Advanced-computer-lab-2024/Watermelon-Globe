const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ComplaintSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['pending', 'resolved'],
    default: 'pending',
    required: true
  },
  reply: {
    type: String,
    default: "" 
  }
}, { timestamps: true });

const Complaint = mongoose.model('Complaint', ComplaintSchema);
module.exports = Complaint;
