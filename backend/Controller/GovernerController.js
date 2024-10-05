const Governer = require('../Models/GovernerModel')
const mongoose = require('mongoose')

//create new workout
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

//delete a workout 
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

module.exports = {createGoverner , deleteGoverner}