const mongoose = require('mongoose')

const Schema = mongoose.Schema

const sellerSchema = new Schema({
    Name: {
        type: String,
        required: true
    },
    Email: {
        type: String,   
        required: true
    },
    Description: {
        type: String,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Seller', sellerSchema)