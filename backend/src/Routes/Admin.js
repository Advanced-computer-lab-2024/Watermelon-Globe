const express = require('express')
const {
    getAllAdmin,
    createAdmin, 
    deleteAdmin,
    getAllGoverner,
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
    updateProduct,
} = require('../Controller/adminController')

const router = express.Router()

//post a new workout 
router.get('/GetAllAdmin', getAllAdmin)

//post a new workout 
router.post('/CreateAdmin', createAdmin)

//delete a workout 
router.delete('/DeleteAdmin/:id', deleteAdmin)

//post a new workout 
router.get('/GetAllGoverner', getAllGoverner)

//post a new workout 
router.post('/CreateGoverner', createGoverner)

//delete a workout 
router.delete('/DeleteGoverner/:id', deleteGoverner)

//Get all workouts
router.get('/GetAllPreferenceTag', getAllPreferenceTag)

//Get single workout
router.get('/GetPreferenceTag/:id', getPreferenceTag)

//post a new workout 
router.post('/CreatePreferenceTag', createPreferenceTag)

//delete a workout 
router.delete('/DeletePreferenceTag/:id', deletePreferenceTag)

//update a workout 
router.put('/UpdatePreferenceTag/:id', updatePreferenceTag)

//Get all workouts
router.get('/GetAllActivityCategory/', getAllActivityCategory)

//Get single workout
router.get('/GetActivityCategory/:id', getActivityCategory)

//post a new workout 
router.post('/CreateActivityCategory', createActivityCategory)

//delete a workout 
router.delete('/DeleteActivityCategory/:id', deleteActivityCategory)

//update a workout 
router.put('/UpdateActivityCategory/:id', updateActivityCategory)

//Get all products
router.get('/GetAllProducts', getAllProducts)

//post a new product 
router.post('/CreateProduct', createProduct);

//delete a product 
router.get('/SearchProductName', searchProductbyName)

//update a product 
router.put('/EditProduct', updateProduct)


module.exports = router;