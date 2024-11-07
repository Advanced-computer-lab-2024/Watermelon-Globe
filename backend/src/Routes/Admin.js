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
    changePasswordAdmin,
    getAllComplaints,
    getComplaint,
    updateComplaint,
    replyComplaint
} = require('../Controller/AdminController')


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

//post a new product 
router.post('/CreateProduct', createProduct);

//delete a product 
router.get('/SearchProductName', searchProductbyName)
router.put('/EditProduct', updateProduct)

//get All Complaints
router.get('/Complaint', getAllComplaints)

//sort single Complaint
router.get('/Complaint/:id', getComplaint)

//update Complaint status
router.put('/Complaint/:id', updateComplaint)

//reply to a Complaint
router.put('/replyComplaint/:id', replyComplaint)


module.exports = router;