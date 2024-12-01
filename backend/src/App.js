const express = require("express");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
require("dotenv").config();
const uploadRoute = require("./Routes/Upload");

//Routes
//const Admin = require('./Routes/admin');
const admin = require("./Routes/Admin");
const Advertiser = require("./Routes/advertiser");
const Activity = require("./Routes/Activities");
const Filter = require("./Routes/filter");
const Governor = require("./Routes/governor");
const Guest = require("./Routes/guest");
const Itinerary = require("./Routes/itinerary");
const Seller = require("./Routes/Seller");
const Sort = require("./Routes/sort");
const TourGuide = require("./Routes/tourGuide");
const Tourist = require("./Routes/tourist");
const TouristItinerary = require("./Routes/touristItinerary");

// App variables
const app = express();
const stripe = require('stripe')(process.env.SECRET_KEY); // Replace with your Stripe secret key
const MongoURI = process.env.MONGO_URI;
const cors = require("cors");
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

//uploads
app.use("/uploads", express.static("uploads"));
app.use("/api", uploadRoute);
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
