// #Task route solution
const touristModel = require('../Models/touristModel');
const tourguideModel = require('../Models/tourguideModel');
const sellerModel = require('../Models/sellerModel');
const advertiserModel = require('../Models/advertiserModel');
const itineraryModel = require('../Models/itinerary');
const activityModel= require("../Models/activityModel")


const { default: mongoose } = require('mongoose');

//Tourist
const createTourist = async (req, res) => {
  try {
    // Destructure the required fields from req.body
    const { username, email, password, mobileNumber, nationality, dob, status } = req.body;

    // Validate if all fields are present
    if (!username || !email || !password || !mobileNumber || !nationality || !dob || !status) {
      return res.status(400).json({ message: 'All fields are required: username, email, password, mobile number, nationality, dob, and status.' });
    }

    // Create a new tourist instance and save to the database
    const newTourist = await touristModel.create({
      username,
      email,
      password,
      mobileNumber,
      nationality,
      dob,
      status,
      wallet: 0
    });

    // Send the newly created tourist as a response
    res.status(200).json(newTourist);
  } catch (error) {
    // Handle any errors
    res.status(500).json({ message: error.message });
  }
};

//Tour Guide
const createTourguide = async (req, res) => {
    
    try {
      // Destructure the name, email, and age from req.body
      const {Username,Email,Password} = req.body;
  
      // Validate if all fields are present
      if (!Username||!Email||!Password) {
        return res.status(400).json({ message: 'All fields are required: name,email,password.' });
      }
  
      // Create a new user instance and save to the database
      const NewTourguide = await tourguideModel.create({
        Username,
        Email,
        Password
      
      });
  
       await (await NewTourguide).save();
      // Send the newly created user as a response
      res.status(201).json(NewTourguide);
    } catch (error) {
      res.status(500).json({ message: error.message }); // Handle any errors
    }
  };
const getItineraryDetails = async (req, res) => {
    const { id } = req.params;

    try {
        const itinerary = await itineraryModel.findById(id); // Await the Promise

        if (!itinerary) { // Check for null/undefined after awaiting
            return res.status(404).json({ message: "Itinerary not found" }); // Change to 404 for not found
        }

        res.status(200).json(itinerary); // Respond with the itinerary
    } catch (error) {
        console.error("Error fetching itinerary:", error); // Log the error for debugging
        res.status(500).json({ message: "Internal server error" }); // Handle any errors
    }
};
const filterItineraryPrice = async (req, res) => {
  const {priceOfTour} = req.query;

  // Check if authorId is provided
  

  try {
      // Find all blogs that have the same authorId
      const Itineraries = await itineraryModel.find({priceOfTour: priceOfTour });

      // If no blogs found, send a 404 response
      if (Itineraries.length === 0) {
          return res.status(404).json({ message: 'No blogs found for this author.' });
      }

      // Send the blogs as a response
      return res.status(200).json(Itineraries);
  } catch (error) {
      // Handle any potential errors
      console.error(error);
      return res.status(500).json({ message: 'An error occurred while filtering blogs.' });
  }
};
const filterItineraryRating = async (req, res) => {
const {rating} = req.query;

// Check if authorId is provided


try {
    // Find all blogs that have the same authorId
    const Itineraries = await itineraryModel.find({rating: rating });

    // If no blogs found, send a 404 response
    if (Itineraries.length === 0) {
        return res.status(404).json({ message: 'No itineray has this rating .' });
    }

    // Send the blogs as a response
    return res.status(200).json(Itineraries);
} catch (error) {
    // Handle any potential errors
    console.error(error);
    return res.status(500).json({ message: 'An error occurred while filtering blogs.' });
}
};

//Advertiser
const createAdvertiser = async (req, res) => {
    try {
      // Destructure the name, email, and age from req.body
      const {Username,Email,Password} = req.body;
  
      // Validate if all fields are present
      if (!Username||!Email||!Password) {
        return res.status(400).json({ message: 'All fields are required: name, email,password.' });
      }
  
      // Create a new user instance and save to the database
      const NewAdvertiser = advertiserModel.create({
        Username,
        Email,
        Password

      });
  
       await (await NewAdvertiser).save();
      // Send the newly created user as a response
      res.status(201).json(NewAdvertiser);
    } catch (error) {
      res.status(500).json({ message: error.message });
      console.loge(error.message) // Handle any errors
    }
  };
  
const getActivityDetails= async (req, res) => {
  const { id } = req.params;

  try {
      const itinerary = await itineraryModel.findById(id); // Await the Promise

      if (!itinerary) { // Check for null/undefined after awaiting
          return res.status(404).json({ message: "Itinerary not found" }); // Change to 404 for not found
      }

      res.status(200).json(itinerary); // Respond with the itinerary
  } catch (error) {
      console.error("Error fetching itinerary:", error); // Log the error for debugging
      res.status(500).json({ message: "Internal server error" }); // Handle any errors
  }
};

//Seller
  const createSeller = async (req, res) => {
    try {
      // Destructure the name, email, and age from req.body
      const {Username,Email,Password} = req.body;
  
      // Validate if all fields are present
      if (!Username||!Email||!Password) {
        return res.status(400).json({ message: 'All fields are required: username,email,password.' });
      }
  
      // Create a new user instance and save to the database
      const NewSeller = sellerModel.create({
        Username,
        Email,
        Password
       
      });
  
       await (await NewSeller ).save();
      // Send the newly created user as a response
      res.status(201).json(NewSeller);
    } catch (error) {
      res.status(500).json({ message: error.message }); // Handle any errors
    }
  };

 

const getTourists = async (req, res) => {
   try {
      // Assuming User is a Mongoose model
      const tourguids = await tourguideModel.find(); // This will retrieve all users
      res.status(200).json(tourguids); // Send the users data as JSON
    } catch (error) {
      res.status(500).json({ message: error.message });
       // Handle any errors
    }  }

    const filterItineraryByBudget = async (req, res) => {
      const { minPrice, maxPrice } = req.query;

    try {
        // Validate that minPrice and maxPrice are provided
        if (!minPrice || !maxPrice) {
            return res.status(400).json({ message: 'Please provide both minPrice and maxPrice.' });
        }

        // Query to find itineraries within the price range
        const itineraries = await itineraryModel.find({
          priceOfTour: { $gte: Number(minPrice), $lte: Number(maxPrice) }
        });

        if (itineraries.length === 0) {
            return res.status(404).json({ message: 'No itineraries found within the given budget range.' });
        }

        res.status(200).json(itineraries);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};


  


    // const updateUser = async (req, res) => {
    //   try {
    //     // Extract the name to search for and the new age from req.body
    //     const {Name, Age } = req.body;
    
    //     // Validate if both fields are provided
    //     if (!Name || !Age) {
    //       return res.status(400).json({ message: 'Both name and new age are required.' });
    //     }
    
    //     // Find the user by name and update their age
    //     const updatedUser = await userModel.findOneAndUpdate(
    //       { Name: Name },              // Search for user by name
    //       { Age: Age },              // Update the age
    //       { new: true }                 // Return the updated document
    //     );
    
    //     // If no user is found, return a 404 error
    //     if (!updatedUser) {
    //       return res.status(404).json({ message: 'User not found.' });
    //     }
    
    //     // Return the updated user in the response
    //     res.status(200).json(updatedUser);
    //   } catch (error) {
    //     res.status(500).json({ message: error.message }); // Handle any errors
    //   }
    // };
    

    // const deleteUser = async (req, res) => {
    //   try {
    //     // Extract the name from req.body
    //     const {Name} = req.body;
    
    //     // Validate if the name is provided
    //     if (!Name) {
    //       return res.status(400).json({ message: 'Name is required to delete a user.' });
    //     }
    
    //     // Find the user by name and delete
    //     const deletedUser = await userModel.findOneAndDelete({Name:Name });
    
    //     // If no user is found, return a 404 error
    //     if (!deletedUser) {
    //       return res.status(404).json({message: 'User not found.' });
    //     }
    
    //     // Return a success message if user is deleted
    //     res.status(200).json({ message: 'User successfully deleted.', user: deletedUser });
    //   } catch (error) {
    //     res.status(500).json({ message: error.message }); // Handle any errors
    //   }
    // };
    


module.exports = {createSeller, createAdvertiser, createTourguide, createTourist,getTourists,getItineraryDetails, filterItineraryRating,filterItineraryByBudget};
