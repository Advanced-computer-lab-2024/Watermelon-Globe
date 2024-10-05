const express = require('express')
const {
    getAllPreferenceTag, 
    getPreferenceTag, 
    createPreferenceTag,
    deletePreferenceTag,
    updatePreferenceTag
} = require('../Controller/AdminController')

const router = express.Router()

//Get all workouts
router.get('/', getAllPreferenceTag)

//Get single workout
router.get('/:id', getPreferenceTag)

//post a new workout 
router.post('/', createPreferenceTag)

//delete a workout 
router.delete('/:id', deletePreferenceTag)

//update a workout 
router.put('/:id', updatePreferenceTag)


module.exports = router