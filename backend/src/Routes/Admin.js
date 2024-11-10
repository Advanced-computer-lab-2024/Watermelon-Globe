const express = require("express");
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
    replyComplaint,
    deleteTourist,
    deleteGuide,
    deleteCompany,
    deleteSeller,
    acceptAdvertiser,
    acceptSeller,
    acceptTourGuide,
    rejectAdvertiser,
    rejectSeller,
    rejectTourGuide,
    // sortComplaintsByDate,
    // filterComplaintsByStatus,
    // getUploadedDocuments,
    getPassword
} = require('../Controller/AdminController')

router.get("/GetAllAdmin", getAllAdmin);
router.post("/CreateAdmin", createAdmin);
router.delete("/DeleteAdmin/:id", deleteAdmin);
router.put("/changePasswordAdmin/:id", changePasswordAdmin),
router.get("/GetAllGoverner", getAllGoverner);
router.post("/CreateGoverner", createGoverner);
router.delete("/DeleteGoverner/:id", deleteGoverner);
router.get("/GetAllPreferenceTag", getAllPreferenceTag);
router.get("/GetPreferenceTag/:id", getPreferenceTag);
router.post("/CreatePreferenceTag", createPreferenceTag);
router.delete("/DeletePreferenceTag/:id", deletePreferenceTag);
router.put("/UpdatePreferenceTag/:id", updatePreferenceTag);
router.get("/GetAllActivityCategory/", getAllActivityCategory);
router.get("/GetActivityCategory/:id", getActivityCategory);
router.post("/CreateActivityCategory", createActivityCategory);
router.delete("/DeleteActivityCategory/:id", deleteActivityCategory);
router.put("/UpdateActivityCategory/:id", updateActivityCategory);
router.get("/GetAllProducts", getAllProducts);
router.get("/getPassword",getPassword);

//post a new product
router.post("/CreateProduct", createProduct);

//delete a product
router.get("/SearchProductName", searchProductbyName);
router.put("/EditProduct", updateProduct);

//get All Complaints
router.get("/Complaint", getAllComplaints);

//sort single Complaint
router.get("/Complaint/:id", getComplaint);

//update Complaint status
router.put("/Complaint/:id", updateComplaint);

//reply to a Complaint
router.put("/replyComplaint/:id", replyComplaint);

router.delete('/deleteTourist/:id', deleteTourist);
router.delete('/deleteGuide/:id', deleteGuide);
router.delete('/deleteCompany/:id', deleteCompany);
router.delete('/deleteSeller/:id', deleteSeller);


// accept or reject user
router.put("/acceptAdvertiser/:id", acceptAdvertiser);
router.put("/acceptSeller/:id", acceptSeller);
router.put("/acceptTourGuide/:id", acceptTourGuide);

router.put("/rejectAdvertiser/:id", rejectAdvertiser);
router.put("/rejectSeller/:id", rejectSeller);
router.put("/rejectTourGuide/:id", rejectTourGuide);
module.exports = router;
