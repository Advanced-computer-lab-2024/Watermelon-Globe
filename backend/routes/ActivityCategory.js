const express = require('express')
const {
    getAllActivityCategory, 
    getActivityCategory, 
    createActivityCategory,
    deleteActivityCategory,
    updateActivityCategory
} = require('../Controller/AdminController')

const router = express.Router()

//Get all workouts
router.get('/', getAllActivityCategory)

//Get single workout
router.get('/:id', getActivityCategory)

//post a new workout 
router.post('/', createActivityCategory)

//delete a workout 
router.delete('/:id', deleteActivityCategory)

//update a workout 
router.put('/:id', updateActivityCategory)


module.exports = router