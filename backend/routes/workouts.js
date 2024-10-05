const express = require('express')
const {
    createWorkout, 
    getAllWorkouts, 
    getWorkout,
    deleteWorkout,
    updateWorkout
} = require('../Controller/workoutController')

const router = express.Router()

//Get all workouts
router.get('/', getAllWorkouts)

//Get single workout
router.get('/:id', getWorkout)

//post a new workout 
router.post('/', createWorkout)

//delete a workout 
router.delete('/:id', deleteWorkout)

//update a workout 
router.put('/:id', updateWorkout)


module.exports = router

