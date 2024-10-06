const mongoose = require('mongoose')

const Schema = mongoose.Schema

const PreferenceTagSchema = new Schema({
    tag: {
        type: String,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('PreferenceTag', PreferenceTagSchema)