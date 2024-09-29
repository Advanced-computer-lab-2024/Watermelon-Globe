// External variables
const express = require("express");
const mongoose = require('mongoose');
require("dotenv").config();
const guideController = require('./Routes/guideController'); // Import the controller
//Make sure to add your MongoDB URI in the .env file as MONGO_URI="your mongodb uri"
//Check db connection links in README file
const {createTourGuide,getTourGuide,updateTourGuide} = require("./Routes/guideController.js");
const MongoURI = process.env.MONGO_URI;




//App variables
const app = express();
const port = process.env.PORT || "8000";
// #Importing the userController


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
app.post("/addGuide",createTourGuide);
app.get("/getGuide", getTourGuide);
app.put("/updateGuide",updateTourGuide);





// Routes
app.post("/guides", guideController.addGuide); // Create a new tour guide



app.post("/itineraries", guideController.createItinerary); // Create a new itinerary
app.get("/itineraries", guideController.getAllItineraries); // Get all itineraries
app.get("/itineraries/:id", guideController.getItineraryById); // Get a single itinerary by ID
app.patch("/itineraries/:id", guideController.updateItinerary); // Update an itinerary
app.delete("/itineraries/:id", guideController.deleteItineraryById); // Delete an itinerary

app.get("/home", (req, res) => {
    res.status(200).send("Tour Guide and Itinerary API");
});