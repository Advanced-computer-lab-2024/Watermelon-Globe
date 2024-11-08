const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");
const multer = require("multer");
const path = require("path");
mongoose.set("strictQuery", false);
require("dotenv").config();

// if (typeof Busboy === 'function') {
//   console.log("Busboy is a function and should work as expected.");
// } else {
//   console.log("Busboy is not recognized as a constructor.");
// }

//Routes
//const Admin = require('./Routes/admin');
const admin = require("./Routes/Admin");
const Advertiser = require("./Routes/advertiser");
const Activity = require("./Routes/Activities");
const Filter = require("./Routes/filter");
const Governor = require("./Routes/governor");
const Guest = require("./Routes/guest");
const Itinerary = require("./Routes/itinerary");
const Seller = require("./Routes/seller");
const Sort = require("./Routes/sort");
const TourGuide = require("./Routes/tourGuide");
const Tourist = require("./Routes/tourist");
const TouristItinerary = require("./Routes/touristItinerary");

//imports for upload
const tourGuideUpload = require("./Models/tourGuideModel");
const advertiserUpload = require("./Models/companyProfileModel");
// const sellerUpload = require('./Models/SellerModel');

// App variables
const app = express();
const MongoURI = process.env.MONGO_URI;
const cors = require("cors");
const CompanyProfile = require("./Models/companyProfileModel");
const port = "8000";
app.use(cors());

// Mongo DB
mongoose
  .connect(MongoURI)
  .then(() => {
    console.log("MongoDB is now connected!");
    // Starting server
    app.listen(port, () => {
      console.log(`Listening to requests on http://localhost:${port}`);
    });
  })
  .catch((err) => console.log(err));

// Configurations

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

//file directory
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, "${Date.now()}-${file.originalname}"); // Saves the file with its original name
  },
});
const upload = multer({ storage });

app.post(
  "/upload/tourguide/:tourGuideId",
  upload.fields([
    { name: "idProof", maxCount: 1 },
    { name: "certificates", maxCount: 5 },
  ]),
  async (req, res) => {
    try {
      const files = req.files;
      const tourGuideId = req.params.tourGuideId;

      console.log(files.certificates);

      await tourGuideUpload.findByIdAndUpdate(tourGuideId, {
        idProof: files.idProof ? files.idProof[0].path : null,
        certificates: files.certificates
          ? files.certificates.map((file) => file.path)
          : [],
      });

      res.status(200).json({ message: "Files Uploaded Successfully" });
    } catch (error) {
      console.error("Error uploading files:", error);
      res.status(500).json({ message: "File upload failed", error });
    }
  }
);

app.post(
  "/upload/advertiser",
  upload.fields([
    { name: "idProof", maxCount: 1 },
    { name: "taxationRegistryCard", maxCount: 1 },
  ]),
  async (req, res) => {
    const files = req.files;
    const advertiserId = req.body.userId;

    await advertiserUpload.findByIdAndUpdate(advertiserId, {
      idProof: files.idProof ? files.idProof[0].path : null,
      taxationRegistryCard: files.taxationRegistryCard
        ? files.taxationRegistryCard[0].path
        : null,
    });
    res.status(200).json({ message: "Files uploaded successfully" });
  }
);

app.post(
  "/upload/seller",
  upload.fields([
    { name: "idProof", maxCount: 1 },
    { name: "taxationRegistryCard", maxCount: 1 },
  ]),
  async (req, res) => {
    const files = req.files;
    const sellerId = req.body.userId;

    await sellerUpload.findByIdAndUpdate(sellerId, {
      idProof: files.idProof ? files.idProof[0].path : null,
      taxationRegistryCard: files.taxationRegistryCard
        ? files.taxationRegistryCard[0].path
        : null,
    });
    res.status(200).json({ message: "Files uploaded successfully" });
  }
);

// File upload endpoint
app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  console.log(`${req.file.originalname} has been uploaded successfully.`);
  res.status(200).json({ message: "File upload complete", file: req.file });
});

//APIs
app.use("/api/Admin", admin);
app.use("/api/Advertiser", Advertiser);
app.use("/api/Activities", Activity);
app.use("/api/Filter", Filter);
app.use("/api/Governor", Governor);
app.use("/api/Guest", Guest);
app.use("/api/Itinerary", Itinerary);
app.use("/api/Seller", Seller);
app.use("/api/Sort", Sort);
app.use("/api/TourGuide", TourGuide);
app.use("/api/Tourist", Tourist);
app.use("/api/TouristItinerary", TouristItinerary);

//tags
// app.post("/createTags", createTags);
// app.get("/getTags", getTags);

//tags
// app.get("/filterByTags/:id",filterByTags);
// app.get("/getTags",getTags);
// app.post("/createTags",createTags);

app.get("/home", (req, res) => {
  res.status(200).send("Tour Guide and Itinerary API");
});
