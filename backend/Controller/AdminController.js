const Admin = require('../Models/AdminModel')
const Governer = require('../Models/GovernerModel')
const PreferenceTag = require('../Models/PreferenceTagModel')
const ActivityCategory = require('../Models/ActivityCategoryModel')
const mongoose = require('mongoose')

//create new Admin
const createAdmin = async (req, res) => {
    const {username, password} = req.body
    try {
        const admin = await Admin.create({username, password}) 
        res.status(200).json(admin)
    }
    catch (error){
        res.status(400).json({error: error.mssg})
    }
}

//delete a Admin 
const deleteAdmin = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'No such user'})
    }

    const admin = await Admin.findOneAndDelete({_id: id})

    if (!admin){
        return res.status(400).json({error: 'No such user'})
        }
    res.status(200).json(admin)
}

//create new Governer
const createGoverner = async (req, res) => {
    const {username, password} = req.body
    try {
        const governer = await Governer.create({username, password}) 
        res.status(200).json(governer)
    }
    catch (error){
        res.status(400).json({error: error.mssg})
    }
}

//delete a Governer 
const deleteGoverner = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'No such user'})
    }

    const governer = await Governer.findOneAndDelete({_id: id})

    if (!governer){
        return res.status(400).json({error: 'No such user'})
        }
    res.status(200).json(governer)
}

//get all PreferenceTag
const getAllPreferenceTag = async (req, res) => {
    const preferencetag = await PreferenceTag.find({}).sort({createdAt: -1})

    res.status(200).json(preferencetag)
}

//get single preferencetag
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

//create new preferencetag
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

//delete a preferencetag 
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

//uptade a preferencetag
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

//get all activitycategory
const getAllActivityCategory = async (req, res) => {
    const activitycategory = await ActivityCategory.find({}).sort({createdAt: -1})

    res.status(200).json(activitycategory)
}

//get single activitycategory
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

//create new activitycategory
const createActivityCategory = async (req, res) => {
    const {activity} = req.body

    let emptyFields = []
        if (!activity) {
            emptyFields.push('activity')
        }
        if (emptyFields.length > 0) {
            return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
        }

        const existingCategory = await ActivityCategory.findOne({ activity });
        if (existingCategory) {
            return res.status(400).json({ error: 'This category already exists' });
        }

    
    try {
        const activitycategory = await ActivityCategory.create({activity}) 
        res.status(200).json(activitycategory)
    }
    catch (error){
        res.status(400).json({error: error.mssg})
    }
}

//delete a activitycategory 
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

//uptade a activitycategory
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

module.exports = {createAdmin , deleteAdmin, createGoverner, deleteGoverner,
     getAllPreferenceTag, getPreferenceTag, createPreferenceTag, deletePreferenceTag, updatePreferenceTag,
     getAllActivityCategory, getActivityCategory, createActivityCategory, deleteActivityCategory
     , updateActivityCategory}