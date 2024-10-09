const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ActivityCategorySchema = new Schema({
    activity: {
        type: String,
        required: true
    }
}, {timestamps: true})


const ActivityCategory = mongoose.model('ActivityCategory', ActivityCategorySchema)
module.exports = ActivityCategory