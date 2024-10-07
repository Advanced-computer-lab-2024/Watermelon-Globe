const express = require("express");
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
require('dotenv').config();
const { createProfile, updateProfile, getProfiles } = require("./Controller/companyProfileController");
const { createActivity, getActivities, getActivityById, updateActivity, deleteActivity } = require ("./Controller/activityController");
const { createTags, getTags } = require ("./Controller/activityController");
const CompanyProfile = require('./Models/CompanyProfile');
const MongoURI = process.env.MONGO_URI;
const cors = require('cors');
const Admin = require('./Routes/Admin')
const Seller = require('./Routes/Seller')


// App variables
const app = express();
const port =  "8000";
app.use(cors());

// Mongo DB
mongoose.connect("mongodb+srv://malakabdelaziz1556:malak@mernapp.yye1c.mongodb.net/")
mongoose.connect(MongoURI)
.then(() => {
  console.log("MongoDB is now connected!");
  // Starting server
  app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  });
})
.catch(err => console.log(err));
const guideController = require('./Controller/guideController');
const touristItineraryController = require('./Controller/touristItineraryController')


const { createGov, createSite, getSite, getAllSites, updateSite, deleteSite, getMySites } =
  require('./Controller/governorController');

// Configurations

app.use(express.json())

//admin
app.use('/api/Admin', Admin)
app.use('/api/Seller', Seller)

app.post("/createProfile", createProfile);
app.put("/updateProfile/:id", updateProfile);
app.get("/profiles/:id?", getProfiles);

app.post("/createTags", createTags);
app.get("/getTags", getTags);

app.post('/newActivity', createActivity);
app.get('/activities', getActivities);
app.get('/activities/:id', getActivityById);
app.put('/updateActivity/:id', updateActivity);
app.delete('/deleteActivity/:id', deleteActivity);

//tour guide routes
app.post("/addGuide", guideController.createTourGuide);
app.get("/getGuide", guideController.getTourGuide);
app.put("/updateGuide/:id", guideController.updateTourGuide);

//tourism governor/sites routes
// app.post("/addGov", createGov);
app.post("/addSite", createSite);
app.get("/getSite/:id", getSite);
app.get("/getAllSites", getAllSites);
app.put("/updateSite/:id", updateSite);
app.delete("/deleteSite/:id", deleteSite);
app.get("/getMySites", getMySites);

// //itineraries routes
app.post("/createItinerary", guideController.createItinerary); // Create a new itinerary
app.get("/getAllItineraries", guideController.getAllItineraries); // Get all itineraries
app.get("/getItinerary/:id", guideController.getItineraryById); // Get a single itinerary by ID
app.put("/updateItinerary/:id", guideController.updateItinerary); // Update an itinerary
app.delete("/deleteItinerary/:id", guideController.deleteItineraryById); // Delete an itinerary
app.get("/getMyItineraries", guideController.getMyItineraries);

//childItineraries
app.post('/createChildItinerary', touristItineraryController.createChildItinerary);

// Route to get a specific child itinerary by ID
app.get('/getChildItinerary/:id', touristItineraryController.getChildItineraryById);

// Route to get all child itineraries
app.get('/getAllChildIitineraries', touristItineraryController.getAllChildItineraries);

// Route to update a child itinerary by ID
app.put('/updateChildItinerary/:id', touristItineraryController.updateChildItineraryById);

// Route to delete a child itinerary by ID
app.delete('/deleteChildItinerary/:id', touristItineraryController.deleteChildItineraryById);

app.get("/home", (req, res) => {
  res.status(200).send("Tour Guide and Itinerary API");
});
