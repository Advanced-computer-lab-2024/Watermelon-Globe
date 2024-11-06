const express = require("express");
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
require("dotenv").config();
const Admin = require('./Routes/Admin')
const Seller = require('./Routes/Seller')

//company profile imports
const { createProfile, updateProfile, getProfiles } = require("./Controller/companyProfileController");

//activity imports
const { createActivity, getActivities, getActivityById, updateActivity, deleteActivity,
createTags, getTags, sortByPriceActivity,sortByRatingsActivity,
filterActivities,updateActivityRating,createActivityNew,getActivitiesNew } = require ("./Controller/activityController");

//guide imports
const guideController = require('./Controller/guideController'); // Import the controller
const{filterItineraries,filterByPreferenceItineraries}= require('./Controller/guideController');

//tourist intin imports
const touristItineraryController = require('./Controller/touristItineraryController')

//governor imports
const { createSite, getSite, getAllSites, updateSite, deleteSite, getMySites, filterByTags } =
  require('./Controller/governorController');


const {updateRating,getTourist} = require("./Controller/touristController");

//guest imports
const {createTourist,createTourguide, createAdvertiser,getTourists,
filterByLanguage,filterByDate,updateTourist} = require("./Controller/guestController"); 


// App variables
const app = express();
const MongoURI = process.env.MONGO_URI;
const cors = require('cors');
const port =  "8000";
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

app.use(express.json())

app.use((req,res,next) =>{
  console.log(req.method, req.path)
  next()
})

//tags
// app.post("/createTags", createTags);
// app.get("/getTags", getTags);

//tags
app.get("/filterByTags/:id",filterByTags);
app.get("/getTags",getTags);
app.post("/createTags",createTags);

//admin
app.use('/api/Admin', Admin)
app.use('/api/Seller',Seller)

//profile/adverstiser
app.post("/createProfile", createProfile);
app.put("/updateProfile/:id", updateProfile);
app.get("/profiles", getProfiles);
app.post("/addAdvertiser", createAdvertiser);

//activities
app.post('/newActivity', createActivity);
app.get('/activities', getActivities);
app.get('/activities/:id', getActivityById);
app.put('/updateActivity/:id', updateActivity);
app.delete('/deleteActivity/:id', deleteActivity);
app.post("/createActivityNew",createActivityNew);
app.get("/getActivitiesNew",getActivitiesNew)

//activities filters
app.post("/addActivity",createActivity);
app.get("/filterActivities",filterActivities);
app.get("/sortByPriceActivity",sortByPriceActivity);
app.get("/sortByRatingActivity",sortByRatingsActivity);
app.put("/updateActivityRating/:id",updateActivityRating);

//tour guide routes
app.post("/addGuide", guideController.createTourGuide);
app.get("/getGuide/:id", guideController.getTourGuide);
app.get("/getAllGuides", guideController.getAllGuides);
app.put("/updateGuide/:id", guideController.updateTourGuide);
app.get("/sortByPrice",guideController.sortByPrice);
app.get("/sortByRating",guideController.sortByRatings);
app.get("/filterByPreferenceItineraries/:id",filterByPreferenceItineraries);

//tourism governor/sites routes
app.post("/addSite", createSite);
app.get("/getSite/:id", getSite);
app.get("/getAllSites", getAllSites);
app.put("/updateSite/:id", updateSite);
app.delete("/deleteSite/:id", deleteSite);
app.get("/getMySites", getMySites);
// app.post("/addGov", createGov);

// //itineraries routes
app.post("/createItinerary", guideController.createItinerary); // Create a new itinerary
app.get("/getAllItineraries", guideController.getAllItineraries); // Get all itineraries
app.get("/getItinerary/:id", guideController.getItineraryById); // Get a single itinerary by ID
app.put("/updateItinerary/:id", guideController.updateItinerary); // Update an itinerary
app.delete("/deleteItinerary/:id", guideController.deleteItineraryById); // Delete an itinerary
app.get("/getMyItineraries", guideController.getMyItineraries);
//itineraries filters
// app.get("/getItineraryDetails/:id",getItineraryDetails);
// app.get("/itineraryFilterBudget",filterItineraryByBudget);
// app.get("/itineraryFilterRating",filterItineraryRating);
app.get("/itineraryFilter",filterItineraries);
app.get("/itineraryFilterLanguage",filterByLanguage);
app.get("/filterByDate",filterByDate);
app.put("/updateRating/:id",updateRating);

//childItineraries
app.post('/createChildItinerary', touristItineraryController.createChildItinerary);
app.get('/getChildItinerary/:id', touristItineraryController.getChildItineraryById);
app.get('/getAllChildIitineraries', touristItineraryController.getAllChildItineraries);
app.put('/updateChildItinerary/:id', touristItineraryController.updateChildItineraryById);
app.delete('/deleteChildItinerary/:id', touristItineraryController.deleteChildItineraryById);
//sprint 2
app.get(`/getMyCompletedItineraries/:buyerId`,async (req, res) => {
  const { buyerId } = req.params;

  try {
    const completedItineraries = await touristItineraryController.getMyCompletedItineraries(buyerId);
    res.status(200).json(completedItineraries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//tourist
app.post("/addTourist",createTourist);
app.get("/getTourists",getTourists);
app.get("/getTourist/:id",getTourist);
app.put("/updateTourist/:id",updateTourist);

//GET all tourists
// app.get("/getTourists", getTourists);

// //GET a single tourist
// // app.get("/getTourist/:id", getTourist);

// //POST a new tourist
// app.post("/createTourist", createTourist);

// //DELETE a tourist
// // app.delete("/deleteTourist/:id", deleteTourist);

// //UPDATE a tourist
// app.put("/updateTourist/:id", updateTourist);

app.post("/addTourguide", createTourguide);
// app.post("/addSeller", createSeller);

app.get("/home", (req, res) => {
  res.status(200).send("Tour Guide and Itinerary API");
});
