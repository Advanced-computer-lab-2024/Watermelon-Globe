const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tagSchema = new Schema({
  type: {
    type: String,
    enum: ['Monuments', 'Museums', 'Religious Sites', 'Palaces/Castles'], 
    required: true,
  },
  historicPeriod: {
    type: String,
    enum: [
      'Prehistoric', 'Ancient Egyptian', 'Roman Empire', 'Byzantine Empire', 
      'Islamic Golden Age', 'Renaissance', 'Victorian Era', 'World War II', 
      'Cold War', 'Digital Revolution', 'Space Age'
    ],
    required: true,
  },
}); 

const tag = mongoose.model('tag', tagSchema);
module.exports = tag;