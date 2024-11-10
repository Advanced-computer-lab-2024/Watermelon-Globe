const mongoose = require('mongoose')

const Schema = mongoose.Schema

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seller',
        required: true
    },

    sales: {
        type: Number,
        required: true
    },
    archived: {
        type: Boolean,
        required: true
    },

    picture: {
    type: String, // URL or file path for the product image
    required: true
    },

    rating: { type: Number, required: false },
    noOfRatings: {type:Number ,required:false},
    ratingsSum:{type:Number,required:false},

    reviews: [
        {
            reviewer: {     
            type: mongoose.Schema.Types.ObjectId,
             ref: 'Tourist', // Reference to the Buyer model (assuming there's a Buyer model)
            required: false},
            
            review: { type: String,required:false }, // Review content
            
        }
    ]
}, {timestamps: true})

const Product = mongoose.model('Product', productSchema)
module.exports = Product