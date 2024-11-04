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
    changePasswordAdmin
} = require('../Controller/adminController')



router.get('/GetAllAdmin', getAllAdmin)
router.post('/CreateAdmin', createAdmin)
router.delete('/DeleteAdmin/:id', deleteAdmin)
router.put('/changePasswordAdmin/:id',changePasswordAdmin),
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


module.exports = router;