const PreferenceTag = require('../Models/PreferenceTagModel')
const mongoose = require('mongoose')

//get all workouts
const getAllPreferenceTag = async (req, res) => {
    const preferencetag = await PreferenceTag.find({}).sort({createdAt: -1})

    res.status(200).json(preferencetag)
}

//get single workout
const getPreferenceTag = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'No such tag'})
    }

    const preferencetag = await PreferenceTag.findById(id)

    if (!preferencetag){
        return res.status(400).json({error: 'No such tag'})
        }
    res.status(200).json(preferencetag)
}

//create new workout
const createPreferenceTag = async (req, res) => {
    const {tag} = req.body
    try {
        const preferencetag = await PreferenceTag.create({tag}) 
        res.status(200).json(preferencetag)
    }
    catch (error){
        res.status(400).json({error: error.mssg})
    }
}

//delete a workout 
const deletePreferenceTag = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'No such tag'})
    }

    const preferencetag = await PreferenceTag.findOneAndDelete({_id: id})

    if (!preferencetag){
        return res.status(400).json({error: 'No such tag'})
        }
    res.status(200).json(preferencetag)
}

//uptade a workout
const updatePreferenceTag = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'No such tag'})
    }

    const preferencetag = await PreferenceTag.findOneAndUpdate({_id: id},{
        ...req.body 
    })

    if (!preferencetag){
        return res.status(400).json({error: 'No such tag'})
        }
    res.status(200).json(preferencetag)
}

module.exports = {getAllPreferenceTag , getPreferenceTag , createPreferenceTag
     , deletePreferenceTag, updatePreferenceTag}