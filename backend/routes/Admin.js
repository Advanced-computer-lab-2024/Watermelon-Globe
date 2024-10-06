const express = require('express')
const {
    createAdmin, 
    deleteAdmin,
    createGoverner,
    deleteGoverner,
    getAllPreferenceTag,
    getPreferenceTag,
    createPreferenceTag,
    deletePreferenceTag,
    updatePreferenceTag,
    getAllActivityCategory,
    getActivityCategory,
    createActivityCategory,
    deleteActivityCategory,
    updateActivityCategory,
    createProduct,
    getAllProducts,
    searchProductbyName,
    filterProduct,
    updateProduct
} = require('../Controller/AdminController')

const router = express.Router()

//post a new workout 
router.post('/Admin/', createAdmin)

//delete a workout 
router.delete('/Admin/:id', deleteAdmin)

//post a new workout 
router.post('/Governer/', createGoverner)

//delete a workout 
router.delete('/Governer/:id', deleteGoverner)

//Get all workouts
router.get('/PreferenceTag/', getAllPreferenceTag)

//Get single workout
router.get('/PreferenceTag/:id', getPreferenceTag)

//post a new workout 
router.post('/PreferenceTag/', createPreferenceTag)

//delete a workout 
router.delete('/PreferenceTag/:id', deletePreferenceTag)

//update a workout 
router.put('/PreferenceTag/:id', updatePreferenceTag)

//Get all workouts
router.get('/ActivityCategory/', getAllActivityCategory)

//Get single workout
router.get('/ActivityCategory/:id', getActivityCategory)

//post a new workout 
router.post('/ActivityCategory/', createActivityCategory)

//delete a workout 
router.delete('/ActivityCategory/:id', deleteActivityCategory)

//update a workout 
router.put('/ActivityCategory/:id', updateActivityCategory)

//Get all products
router.get('/Products/', getAllProducts)

//Get single product
router.get('/filterProductPrice/', filterProduct)

//post a new product 
router.post('/createProduct/', createProduct);

//delete a product 
router.get('/searchProductName/', searchProductbyName)

//update a product 
router.put('/editProduct/', updateProduct)


module.exports = router
