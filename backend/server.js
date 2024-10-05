require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const touristRoutes = require("./Routes/tourist");
const {createTourist,createTourguide, createSeller, createAdvertiser,getTourists, getItineraryDetails,filterItineraryByBudget, filterItineraryRating} = require("./Controllers/guestController"); 
const guideController = require("./Controllers/guideController"); 
const {updateRating} = require("./Controllers/touristController");
// const x = require("./Controllers/guideController");


//express app
const app = express();

//middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
//grabs all the routes in workouts and uses them on the app
app.use("/api/tourists", touristRoutes);

// connect to DB

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log("connected to db & listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });

  app.post("/addTourist",createTourist);
  app.post("/addTourguide", createTourguide);
  app.post("/addSeller", createSeller);
  app.post("/addAdvertiser", createAdvertiser);
  app.get("/getTourists",getTourists);
  app.get("/getItineraryDetails/:id",getItineraryDetails);
  app.get("/itineraryFilterBudget",filterItineraryByBudget)
  app.get("/itineraryFilterRating",filterItineraryRating)

  //app.put("/updateRating/:id",updateRating)


app.post("/itineraries", guideController.createItinerary); // Create a new itinerary
app.get("/itineraries", guideController.getAllItineraries); // Get all itineraries
app.get("/itineraries/:id", guideController.getItineraryById); // Get a single itinerary by ID
app.patch("/itineraries/:id", guideController.updateItinerary); // Update an itinerary
app.delete("/itineraries/:id", guideController.deleteItineraryById); // Delete an itinerary
app.get("/getMyItineraries", guideController.getMyItineraries);
app.get("/allItineraries",guideController.getItenerariesShahd);
app.post("/createTourGuide",guideController.createTourguideShahd);
// app.get("/allItineraries",guideController.getItenerariesShahd)

process.env;
