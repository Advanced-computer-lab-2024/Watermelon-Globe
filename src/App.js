// External variables
const express = require("express");
const mongoose = require('mongoose');
require("dotenv").config();
//Make sure to add your MongoDB URI in the .env file as MONGO_URI="your mongodb uri"
//Check db connection links in README file
const {createTourGuide,getTourGuide,updateTourGuide} = require("./Routes/guideController.js");
const {createGov, createSite, readSite, updateSite, deleteSite} = require('./Routes/governorController');
const MongoURI = process.env.MONGO_URI;




//App variables
const app = express();
const port = process.env.PORT || "8000";

const governorModel = require('./Models/tourismGovernor');
const siteModel = require('./Models/tourismSite');
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

app.post("/addGov", createGov);
app.post("/addSite", createSite);
app.get("/getSites", readSite);
app.put("/updateSite/:id", updateSite);
app.delete("/deleteSite/:id", deleteSite);

