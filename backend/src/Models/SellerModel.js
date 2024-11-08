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
    },
    idProof: { 
        type: String, 
        required: false 
    },
    taxationRegistryCard: { 
        type: String, 
        required: false 
    },
    Password:{
        type: String,
        required:true
    },
    deletionRequest: {
        type: String,
        enum: ["Pending", "Accepted", "Rejected"],
        default: null,
    },

}, {timestamps: true})


const Seller = mongoose.model('Seller', sellerSchema);
module.exports = Seller