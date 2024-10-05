const express = require('express')
const {
    createAdmin, 
    deleteAdmin
} = require('../Controller/AdminController')

const router = express.Router()

//post a new workout 
router.post('/', createAdmin)

//delete a workout 
router.delete('/:id', deleteAdmin)

module.exports = router
