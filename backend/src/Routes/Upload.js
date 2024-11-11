// routes/uploadRoutes.js
const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const tourGuideUpload = require("../Models/tourGuideModel");
const advertiserUpload = require("../Models/companyProfileModel");
const sellerUpload = require("../Models/sellerModel");

const router = express.Router();

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Saves the file with a unique name
  },
});

const upload = multer({ storage });

// Routes

// General Single File Upload Route
router.post("/upload", upload.single("file"), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    console.log(`${req.file.originalname} has been uploaded successfully.`);
    res.status(200).json({ message: "File upload complete", file: req.file });
});

// Tour Guide Upload Route
router.post(
  "/upload/tourguide/:tourGuideId",
  upload.fields([
    { name: "idProof", maxCount: 1 },
    { name: "certificates", maxCount: 5 },
  ]),
  async (req, res) => {
    try {
        console.log(req.files)
        const files = req.files;
        const tourGuideId = req.params.tourGuideId;
        const tourGuide = await tourGuideUpload.findById(tourGuideId);

        if(!tourGuide){
            return res.status(404).json({ message: "TourGuide not found" });
        }

        if (files.idProof) {
            tourGuide.idProof = files.idProof[0].filename;
        }

        if (files.certificates) {
            tourGuide.certificates = files.certificates.map((file) => file.filename);
        }

        await tourGuide.save();

        res.status(200).json({ message: "Files Uploaded Successfully" });
        } catch (error) {
        console.error("Error uploading files:", error);
        res.status(500).json({ message: "File upload failed", error });
        }
  }
);

// Advertiser Upload Route
router.post(
  "/upload/advertiser/:advertiserId",
  upload.fields([
    { name: "idProof", maxCount: 1 },
    { name: "taxationRegistryCard", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
        const files = req.files;
        const advertiserId = req.params.advertiserId;

        const updateData = {};
        if (files.idProof) {
            updateData.idProof = files.idProof[0].filename;
        }

        if (files.taxationRegistryCard) {
            updateData.taxationRegistryCard = files.taxationRegistryCard[0].filename;
        }

        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({ message: "No files to upload" });
        }

        const advertiser = await advertiserUpload.findByIdAndUpdate(advertiserId, {
            $set: updateData,
        }, { new: true });

        if(!advertiser){
            return res.status(404).json({ message: "Advertiser not found" });
        }

        res.status(200).json({ message: "Files uploaded successfully" });
        } catch (error) {
        console.error("Error uploading files:", error);
        res.status(500).json({ message: "File upload failed", error });
        }
  }
);

// Seller Upload Route
router.post(
    "/upload/seller/:sellerId",
    upload.fields([
        { name: "idProof", maxCount: 1 },
        { name: "taxationRegistryCard", maxCount: 1 },
    ]),
    async (req, res) => {
        try {
            const sellerId = req.params.sellerId;
            const files = req.files;
            const updateData = {};
            if (files.idProof) {
                updateData.idProof = files.idProof[0].filename;
            }

            if (files.taxationRegistryCard) {
                updateData.taxationRegistryCard = files.taxationRegistryCard[0].filename;
            }

            if (Object.keys(updateData).length === 0) {
                return res.status(400).json({ message: "No files to upload" });
            }

            const seller = await sellerUpload.findByIdAndUpdate(sellerId, {
                $set: updateData,
            }, { new: true });

            if(!seller){
                return res.status(404).json({ message: "Seller not found" });
            }

            res.status(200).json({ message: "Files uploaded successfully" });
            } catch (error) {
            console.error("Error uploading files:", error);
            res.status(500).json({ message: "File upload failed", error });
        }
    }
);

// Profile Picture Upload for Advertiser
router.post(
  "/upload/advertiserProfilePicture/:advertiserId",
  upload.single("profilePicture"),
  async (req, res) => {
    try {
      const advertiserId = req.params.advertiserId;
      const advertiser = await advertiserUpload.findById(advertiserId);

      if (!advertiser) {
        return res.status(404).json({ message: "Advertiser not found" });
      }

      // Save profile picture path
      advertiser.profilePicture = req.file ? req.file.filename : null;
      await advertiser.save();

      res.status(200).json({
        message: "Profile picture uploaded successfully",
        profilePicture: advertiser.profilePicture,
      });
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      res.status(500).json({ message: "Profile picture upload failed", error });
    }
  }
);

// Logo Upload for Advertiser
router.post(
    "/upload/advertiserLogo/:advertiserId",
    upload.single("Logo"),
    async (req, res) => {
        try {
            const advertiserId = req.params.advertiserId;
            const advertiser = await advertiserUpload.findById(advertiserId);
    
            if (!advertiser) {
            return res.status(404).json({ message: "Advertiser not found" });
            }
    
            // Save logo path
            advertiser.Logo = req.file ? req.file.filename : null;
            await advertiser.save();
    
            res.status(200).json({
            message: "Logo uploaded successfully",
            Logo: advertiser.Logo,
            });
        } catch (error) {
            console.error("Error uploading logo:", error);
            res.status(500).json({ message: "Logo upload failed", error });
        }
    }
);

//Logo Upload for Seller
router.post(
    "/upload/sellerLogo/:sellerId",
    upload.single("Logo"),
    async (req, res) => {
        try {
            const sellerId = req.params.sellerId;
            const seller = await sellerUpload.findById(sellerId);
    
            if (!seller) {
            return res.status(404).json({ message: "Seller not found" });
            }
    
            // Save logo path
            seller.Logo = req.file ? req.file.filename : null;
            await seller.save();
    
            res.status(200).json({
            message: "Logo uploaded successfully",
            Logo: seller.Logo,
            });
        } catch (error) {
            console.error("Error uploading logo:", error);
            res.status(500).json({ message: "Logo upload failed", error });
        }
    }
);

//Photo upload for tour guide
router.post(
    "/upload/tourGuidePhoto/:tourGuideId",
    upload.single("photo"), // multer middleware for file upload
    async (req, res) => {
      try {
        const tourGuideId = req.params.tourGuideId;
        const tourguide = await tourGuideUpload.findById(tourGuideId);
  
        if (!tourguide) {
          return res.status(404).json({ message: "Tour guide not found" });
        }
  
        // Save the filename to the database (not the full path)
        tourguide.photo = req.file ? req.file.filename : null; // Ensure filename is saved
        await tourguide.save();
  
        res.status(200).json({
          message: "Photo uploaded successfully",
          Photo: tourguide.photo, // Return the filename, e.g., 'profile.jpg'
        });
      } catch (error) {
        console.error("Error uploading photo:", error);
        res.status(500).json({ message: "Photo upload failed", error });
      }
    }
  );
  

module.exports = router;