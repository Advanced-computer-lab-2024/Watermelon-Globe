const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ActivityCategorySchema = new Schema({
    activity: {
        type: String,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('ActivityCategory', ActivityCategorySchema)