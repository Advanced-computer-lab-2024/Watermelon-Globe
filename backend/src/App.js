const express = require("express");
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
require("dotenv").config();
const { createProfile, updateProfile, getProfiles } = require("./Routes/companyProfileController");
const { createActivity, getActivities, getActivityById, updateActivity, deleteActivity, createTags, getTags } = require ("./Routes/activityController");
const guideController = require('./Routes/guideController'); // Import the controller
const touristItineraryController = require('./Routes/touristItineraryController')
const { createGov, createSite, getSite, getAllSites, updateSite, deleteSite, getMySites } =
  require('./Routes/governorController');
const CompanyProfile = require('./Models/CompanyProfile');
const MongoURI = process.env.MONGO_URI;


// App variables
const app = express();
const port = process.env.PORT || "8000";

// Mongo DB
mongoose.connect(MongoURI)
.then(() => {
  console.log("MongoDB is now connected!");
  // Starting server
  app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  });
})
.catch(err => console.log(err));

// Configurations

app.use(express.json())

app.use((req,res,next) =>{
  console.log(req.method, req.path)
  next()
})

//tags
// app.post("/createTags", createTags);
// app.get("/getTags", getTags);

//profile 
app.post("/createProfile", createProfile);
app.put("/updateProfile/:id", updateProfile);
app.get("/profiles/:id?", getProfiles);

//activities
app.post('/newActivity', createActivity);
app.get('/activities', getActivities);
app.get('/activities/:id', getActivityById);
app.put('/updateActivity/:id', updateActivity);
app.delete('/deleteActivity', deleteActivity);


//tour guide routes
app.post("/addGuide", guideController.createTourGuide);
app.post("/getGuide", guideController.getTourGuide);
app.put("/updateGuide/:id", guideController.updateTourGuide);

//tourism governor/sites routes
app.post("/addGov", createGov);
app.post("/addSite", createSite);
app.get("/getSite/:id", getSite);
app.get("/getAllSites", getAllSites);
app.put("/updateSite/:id", updateSite);
app.delete("/deleteSite/:id", deleteSite);
app.get("/getMySites", getMySites);

//itineraries routes
app.post("/createItinerary", guideController.createItinerary); // Create a new itinerary
app.get("/getAllItineraries", guideController.getAllItineraries); // Get all itineraries
app.get("/getItinerary/:id", guideController.getItineraryById); // Get a single itinerary by ID
app.put("/updateItinerary/:id", guideController.updateItinerary); // Update an itinerary
app.delete("/deleteItinerary/:id", guideController.deleteItineraryById); // Delete an itinerary
app.get("/getMyItineraries", guideController.getMyItineraries);

//childItineraries
app.post('/createChildItinerary', touristItineraryController.createChildItinerary);
app.get('/getChildItinerary/:id', touristItineraryController.getChildItineraryById);
app.get('/getAllChildIitineraries', touristItineraryController.getAllChildItineraries);
app.put('/updateChildItinerary/:id', touristItineraryController.updateChildItineraryById);
app.delete('/deleteChildItinerary/:id', touristItineraryController.deleteChildItineraryById);

app.get("/home", (req, res) => {
  res.status(200).send("Tour Guide and Itinerary API");
});
