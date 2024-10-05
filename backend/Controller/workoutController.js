const Workout = require('../Models/WorkoutModels')
const mongoose = require('mongoose')

//get all workouts
const getAllWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({createdAt: -1})

    res.status(200).json(workouts)
}

//get single workout
const getWorkout = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'No such workout'})
    }

    const workouts = await Workout.findById(id)

    if (!workouts){
        return res.status(400).json({error: 'No such workout'})
        }
    res.status(200).json(workouts)
}

//create new workout
const createWorkout = async (req, res) => {
    const {title, load, reps} = req.body
    try {
        const workout = await Workout.create({title, load, reps}) 
        res.status(200).json(workout)
    }
    catch (error){
        res.status(400).json({error: error.mssg})
    }
}

//delete a workout 
const deleteWorkout = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'No such workout'})
    }

    const workouts = await Workout.findOneAndDelete({_id: id})

    if (!workouts){
        return res.status(400).json({error: 'No such workout'})
        }
    res.status(200).json(workouts)
}

//uptade a workout
const updateWorkout = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'No such workout'})
    }

    const workouts = await Workout.findOneAndUpdate({_id: id},{
        ...req.body 
    })

    if (!workouts){
        return res.status(400).json({error: 'No such workout'})
        }
    res.status(200).json(workouts)
}

module.exports = {createWorkout , getAllWorkouts , getWorkout , deleteWorkout, updateWorkout}
