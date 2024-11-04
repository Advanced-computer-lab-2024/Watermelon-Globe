const express = require('express');
const router = express.Router();

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
<<<<<<< HEAD
} = require('../Controller/adminController')
=======
    sortProducts,
    changePasswordAdmin
} = require('../Controller/AdminController')
>>>>>>> Sprint1



router.get('/GetAllAdmin', getAllAdmin)
router.post('/CreateAdmin', createAdmin)
router.delete('/DeleteAdmin/:id', deleteAdmin)
router.get('/GetAllGoverner', getAllGoverner)
router.post('/CreateGoverner', createGoverner)
router.delete('/DeleteGoverner/:id', deleteGoverner)
router.get('/GetAllPreferenceTag', getAllPreferenceTag)
router.get('/GetPreferenceTag/:id', getPreferenceTag)
router.post('/CreatePreferenceTag', createPreferenceTag)
router.delete('/DeletePreferenceTag/:id', deletePreferenceTag)
router.put('/UpdatePreferenceTag/:id', updatePreferenceTag)
router.get('/GetAllActivityCategory/', getAllActivityCategory)
router.get('/GetActivityCategory/:id', getActivityCategory)
router.post('/CreateActivityCategory', createActivityCategory)
router.delete('/DeleteActivityCategory/:id', deleteActivityCategory)
router.put('/UpdateActivityCategory/:id', updateActivityCategory)
router.get('/GetAllProducts', getAllProducts)
router.post('/CreateProduct', createProduct); 
router.get('/SearchProductName', searchProductbyName)
router.put('/EditProduct', updateProduct)


<<<<<<< HEAD
module.exports = router;
=======
//post a new workout 
router.get('/Governer/', getAllGoverner)

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
router.get('/products/', getAllProducts)

//Get single product
router.get('/filterProductPrice/:price', filterProduct)

//post a new product 
router.post('/createProduct/', createProduct);

//delete a product 
router.get('/searchProductName/', searchProductbyName)

//update a product 
router.put('/editProduct/', updateProduct)

//sort Products according to Ratings
router.get('/sortProducts', sortProducts)

router.put('/changePasswordAdmin/:id',changePasswordAdmin)

module.exports = router
>>>>>>> Sprint1
