const ActivityCategory = require('../Models/ActivityCategoryModel')
const mongoose = require('mongoose')

//get all workouts
const getAllActivityCategory = async (req, res) => {
    const activitycategory = await ActivityCategory.find({}).sort({createdAt: -1})

    res.status(200).json(activitycategory)
}

//get single workout
const getActivityCategory = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'No such activity'})
    }

    const activitycategory = await ActivityCategory.findById(id)

    if (!activitycategory){
        return res.status(400).json({error: 'No such activity'})
        }
    res.status(200).json(activitycategory)
}

//create new workout
const createActivityCategory = async (req, res) => {
    const {activity} = req.body
    try {
        const activitycategory = await ActivityCategory.create({activity}) 
        res.status(200).json(activitycategory)
    }
    catch (error){
        res.status(400).json({error: error.mssg})
    }
}

//delete a workout 
const deleteActivityCategory = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'No such activity'})
    }

    const activitycategory = await ActivityCategory.findOneAndDelete({_id: id})

    if (!activitycategory){
        return res.status(400).json({error: 'No such activity'})
        }
    res.status(200).json(activitycategory)
}

//uptade a workout
const updateActivityCategory = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'No such activity'})
    }

    const activitycategory = await ActivityCategory.findOneAndUpdate({_id: id},{
        ...req.body 
    })

    if (!activitycategory){
        return res.status(400).json({error: 'No such activity'})
        }
    res.status(200).json(activitycategory)
}

module.exports = {getAllActivityCategory , getActivityCategory , createActivityCategory
     , deleteActivityCategory, updateActivityCategory}