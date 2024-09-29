const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the tag schema
const tagSchema = new Schema({
  type: {
    type: String,
    enum: ['Monuments', 'Museums', 'Religious Sites', 'Palaces/Castles'], // Restrict to predefined values
    required: true,
  },
  historicPeriod: {
    type: String,
    enum: [
      'Prehistoric', 'Ancient Egyptian', 'Roman Empire', 'Byzantine Empire', 
      'Islamic Golden Age', 'Renaissance', 'Victorian Era', 'World War II', 
      'Cold War', 'Digital Revolution', 'Space Age'
    ], // Restrict to predefined historical periods
    required: true,
  },
});