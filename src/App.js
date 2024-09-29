// External variables
const express = require("express");
const mongoose = require('mongoose');
require("dotenv").config();
const guideController = require('./Routes/guideController'); // Import the controller


const {createGov, createSite, getSite, getAllSites, updateSite, deleteSite, getMySites} = 
require('./Routes/governorController');

const MongoURI = process.env.MONGO_URI;

//App variables
const app = express();
const port = process.env.PORT || "8000";

//importing models
const governorModel = require('./Models/tourismGovernor');
const siteModel = require('./Models/tourismSite');

// configurations
// Mongo DB
mongoose.connect(MongoURI)
.then(()=>{
  console.log("MongoDB is now connected!")
// Starting server
 app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  })
})
.catch(err => console.log(err));
app.get("/home", (req, res) => {
    res.status(200).send("You have everything installed!");
  });

app.use(express.json());

//tour guide routes
app.post("/addGuide",guideController.createTourGuide);
app.get("/getGuide", guideController.getTourGuide);
app.put("/updateGuide", guideController.updateTourGuide);
 
//tourism governor/sites routes
app.post("/addGov", createGov);
app.post("/addSite", createSite);
app.get("/getSite/:id", getSite);
app.get("/getAllSites", getAllSites);
app.put("/updateSite/:id", updateSite);
app.delete("/deleteSite/:id", deleteSite);
app.get("/getMySites", getMySites);

//itineraries routes
app.post("/itineraries", guideController.createItinerary); // Create a new itinerary
app.get("/itineraries", guideController.getAllItineraries); // Get all itineraries
app.get("/itineraries/:id", guideController.getItineraryById); // Get a single itinerary by ID
app.patch("/itineraries/:id", guideController.updateItinerary); // Update an itinerary
app.delete("/itineraries/:id", guideController.deleteItineraryById); // Delete an itinerary
app.get("/getMyItineraries", guideController.getMyItineraries); 

app.get("/home", (req, res) => {
    res.status(200).send("Tour Guide and Itinerary API");
});