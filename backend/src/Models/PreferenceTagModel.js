const mongoose = require('mongoose')

const Schema = mongoose.Schema

const PreferenceTagSchema = new Schema({
    tag: {
        type: String,
        required: true
    }
}, {timestamps: true})

const PreferenceTag = mongoose.model('PreferenceTag', PreferenceTagSchema)
module.exports = PreferenceTag