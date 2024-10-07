const express = require("express");
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
require("dotenv").config();

//company profile imports
const { createProfile, updateProfile, getProfiles } = require("./Controller/companyProfileController");

//activity imports
const { createActivity, getActivities, getActivityById, updateActivity, deleteActivity,
createTags, getTags, sortByPriceActivity,sortByRatingsActivity,
filterActivities,updateActivityRating } = require ("./Controller/activityController");

//guide imports
const guideController = require('./Controller/guideController'); // Import the controller

//tourist intin imports
const touristItineraryController = require('./Controller/touristItineraryController')

//governor imports
const { createSite, getSite, getAllSites, updateSite, deleteSite, getMySites, filterByTags } =
  require('./Controller/governorController');

//admin imports
const Admin = require('./Routes/Admin');

//seller imports
const Seller = require('./Routes/Seller');

//tourist imports
const touristRoutes = require("./Routes/tourist");
const {updateRating} = require("./Controller/touristController");

//guest imports
const {createTourist,createTourguide, createSeller, createAdvertiser,getTourists,
getItineraryDetails,filterItineraryByBudget, filterItineraryRating,filterItineraries,
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

// app.use((req,res,next) =>{
//   console.log(req.method, req.path)
//   next()
// })

//tags
// app.post("/createTags", createTags);
// app.get("/getTags", getTags);

//tags
// app.get("/filterByTags",filterByTags);
// app.get("/getTags",getTags);
// app.post("/createTags",createTags);

// //admin
// app.use('/api/Admin', Admin)
// app.use('/api/Seller', Seller)

//profile/adverstiser
app.post("/createProfile", createProfile);
app.put("/updateProfile/:id", updateProfile);
app.get("/profiles/:id?", getProfiles);
app.post("/addAdvertiser", createAdvertiser);

//activities
app.post('/newActivity', createActivity);
app.get('/activities', getActivities);
app.get('/activities/:id', getActivityById);
app.put('/updateActivity/:id', updateActivity);
app.delete('/deleteActivity/:id', deleteActivity);
//activities filters
// app.post("/addActivity",createActivity);
// app.get("/filterActivities",filterActivities);
// app.get("/sortByPriceActivity",sortByPriceActivity);
// app.get("/sortByRatingActivity",sortByRatingsActivity);
// app.put("/updateActivityRating/:id",updateActivityRating);

// //tour guide routes
// app.post("/addGuide", guideController.createTourGuide);
// app.get("/getGuide/:id", guideController.getTourGuide);
// app.put("/updateGuide/:id", guideController.updateTourGuide);
// app.get("/sortByPrice",guideController.sortByPrice);
// app.get("/sortByRating",guideController.sortByRatings);

// //tourism governor/sites routes
// app.post("/addSite", createSite);
// app.get("/getSite/:id", getSite);
// app.get("/getAllSites", getAllSites);
// app.put("/updateSite/:id", updateSite);
// app.delete("/deleteSite/:id", deleteSite);
// app.get("/getMySites", getMySites);
// // app.post("/addGov", createGov);

// // //itineraries routes
// app.post("/createItinerary", guideController.createItinerary); // Create a new itinerary
// app.get("/getAllItineraries", guideController.getAllItineraries); // Get all itineraries
// app.get("/getItinerary/:id", guideController.getItineraryById); // Get a single itinerary by ID
// app.put("/updateItinerary/:id", guideController.updateItinerary); // Update an itinerary
// app.delete("/deleteItinerary/:id", guideController.deleteItineraryById); // Delete an itinerary
// app.get("/getMyItineraries", guideController.getMyItineraries);
// //itineraries filters
// app.get("/getItineraryDetails/:id",getItineraryDetails);
// app.get("/itineraryFilterBudget",filterItineraryByBudget);
// app.get("/itineraryFilterRating",filterItineraryRating);
// app.get("/itineraryFilter",filterItineraries);
// app.get("/itineraryFilterLanguage",filterByLanguage);
// app.get("/filterByDate",filterByDate);
// app.put("/updateRating/:id",updateRating);

// //childItineraries
// app.post('/createChildItinerary', touristItineraryController.createChildItinerary);
// app.get('/getChildItinerary/:id', touristItineraryController.getChildItineraryById);
// app.get('/getAllChildIitineraries', touristItineraryController.getAllChildItineraries);
// app.put('/updateChildItinerary/:id', touristItineraryController.updateChildItineraryById);
// app.delete('/deleteChildItinerary/:id', touristItineraryController.deleteChildItineraryById);

// //tourist
// app.post("/addTourist",createTourist);
// app.put("/updateTourist/:id",updateTourist);
// app.get("/getTourists",getTourists);
// // app.post("/addTourguide", createTourguide);
// // app.post("/addSeller", createSeller);

// app.get("/home", (req, res) => {
//   res.status(200).send("Tour Guide and Itinerary API");
// });
