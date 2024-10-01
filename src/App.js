const express = require("express");
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
require("dotenv").config();
const { createProfile } = require("./Routes/companyProfileController");
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
app.use(express.json());

app.get("/home", (req, res) => {
    res.status(200).send("You have everything installed!");
});

app.use(express.json())
app.post("/createProfile", createProfile);
app.get("/profiles", async (req, res) => {
    try {
        const profiles = await CompanyProfile.find();
        res.status(200).json(profiles);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching profiles', error: error.message });
    }
});