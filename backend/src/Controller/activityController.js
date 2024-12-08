const ActivityModel = require("../Models/activityModel.js");
const Tag = require("../Models/PreferenceTagModel.js");
const CompanyProfile = require("../Models/companyProfileModel");

const createTags = async (req, res) => {
  const tags = [
    { type: "Monuments", historicPeriod: "Ancient Egyptian" },
    { type: "Museums", historicPeriod: "Victorian Era" },
    // Add other predefined tags as needed
  ];

  try {
    await Tag.insertMany(tags);
    res.status(201).json({ message: "Tags created successfully" });
  } catch (error) {
    console.error("Error creating tags:", error);
    res
      .status(500)
      .json({ message: "Error creating tags", error: error.message });
  }
};

const getTags = async (req, res) => {
  try {
    const tags = await Tag.find(); // Fetch all tags from the database
    res.status(200).json(tags); // Send the tags in the response
  } catch (error) {
    console.error("Error fetching tags:", error);
    res.status(500).json({
      message: "Error fetching tags",
      error: error.message,
    });
  }
};

const createActivityNew = async (req, res) => {
  try {
    const {
      Name,
      Date,
      Time,
      Location,
      Price,
      priceRange,
      Category,
      tags,
      Discount,
      bookingOpen,
      Rating,
      Advertiser,
    } = req.body;

    // Save the new activity to the database
    const savedActivity = await newActivity.save();

    // Return the newly created activity
    res.status(201).json({
      message: "Activity created successfully",
      activity: savedActivity,
    });
  } catch (error) {
    // Handle any server errors
    res
      .status(500)
      .json({ message: "Error creating activity", error: error.message });
  }
};

const getActivitiesNew = async (req, res) => {
  try {
    const activities = await ActivityModel.find()
      .populate("Category")
      .populate("tags")
      .populate("Advertiser");
    res.status(200).json({
      message: "Activities retrieved successfully",
      activities: activities,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving activities", error: error.message });
  }
};

const createActivity = async (req, res) => {
  try {
    const {
      Name,
      Date,
      Time,
      Location,
      Price,
      Discount,
      bookingOpen,
      Advertiser,
      tags,
    } = req.body;

    if (!Advertiser) {
      return res.status(400).json({ message: "Advertiser is required" });
    }

    // Find the tags based on the tag IDs in the request body
    const tagDocuments = await Tag.find({ _id: { $in: tags } });

    if (tagDocuments.length !== tags.length) {
      return res.status(400).json({
        message: "One or more tags were not found",
        missingTags: tags.filter(
          (tagId) => !tagDocuments.some((doc) => doc._id.toString() === tagId)
        ),
      });
    }

    const newActivity = await ActivityModel.create({
      Name,
      Date,
      Time,
      Location,
      Price,
      Discount,
      bookingOpen,
      Advertiser,
      tags: tagDocuments.map((tag) => tag._id),
    });

    res.status(201).json({ newActivity });
  } catch (error) {
    console.error("Error creating activity:", error);
    res.status(500).json({
      message: "Error creating activity",
      error: error.message,
    });
  }
};

const getAllTags = async (req, res) => {
  try {
    const tags = await Tag.find();
    res.status(200).json(tags);
  } catch (error) {
    console.error("Error fetching tags:", error);
    res.status(500).json({
      message: "Error fetching tags",
      error: error.message,
    });
  }
};
const getActivities = async (req, res) => {
  try {
    const activities = await ActivityModel.find({})
      .populate("tags")
      .populate("Advertiser");

    res.status(200).json(activities);
  } catch (error) {
    console.error("Error fetching activities:", error);
    res
      .status(500)
      .json({ message: "Error fetching activities", error: error.message });
  }
};

const getActivityById = async (req, res) => {
  try {
    const { id } = req.params;
    const activity = await ActivityModel.findById(id).populate("Advertiser");

    if (!activity) {
      return res.status(404).json({
        message: "Activity not found",
      });
    }

    res.status(200).json(activity);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching activity",
      error: error.message,
    });
  }
};

const updateActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedActivity = await ActivityModel.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    if (!updatedActivity) {
      return res.status(404).json({
        message: "Activity not found",
      });
    }
    res.status(200).json({
      message: "Activity updated successfully",
      activity: updatedActivity,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error updating activity",
      error: error.message,
    });
  }
};

const deleteActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedActivity = await ActivityModel.findByIdAndDelete(id);
    if (!deletedActivity) {
      return res.status(404).json({
        message: "Activity not found",
      });
    }
    res.status(200).json({
      message: "Activity deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error deleting activity",
      error: error.message,
    });
  }
};

const sortByRatingsActivity = async (req, res) => {
  try {
    // Fetch and sort itineraries by rating in descending order (highest to lowest)
    const sortedActivities = await ActivityModel.find().sort({ Rating: -1 });

    return res.status(200).json(sortedActivities);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error sorting Activities by rating", error });
  }
};

const sortByPriceActivity = async (req, res) => {
  try {
    // Fetch and sort itineraries by price in ascending order (lowest to highest)
    const sortedActivities = await ActivityModel.find().sort({ Price: 1 });

    return res.status(200).json(sortedActivities);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error sorting activities by price", error });
  }
};

const filterActivities = async (req, res) => {
  const {
    startDate,
    endDate,
    minPrice,
    maxPrice,
    category,
    minRating,
    maxRating,
  } = req.query; // Expecting date strings, price parameters, category, and rating parameters
  console.log(req.query);
  try {
    // Convert strings to Date objects if provided
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    // Parse minPrice and maxPrice to numbers, if provided
    const min = minPrice ? parseFloat(minPrice) : null;
    const max = maxPrice ? parseFloat(maxPrice) : null;

    // Parse minRating and maxRating to numbers, if provided
    const minRate = minRating ? parseFloat(minRating) : null;
    const maxRate = maxRating ? parseFloat(maxRating) : null;

    // Find all activities
    const activities = await ActivityModel.find(); // Replace activityModel with your actual model

    // Filter activities based on provided criteria
    const filteredActivities = activities.filter((activity) => {
      // Check if the date falls within the specified range
      const dateMatch =
        start && end
          ? new Date(activity.Date) >= start && new Date(activity.Date) <= end
          : true; // If no date range is specified, consider all dates

      // Check if the category matches
      const categoryMatch = category ? activity.Category === category : true;

      // Check if the price falls within the specified range
      const priceMatch =
        (min === null || activity.Price >= min) &&
        (max === null || activity.Price <= max);

      // Check if the rating falls within the specified range
      const ratingMatch =
        (minRate === null || activity.Rating >= minRate) &&
        (maxRate === null || activity.Rating <= maxRate);

      return dateMatch && categoryMatch && priceMatch && ratingMatch; // Return true if all conditions are satisfied
    });

    if (filteredActivities.length === 0) {
      return res.status(404).json({
        message: "No activities found matching the specified criteria.",
      });
    }

    return res.status(200).json(filteredActivities);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error filtering activities.", error });
  }
};

const updateActivityRating = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating } = req.query;

    // Parse rating as a number
    const numericRating = Number(rating);
    console.log("Received rating:", numericRating);

    // Check if the rating is a valid number between 1 and 5
    if (isNaN(numericRating) || numericRating < 1 || numericRating > 5) {
      return res
        .status(400)
        .json({ message: "Invalid rating. Rating should be between 1 and 5." });
    }

    // Find the itinerary by ID
    const activity = await ActivityModel.findById(id);
    if (!activity) {
      return res.status(404).json({ message: "activity not found" });
    }

    // Initialize the values if not already set
    activity.noOfRatings = activity.noOfRatings || 0;
    activity.ratingsSum = activity.ratingsSum || 0;
    activity.Rating = activity.Rating || 0;

    // Increment noOfRatings and ratingsSum with the new rating
    activity.noOfRatings += 1;
    activity.ratingsSum += numericRating;

    // Calculate the new average rating
    activity.Rating = activity.ratingsSum / activity.noOfRatings;

    // Save the updated itinerary
    await activity.save();

    return res.status(200).json({
      message: "Rating updated successfully",
      averageRating: activity.Rating,
    });
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const addComment = async (req, res) => {
  try {
    const { id } = req.params; // Activity ID from the URL
    const { commentText, user } = req.body; // Comment text and user info from the request body

    // Find the activity by ID
    const activity = await ActivityModel.findById(id);
    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    // Add the new comment to the activity's comments array
    const newComment = {
      text: commentText,
      user: user, // Assuming `user` is a string or object with user details
      date: new Date(),
    };
    activity.comments = activity.comments || []; // Initialize if comments field is undefined
    activity.comments.push(newComment);

    // Save the updated activity
    await activity.save();

    return res.status(200).json({
      message: "Comment added successfully",
      comments: activity.comments,
    });
  } catch (error) {
    console.error("Error adding comment:", error);
    return res
      .status(500)
      .json({ message: "Error adding comment", error: error.message });
  }
};

module.exports = {
  createTags,
  getTags,
  createActivity,
  getActivities,
  getActivityById,
  updateActivity,
  deleteActivity,
  sortByPriceActivity,
  sortByRatingsActivity,
  filterActivities,
  updateActivityRating,
  createActivityNew,
  getActivitiesNew,
  addComment,
  getAllTags,
};
