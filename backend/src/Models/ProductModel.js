const mongoose = require('mongoose')

const Schema = mongoose.Schema

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: mongoose.Schema.Types.Decimal128,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    // picture: {
    //     type: String, // URL or file path for the product image
    //     required: true
    // },
    description: {
        type: String, // Product description
        required: true
    },
    seller: {
        type: String, // Seller name or ID
        required: true
    },
    ratings: {
        type: Number, // Average product rating
        min: 0,
        max: 5,
        default: 0
    },
    // reviews: [
    //     {
    //         reviewer: { type: String }, // Name or ID of the reviewer
    //         review: { type: String }, // Review content
    //         rating: {
    //             type: Number, // Rating given by the reviewer
    //             min: 0,
    //             max: 5
    //         }
    //     }
    // ]
}, {timestamps: true})

module.exports = mongoose.model('Product', productSchema)