const express = require('express')
const {
    createGoverner, 
    deleteGoverner
} = require('../Controller/AdminController')

const router = express.Router()

//post a new workout 
router.post('/', createGoverner)

//delete a workout 
router.delete('/:id', deleteGoverner)

module.exports = router