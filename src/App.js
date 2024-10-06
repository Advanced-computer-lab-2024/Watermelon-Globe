const express = require("express");
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
require("dotenv").config();
const { createProfile, updateProfile, getProfiles } = require("./Routes/companyProfileController");
const { createActivity, getActivities, getActivityById, updateActivity, deleteActivity, createTags, getTags } = require ("./Routes/activityController");
const CompanyProfile = require('./Models/CompanyProfile');
const MongoURI = process.env.MONGO_URI;


// App variables
const app = express();
const port = process.env.PORT || "8000";
const cors = require('cors');
app.use(cors());

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
app.use(express.json());

app.get("/home", (req, res) => {
    res.status(200).send("You have everything installed!");
});

app.use(express.json())
app.post("/createTags", createTags);
app.get("/getTags", getTags);
app.post("/createProfile", createProfile);
app.put("/updateProfile/:id", updateProfile);
app.get("/profiles/:id?", getProfiles);

app.post('/newActivity', createActivity);
app.get('/activities', getActivities);
app.get('/activities/:id', getActivityById);
app.put('/updateActivity/:id', updateActivity);
app.delete('/deleteActivity', deleteActivity);
