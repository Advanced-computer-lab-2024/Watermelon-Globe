const Admin = require("../Models/AdminModel");
const Governer = require("../Models/tourismGovernorModel");
const Tourist = require("../Models/touristModel");
const Company = require("../Models/companyProfileModel");
const PreferenceTag = require("../Models/PreferenceTagModel");
const ActivityCategory = require("../Models/ActivityCategoryModel");
const Product = require("../Models/ProductModel");
const Complaint = require("../Models/Complaint");
const Itinerary = require("../Models/itineraryModel");
const TourGuide = require("../Models/tourGuideModel");
const Transportation = require("../Models/TransportationModel");
const Seller = require("../Models/SellerModel");
const bookedItinerary = require("../Models/touristItineraryModel");
const bookedActivity = require("../Models/activityBookingModel");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const Activity = require("../Models/activityModel");
const PromoCode = require("../Models/promoCodes");

const getAllAdmin = async (req, res) => {
  try {
    const admin = await Admin.find({}).sort({ createdAt: -1 });
    res.status(200).json(admin);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving admins", error: error.message });
  }
};
const getAdmin = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such admin" });
  }

  const admin = await Admin.findById(id);

  if (!admin) {
    return res.status(400).json({ error: "No such admin" });
  }
  res.status(200).json(admin);
};

const createAdmin = async (req, res) => {
  const { username, password } = req.body;

  // Check if username or password are empty
  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required" });
  }

  try {
    // Check if the username or password already exists
    const existingAdmin = await Admin.findOne({
      $or: [{ username }, { password }],
    });

    if (existingAdmin) {
      return res
        .status(400)
        .json({ error: "This username or password already exists" });
    }

    // Create new admin if validations pass
    const admin = await Admin.create({ username, password });
    res.status(200).json(admin);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete a Admin
const deleteAdmin = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such user" });
  }

  const admin = await Admin.findOneAndDelete({ _id: id });

  if (!admin) {
    return res.status(400).json({ error: "No such user" });
  }
  res.status(200).json(admin);
};

const getAllGoverner = async (req, res) => {
  const governer = await Governer.find({}).sort({ createdAt: -1 });

  res.status(200).json(governer);
};

//create new Governer
const createGoverner = async (req, res) => {
  const { username, password } = req.body;

  // Check if username or password are empty
  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required" });
  }

  try {
    // Check if the username or password already exists
    const existingGoverner = await Governer.findOne({
      $or: [{ username }, { password }],
    });

    if (existingGoverner) {
      return res
        .status(400)
        .json({ error: "This username or password already exists" });
    }

    // Create new Governer if validations pass
    const governer = await Governer.create({ username, password });
    res.status(200).json(governer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete a Governer
const deleteGoverner = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such user" });
  }

  const governer = await Governer.findOneAndDelete({ _id: id });

  if (!governer) {
    return res.status(400).json({ error: "No such user" });
  }
  res.status(200).json(governer);
};

//get all PreferenceTag
const getAllPreferenceTag = async (req, res) => {
  const preferencetag = await PreferenceTag.find({}).sort({ createdAt: -1 });

  res.status(200).json(preferencetag);
};

//get single preferencetag
const getPreferenceTag = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such tag" });
  }

  const preferencetag = await PreferenceTag.findById(id);

  if (!preferencetag) {
    return res.status(400).json({ error: "No such tag" });
  }
  res.status(200).json(preferencetag);
};

//create new preferencetag
const createPreferenceTag = async (req, res) => {
  const { tag } = req.body;

  let emptyFields = [];
  if (!tag) {
    emptyFields.push("tag");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all fields", emptyFields });
  }

  const existingTag = await PreferenceTag.findOne({ tag });
  if (existingTag) {
    return res.status(400).json({ error: "This tag already exists" });
  }

  try {
    const preferencetag = await PreferenceTag.create({ tag });
    res.status(200).json(preferencetag);
  } catch (error) {
    res.status(400).json({ error: error.mssg });
  }
};

//delete a preferencetag
const deletePreferenceTag = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such tag" });
  }

  const preferencetag = await PreferenceTag.findOneAndDelete({ _id: id });

  if (!preferencetag) {
    return res.status(400).json({ error: "No such tag" });
  }
  res.status(200).json(preferencetag);
};

const updatePreferenceTag = async (req, res) => {
  const { id } = req.params;
  const { tag } = req.body;

  // Check if the provided ID is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid tag ID" });
  }

  // Check for empty fields
  let emptyFields = [];
  if (!tag) {
    emptyFields.push("tag");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all fields", emptyFields });
  }

  // Check if the new tag name already exists
  const existingTag = await PreferenceTag.findOne({ tag });
  if (existingTag) {
    return res.status(400).json({ error: "Tag name already exists" });
  }

  try {
    // Update the tag and return the updated document
    const updatedTag = await PreferenceTag.findOneAndUpdate(
      { _id: id },
      { tag }, // Only update the tag field
      { new: true } // Return the updated document
    );

    // Check if the tag exists
    if (!updatedTag) {
      return res.status(404).json({ error: "No such tag" });
    }

    // Respond with the updated tag
    res.status(200).json(updatedTag);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//get all activitycategory
const getAllActivityCategory = async (req, res) => {
  const activitycategory = await ActivityCategory.find({}).sort({
    createdAt: -1,
  });

  res.status(200).json(activitycategory);
};

//get single activitycategory
const getActivityCategory = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such activity" });
  }

  const activitycategory = await ActivityCategory.findById(id);

  if (!activitycategory) {
    return res.status(400).json({ error: "No such activity" });
  }
  res.status(200).json(activitycategory);
};

//create new activitycategory
const createActivityCategory = async (req, res) => {
  const { activity } = req.body;

  let emptyFields = [];
  if (!activity) {
    emptyFields.push("activity");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all fields", emptyFields });
  }

  const existingCategory = await ActivityCategory.findOne({ activity });
  if (existingCategory) {
    return res.status(400).json({ error: "This category already exists" });
  }

  try {
    const activitycategory = await ActivityCategory.create({ activity });
    res.status(200).json(activitycategory);
  } catch (error) {
    res.status(400).json({ error: error.mssg });
  }
};

//delete a activitycategory
const deleteActivityCategory = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such activity" });
  }

  const activitycategory = await ActivityCategory.findOneAndDelete({ _id: id });

  if (!activitycategory) {
    return res.status(400).json({ error: "No such activity" });
  }
  res.status(200).json(activitycategory);
};

//update a activitycategory
const updateActivityCategory = async (req, res) => {
  const { id } = req.params;
  const { activity } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such activity" });
  }

  let emptyFields = [];
  if (!activity) {
    emptyFields.push("activity");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all fields", emptyFields });
  }

  // Check if activity name already exists
  const existingActivity = await ActivityCategory.findOne({ activity });
  if (existingActivity) {
    return res.status(400).json({ error: "Activity name already exists" });
  } else {
    // Update the activity category and return the updated category
    const updatedActivityCategory = await ActivityCategory.findOneAndUpdate(
      { _id: id },
      { activity }, // Only update the 'activity' field
      { new: true } // This option ensures the updated document is returned
    );

    if (!updatedActivityCategory) {
      return res.status(400).json({ error: "No such activity" });
    }

    res.status(200).json(updatedActivityCategory); // Return the updated category
  }
};

//create a new product
const createProduct = async (req, res) => {
  const { name, price, quantity, description, seller, ratings, sales } =
    req.body;

  try {
    // Create a new product with the provided details
    const product = await Product.create({
      name,
      price,
      quantity,
      description,
      seller: "6729244f151b6c9e346dd732",
      ratings: ratings || 0,
      sales: sales || 0,
      archived: false, // Explicitly set this as a default value
    });

    // Return the created product as JSON response
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all products
const getAllProducts = async (req, res) => {
  const products = await Product.find({}).sort({ createdAt: -1 });

  res.status(200).json(products);
};

// Get All Products' Names & IDs
const getAllProductIds = async (req, res) => {
  try {
    // Retrieve all products, selecting only the name and _id fields
    const products = await Product.find({}, "name _id");

    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while retrieving products" });
  }
};

//search a product by name
const searchProductbyName = async (req, res) => {
  try {
    // Access the product name from query parameters
    const productName = req.query.name;

    // Search for the product in the database using the name from query
    let product = await Product.find({ name: new RegExp(productName, "i") });

    if (!product || product.length === 0) {
      // Return a 404 status code if no product is found
      return res.status(404).json({ error: "No such product" });
    }

    // Return the found product(s) with a 200 status
    return res.status(200).json(product);
  } catch (error) {
    // Handle potential errors
    return res
      .status(500)
      .json({ error: "An error occurred while searching for the product" });
  }
};

//filter products based on price
const filterProduct = async (req, res) => {
  // Extract the Price from the URL parameters
  const { price } = req.params; // Assuming the param is named 'price'

  try {
    // Convert the price to a number for comparison
    const priceValue = parseFloat(price);

    if (isNaN(priceValue)) {
      return res.status(400).json({ error: "Invalid price format" });
    }

    // Find the product by price
    let product = await Product.find({ price: priceValue });

    if (!product) {
      return res.status(400).json({ error: "No such product" });
    }

    // Return the found product
    return res.status(200).json(product);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "An error occurred while fetching the product" });
  }
};

//Update a product
const updateProduct = async (req, res) => {
  const { id } = req.query;
  const { name, description, price } = req.body;

  // Check if the ID is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such product" });
  }

  try {
    // Update only the details and price fields
    const product = await Product.findOneAndUpdate(
      { _id: id },
      { name, description, price },
      { new: true } // Return the updated product
    );

    if (!product) {
      return res.status(400).json({ error: "No such product" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const sortProducts = async (req, res) => {
  try {
    // Fetch all products and sort them by ratings in descending order
    const products = await Product.find({}).sort({ ratings: -1 });

    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const changePasswordAdmin = async (req, res) => {
  const { id } = req.params;
  const { oldPassword, newPassword, newPasswordConfirmed } = req.query; // Changed to req.body

  console.log(id, oldPassword, newPassword);

  // Validate inputs
  if (!oldPassword) {
    return res.status(400).json({ error: "Old password is required" }); // Use 400 for bad requests
  }
  if (!newPassword) {
    return res.status(400).json({ error: "New password is required" });
  }
  if (!newPasswordConfirmed) {
    return res
      .status(400)
      .json({ error: "New password confirmation is required" });
  }

  try {
    const admin = await Admin.findOne({ _id: id });

    if (!admin) {
      return res.status(404).json({ error: "admin not found" }); // Tourist not found
    }

    // Compare the old password directly
    if (admin.password !== oldPassword) {
      return res.status(401).json({ error: "Wrong old password" }); // Use 401 for unauthorized access
    }

    // Check if new passwords match
    if (newPassword !== newPasswordConfirmed) {
      return res
        .status(400)
        .json({ error: "New password and confirmed password do not match" });
    }

    // Update the password directly
    admin.password = newPassword;
    await admin.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Get all Complaints
const getAllComplaints = async (req, res) => {
  const complaint = await Complaint.find({}).sort({ createdAt: -1 });

  res.status(200).json(complaint);
};

//get single Complaint
const getComplaint = async (req, res) => {
  const { id } = req.params;

  // if (!mongoose.Types.ObjectId.isValid(id)){
  //     return res.status(400).json({error: 'No such activity'})
  // }

  const complaint = await Complaint.findById(id);

  if (!complaint) {
    return res.status(400).json({ error: "No such complaint" });
  }
  res.status(200).json(complaint);
};

// Function to update complaint status
const updateComplaint = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the complaint by its ID and update the status if it's 'pending'
    const complaint = await Complaint.findOneAndUpdate(
      { _id: id, status: "pending" }, // Condition to only update if status is 'pending'
      { status: "resolved" }, // Update the status to 'resolved'
      { new: true } // Return the updated document
    );
    // If no complaint found or already resolved, return an error
    if (!complaint) {
      return res.status(400).json({ error: "already resolved" });
    }

    res
      .status(200)
      .json({ message: "Complaint resolved successfully", complaint });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteTourist = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such tourist" });
  }

  const tourist = await Tourist.findOneAndDelete({ _id: id });

  if (!tourist) {
    return res.status(400).json({ error: "No such tourist" });
  }
  res.status(200).json(tourist);
};

const deleteGuide = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such guide" });
  }

  const guide = await TourGuide.findOneAndDelete({ _id: id });

  if (!guide) {
    return res.status(400).json({ error: "No such guide" });
  }
  res.status(200).json(guide);
};

const deleteSeller = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such seller" });
  }

  const seller = await Seller.findOneAndDelete({ _id: id });

  if (!seller) {
    return res.status(400).json({ error: "No such seller" });
  }
  res.status(200).json(seller);
};

const deleteCompany = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such company" });
  }

  const company = await Company.findOneAndDelete({ _id: id });

  if (!company) {
    return res.status(400).json({ error: "No such company" });
  }
  res.status(200).json(company);
};

// Function to reply to a complaint
const replyComplaint = async (req, res) => {
  const { id } = req.params; // Get complaint ID from URL params
  const { reply } = req.body; // Get reply content from the request body

  if (!reply) {
    return res.status(400).json({ error: "Reply cannot be empty" });
  }

  try {
    // Find the complaint by its ID and update the reply field
    const complaint = await Complaint.findOneAndUpdate(
      { _id: id }, // Find the complaint by ID
      { reply: reply }, // Set the reply
      { new: true } // Return the updated complaint
    );

    // If no complaint found
    if (!complaint) {
      return res.status(404).json({ error: "Complaint not found" });
    }

    // Send back the updated complaint with the reply
    res.status(200).json({
      message: "Reply added successfully",
      complaint,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const acceptAdvertiser = async (req, res) => {
  const { id } = req.params;

  try {
    // Find advertiser by ID and update the status to "accepted"
    const updatedAdvertiser = await Company.findByIdAndUpdate(
      id,
      { status: "accepted" },
      { new: true } // Return the updated document
    );

    if (!updatedAdvertiser) {
      return res.status(404).json({ message: "Advertiser not found" });
    }

    res.status(200).json(updatedAdvertiser);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error accepting advertiser: " + error.message });
  }
};
const acceptSeller = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedSeller = await Seller.findByIdAndUpdate(
      id,
      { status: "accepted" },
      { new: true } // Return the updated document
    );

    if (!updatedSeller) {
      return res.status(404).json({ message: "Seller not found" });
    }

    res.status(200).json(updatedSeller);
  } catch (error) {
    res.status(500).json({ error: "Error accepting seller: " + error.message });
  }
};
const acceptTourGuide = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedGuide = await TourGuide.findByIdAndUpdate(
      id,
      { status: "accepted" },
      { new: true } // Return the updated document
    );

    if (!updatedGuide) {
      return res.status(404).json({ message: "Guide not found" });
    }

    res.status(200).json(updatedGuide);
  } catch (error) {
    res.status(500).json({ error: "Error accepting guide: " + error.message });
  }
};

// accept reject user
const rejectAdvertiser = async (req, res) => {
  const { id } = req.params;

  try {
    // Find advertiser by ID and update the status to "accepted"
    const updatedAdvertiser = await Company.findByIdAndUpdate(
      id,
      { status: "rejected" },
      { new: true } // Return the updated document
    );

    if (!updatedAdvertiser) {
      return res.status(404).json({ message: "Advertiser not found" });
    }

    res.status(200).json(updatedAdvertiser);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error accepting advertiser: " + error.message });
  }
};
const rejectSeller = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedSeller = await Seller.findByIdAndUpdate(
      id,
      { status: "rejected" },
      { new: true } // Return the updated document
    );

    if (!updatedSeller) {
      return res.status(404).json({ message: "Seller not found" });
    }

    res.status(200).json(updatedSeller);
  } catch (error) {
    res.status(500).json({ error: "Error accepting seller: " + error.message });
  }
};
const rejectTourGuide = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedGuide = await TourGuide.findByIdAndUpdate(
      id,
      { status: "rejected" },
      { new: true } // Return the updated document
    );

    if (!updatedGuide) {
      return res.status(404).json({ message: "Guide not found" });
    }

    res.status(200).json(updatedGuide);
  } catch (error) {
    res.status(500).json({ error: "Error accepting guide: " + error.message });
  }
};
const sortComplaintsByDate = async (req, res) => {
  try {
    // The sort order can be 'asc' or 'desc', defaulting to 'desc' (newest first)
    const { order = "desc" } = req.query;
    const sortOrder = order === "asc" ? 1 : -1;

    const complaints = await Complaint.find({})
      .sort({ date: sortOrder })
      .exec();

    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Filter complaints by status
const filterComplaintsByStatus = async (req, res) => {
  try {
    const { status } = req.query; // status can be 'pending' or 'resolved'

    // Validate status parameter
    if (status && !["pending", "resolved"].includes(status)) {
      return res
        .status(400)
        .json({ error: "Invalid status. Must be either pending or resolved" });
    }

    // If status is provided, filter by it; otherwise, return all complaints
    const query = status ? { status } : {};
    const complaints = await Complaint.find(query).sort({ date: -1 });

    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUploadedDocuments = async (req, res) => {
  try {
    // Fetch all users (TourGuides, Advertisers, Sellers)
    const tourGuides = await TourGuide.find(
      {},
      "username idProof certificates"
    );
    const advertisers = await Advertiser.find(
      {},
      "Username idProof taxationRegistryCard"
    );
    const sellers = await Seller.find({}, "Name idProof taxationRegistryCard");

    // Filter TourGuides who have uploaded documents (either idProof or certificates)
    const filteredTourGuides = tourGuides.filter(
      (tourGuide) =>
        tourGuide.idProof ||
        (tourGuide.certificates && tourGuide.certificates.length > 0)
    );

    // Filter Advertisers who have uploaded documents (either idProof or taxationRegistryCard)
    const filteredAdvertisers = advertisers.filter(
      (advertiser) => advertiser.idProof || advertiser.taxationRegistryCard
    );

    // Filter Sellers who have uploaded documents (either idProof or taxationRegistryCard)
    const filteredSellers = sellers.filter(
      (seller) => seller.idProof || seller.taxationRegistryCard
    );

    // Respond with the filtered lists of users who uploaded documents
    res.status(200).json({
      tourGuides: filteredTourGuides,
      advertisers: filteredAdvertisers,
      sellers: filteredSellers,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUploadedDocumentsByID = async (req, res) => {
  try {
    const { id } = req.params; // Retrieve the userId from the request parameters

    // Fetch the user (TourGuide, Advertiser, Seller) based on the userId
    const tourGuide = await TourGuide.findOne(
      { _id: id },
      "username idProof certificates"
    );
    const advertiser = await Advertiser.findOne(
      { _id: id },
      "Username idProof taxationRegistryCard"
    );
    const seller = await Seller.findOne(
      { _id: id },
      "Name idProof taxationRegistryCard"
    );

    // Check if the user is a TourGuide and has uploaded documents
    if (tourGuide) {
      if (
        tourGuide.idProof ||
        (tourGuide.certificates && tourGuide.certificates.length > 0)
      ) {
        return res.status(200).json({
          userType: "TourGuide",
          user: tourGuide,
          message: "Documents uploaded",
        });
      } else {
        return res.status(200).json({
          userType: "TourGuide",
          user: tourGuide,
          message: "No documents uploaded",
        });
      }
    }

    // Check if the user is an Advertiser and has uploaded documents
    if (advertiser) {
      if (advertiser.idProof || advertiser.taxationRegistryCard) {
        return res.status(200).json({
          userType: "Advertiser",
          user: advertiser,
          message: "Documents uploaded",
        });
      } else {
        return res.status(200).json({
          userType: "Advertiser",
          user: advertiser,
          message: "No documents uploaded",
        });
      }
    }

    // Check if the user is a Seller and has uploaded documents
    if (seller) {
      if (seller.idProof || seller.taxationRegistryCard) {
        return res.status(200).json({
          userType: "Seller",
          user: seller,
          message: "Documents uploaded",
        });
      } else {
        return res.status(200).json({
          userType: "Seller",
          user: seller,
          message: "No documents uploaded",
        });
      }
    }

    // If no user is found
    return res.status(404).json({ message: "User not found" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPassword = async (req, res) => {
  const { id } = req.query;
  console.log(id);
  try {
    const admin = await Admin.findById(id);
    console.log(admin);
    if (!admin) {
      res.status(400).json({ message: "admin is not found" });
    } else {
      res.status(200).json(admin.password);
    }
  } catch {
    console.error("Error getting password:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// view the sales & the available quantity of all products
const getQuantity = async (req, res) => {
  try {
    const products = await Product.find({}, "name quantity sales").sort({
      createdAt: -1,
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while retrieving product quantities.",
    });
  }
};

// archive a product
const archiveProduct = async (req, res) => {
  const { name } = req.query;

  // Check if the name is provided
  if (!name) {
    return res.status(400).json({ error: "Product name is required" });
  }

  try {
    // Set the archived field to true based on the product name
    const product = await Product.findOneAndUpdate(
      { name: name },
      { archived: true },
      { new: true } // Return the updated product
    );

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({ message: "Product archived successfully", product });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while archiving the product" });
  }
};

// unarchive a product
const unarchiveProduct = async (req, res) => {
  const { name } = req.query;

  // Check if the name is provided
  if (!name) {
    return res.status(400).json({ error: "Product name is required" });
  }

  try {
    // Set the archived field to false based on the product name
    const product = await Product.findOneAndUpdate(
      { name: name },
      { archived: false },
      { new: true } // Return the updated product
    );

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res
      .status(200)
      .json({ message: "Product unarchived successfully", product });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while unarchiving the product" });
  }
};

//Upload product image
const uploadPicture = async (req, res) => {
  const { id } = req.query; // Get the product ID from the route parameters
  const { picture } = req.body; // Get the picture URL from the request body

  // Check if the ID is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid product ID" });
  }

  try {
    // Update the product's picture field
    const product = await Product.findOneAndUpdate(
      { _id: id }, // Find the product by ID
      { picture }, // Update the picture field
      { new: true } // Return the updated product
    );

    if (!product) {
      return res.status(404).json({ error: "No product found with this ID" });
    }

    res
      .status(200)
      .json({ message: "Product picture updated successfully", product });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the product picture" });
  }
};

// Controller function to mark an itinerary as inappropriate
// const markItineraryInappropriate = async (req, res) => {
//   const { id } = req.params; // Get the itinerary ID from request parameters

//   try {
//     // Find the itinerary by its ID and update the inappropriate field
//     const itinerary = await Itinerary.Itinerary.findByIdAndUpdate(
//       id,
//       { inappropriate: true }, // Set the inappropriate field to true
//       { new: true } // Return the updated document
//     )
//     .populate("guide");
//     const guide = itinerary.guide;
//     const guideEmail = guide.email;
//     const emailMessage="Dear "+guide.name+" We are sorry to inform you that your itinerary "+itinerary.name+" with id "+itinerary.id+" has been flagged innapropriate , please review it and if you have any inqueries don't hesitate to contact us"
//     sendEmail(guideEmail,"innapropriate itinerary",emailMessage,"");
//     console.log(guide);

//     // If the itinerary is not found, send a 404 error response
//     if (!itinerary) {
//       return res.status(404).json({ error: "Itinerary not found" });
//     }

//     // Send the updated itinerary as a response
//     res
//       .status(200)
//       .json({ message: "Itinerary marked as inappropriate", itinerary });
//   } catch (error) {
//     // Handle any errors during the process
//     res.status(500).json({ error: error.message });
//   }
// };

const markItineraryInappropriate = async (req, res) => {
  const { id } = req.params; // Get the itinerary ID from request parameters

  try {
    // Find the itinerary by its ID and update the inappropriate field
    const itinerary = await Itinerary.Itinerary.findByIdAndUpdate(
      id,
      { inappropriate: true }, // Set the inappropriate field to true
      { new: true } // Return the updated document
    ).populate("guide");

    // If the itinerary is not found, send a 404 error response
    if (!itinerary) {
      return res.status(404).json({ error: "Itinerary not found" });
    }

    const guide = itinerary.guide;
    console.log(`notifications are ${guide.notifications}`);
    const notification = `Your Itinerary "${itinerary.name}"  has been flagged inappropriate`;
    guide.notifications.push(notification);
    console.log(`notifications are ${guide.notifications}`);
    await guide.save();
    console.log(`notifications are ${guide.notifications}`);

    // Check if guide information is complete
    if (!guide || !guide.email || !guide.name) {
      return res
        .status(400)
        .json({ error: "Guide information is incomplete." });
    }

    const guideEmail = "shodimatar@gmail.com";
    const emailMessage = `Dear ${guide.name}, we are sorry to inform you that your itinerary "${itinerary.name}" with ID ${itinerary.id} has been flagged inappropriate. Please review it and if you have any inquiries, don't hesitate to contact us.`;

    // Attempt to send the email
    try {
      await sendEmail(guideEmail, "Inappropriate Itinerary", emailMessage, "");
      console.log("Email sent to:", guideEmail);
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      // Continue marking the itinerary as inappropriate even if the email fails
    }

    // Send the updated itinerary as a response
    res
      .status(200)
      .json({ message: "Itinerary marked as inappropriate", itinerary });
  } catch (error) {
    // Handle any errors during the process
    res.status(500).json({ error: error.message });
  }
};

const markItineraryAppropriate = async (req, res) => {
  const { id } = req.params; // Get the itinerary ID from request parameters

  try {
    // Find the itinerary by its ID and update the inappropriate field
    const itinerary = await Itinerary.Itinerary.findByIdAndUpdate(
      id,
      { inappropriate: false }, // Set the inappropriate field to true
      { new: true } // Return the updated document
    ).populate("guide");

    // If the itinerary is not found, send a 404 error response
    if (!itinerary) {
      return res.status(404).json({ error: "Itinerary not found" });
    }

    res
      .status(200)
      .json({ message: "Itinerary marked as appropriate", itinerary });
  } catch (error) {
    // Handle any errors during the process
    res.status(500).json({ error: error.message });
  }
};

// Controller function to mark an activity as inappropriate
const markActivityInappropriate = async (req, res) => {
  const { id } = req.params; // Get the activity ID from request parameters

  try {
    // Find the itinerary by its ID and update the inappropriate field
    const activity = await Activity.findByIdAndUpdate(
      id,
      { inappropriate: true }, // Set the inappropriate field to true
      { new: true } // Return the updated document
    ).populate("Advertiser");

    // If the actvity is not found, send a 404 error response
    if (!activity) {
      return res.status(404).json({ error: "activity not found" });
    }
    const advertiser = activity.Advertiser;
    const notification = `Your Activity "${activity.Name}"  has been flagged inappropriate`;
    advertiser.notifications.push(notification);
    await advertiser.save();

    if (!advertiser || !advertiser.Email || !advertiser.Name) {
      return res
        .status(400)
        .json({ error: "advertiser information is incomplete." });
    }

    const advertiserEmail = "shodimatar@gmail.com";
    const emailMessage = `Dear ${advertiser.Name}, we are sorry to inform you that your itinerary "${activity.Name}" with ID ${activity._id} has been flagged inappropriate. Please review it and if you have any inquiries, don't hesitate to contact us.`;

    // Attempt to send the email
    try {
      await sendEmail(
        advertiserEmail,
        "Inappropriate Activity",
        emailMessage,
        ""
      );
      console.log("Email sent to:", advertiserEmail);
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      // Continue marking the itinerary as inappropriate even if the email fails
    }

    //Send the updated activity as a response
    res
      .status(200)
      .json({ message: "activity marked as inappropriate", activity });
  } catch (error) {
    // Handle any errors during the process
    res.status(500).json({ error: error.message });
  }
};

// Controller function to mark an activity as inappropriate
const markActivityAppropriate = async (req, res) => {
  const { id } = req.params; // Get the activity ID from request parameters

  try {
    // Find the itinerary by its ID and update the inappropriate field
    const activity = await Activity.findByIdAndUpdate(
      id,
      { inappropriate: false }, // Set the inappropriate field to true
      { new: true } // Return the updated document
    ).populate("Advertiser");

    // If the actvity is not found, send a 404 error response
    if (!activity) {
      return res.status(404).json({ error: "activity not found" });
    }

    res
      .status(200)
      .json({ message: "activity marked as appropriate", activity });
  } catch (error) {
    // Handle any errors during the process
    res.status(500).json({ error: error.message });
  }
};

const sendEmail = async (to, subject, text, html) => {
  try {
    // Create a transporter
    const transporter = nodemailer.createTransport({
      service: "gmail", // Use Gmail as the email service
      auth: {
        user: "watermelonglobe@gmail.com", // Replace with your Gmail address
        pass: "tzve vdjr usit evdu", // Use your generated Gmail app password here
      },
    });

    // Email options
    const mailOptions = {
      from: '"Watermelon Globe" <watermelonglobe@gmail.com>', // Sender's address
      to, // Recipient's email address
      subject, // Subject of the email
      text, // Plain text content
      html, // HTML content (optional)
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: ", info.response);
    return { success: true, message: "Email sent successfully!" };
  } catch (error) {
    console.error("Error sending email: ", error);
    return { success: false, message: "Failed to send email.", error };
  }
};

//create new transportation
const createTransportation = async (req, res) => {
  const { type, destination, price } = req.body;

  try {
    const transportaion = await Transportation.create({
      type,
      destination,
      price,
    });
    res.status(200).json(transportaion);
  } catch (error) {
    res.status(400).json({ error: error.mssg });
  }
};
//x

//   try {
//     const testAccount = await nodemailer.createTestAccount();

//     // Create a transporter
//     const transporter = nodemailer.createTransport({

//         host: "smtp.ethereal.email",
//         port: 587,
//         secure: false, // Use TLS
//         auth: {
//           user: testAccount.user, // Replace with generated user
//           pass: testAccount.pass, // Replace with generated password
//         },
//       });
//     console.log(transporter);

//     // Email options
//     const mailOptions = {
//       from: '"Watermelom Globe" <watermelonglobe@gmail.com>', // Sender's address
//       to,
//       subject, // Subject of the email
//       text, // Plain text content
//       html, // HTML content (optional)
//     };

//     // Send the email
//     const info = await transporter.sendMail(mailOptions);
//     console.log('Email sent: ', info.response);
//     return { success: true, message: 'Email sent successfully!' };
//   } catch (error) {
//     console.error('Error sending email: ', error);
//     return { success: false, message: 'Failed to send email.', error };
//   }
// };

const totalProductRevenue = async (req, res) => {
  try {
    const result = await Tourist.aggregate([
      { $unwind: "$orders" },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$orders.totalPrice" },
        },
      },
    ]);

    if (result.length === 0) {
      return res.status(200).json({
        message: "No orders found or all orders are pending/cancelled",
        totalRevenue: 0,
      });
    }

    const totalRevenue = result[0].totalRevenue;

    res.status(200).json({
      message: "Total product revenue calculated successfully",
      totalRevenue: totalRevenue.toFixed(2),
    });
  } catch (error) {
    console.error("Error calculating total product revenue:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Function to calculate total revenue from booked itinerary (10% of their price)
const totalItineraryRevenue = async (req, res) => {
  try {
    // Step 1: Retrieve all tourists and populate their booked itineraries
    const itinerary = await bookedItinerary.find({});

    // Step 2: Initialize total revenue
    let totalRevenue = 0;

    // Step 3: Loop through all tourists and their booked itineraries
    itinerary.forEach((itinerary) => {
      if (itinerary.totalPrice) {
        totalRevenue += itinerary.totalPrice * 0.1; // Taking 10% of the product price
      }
    });

    // Step 5: Send the total revenue as a response
    res.status(200).json({
      message: "Total revenue calculated successfully",
      totalRevenue: totalRevenue.toFixed(2), // Round to 2 decimal places
    });
  } catch (error) {
    // Handle any errors
    res.status(500).json({
      message: "Error calculating total revenue",
      error: error.message,
    });
  }
};

module.exports = sendEmail;
// Function to calculate total revenue from booked activity (10% of their price)
const totalActivityRevenue = async (req, res) => {
  try {
    // Step 1: Retrieve all tourists and populate their booked activities
    const activity = await bookedActivity.find({});

    // Step 2: Initialize total revenue
    let totalRevenue = 0;

    // Step 3: Loop through all tourists and their booked acitivites
    activity.forEach((activity) => {
      if (activity.totalPrice) {
        totalRevenue += activity.totalPrice * 0.1; // Taking 10% of the product price
      }
    });

    // Step 5: Send the total revenue as a response
    res.status(200).json({
      message: "Total revenue calculated successfully",
      totalRevenue: totalRevenue.toFixed(2), // Round to 2 decimal places
    });
  } catch (error) {
    // Handle any errors
    res.status(500).json({
      message: "Error calculating total revenue",
      error: error.message,
    });
  }
};

const countTotalUsers = async (req, res) => {
  try {
    // Count the total number of users in each collection
    const touristCount = await Tourist.countDocuments();
    const sellerCount = await Seller.countDocuments();
    const advertiserCount = await Company.countDocuments();
    const tourGuideCount = await TourGuide.countDocuments();

    // Calculate the total users from all collections
    const totalUsers =
      touristCount + sellerCount + advertiserCount + tourGuideCount;

    // Send the response back to the client
    res.status(200).json({
      totalUsers,
      details: {
        tourists: touristCount,
        sellers: sellerCount,
        advertisers: advertiserCount,
        tourGuides: tourGuideCount,
      },
    });
  } catch (error) {
    console.error("Error counting users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getUsersPerMonth = async (req, res) => {
  try {
    const currentYear = new Date().getFullYear();

    // Helper function to count users created in each month
    const countUsersPerMonth = async (Model) => {
      const monthlyCounts = await Model.aggregate([
        {
          $match: {
            createdAt: {
              $gte: new Date(`${currentYear}-01-01`),
              $lt: new Date(`${currentYear + 1}-01-01`),
            },
          },
        },
        {
          $group: {
            _id: { $month: "$createdAt" },
            count: { $sum: 1 },
          },
        },
        {
          $sort: { _id: 1 }, // Sort by month
        },
      ]);
      return monthlyCounts;
    };

    // Get counts for each type of user
    const touristsCount = await countUsersPerMonth(Tourist);
    const sellersCount = await countUsersPerMonth(Seller);
    const advertisersCount = await countUsersPerMonth(Advertiser);
    const tourGuidesCount = await countUsersPerMonth(TourGuide);

    // Combine results from all user types
    const totalUsersPerMonth = Array.from({ length: 12 }, (_, i) => {
      const month = i + 1;
      const tourists =
        touristsCount.find((item) => item._id === month)?.count || 0;
      const sellers =
        sellersCount.find((item) => item._id === month)?.count || 0;
      const advertisers =
        advertisersCount.find((item) => item._id === month)?.count || 0;
      const tourGuides =
        tourGuidesCount.find((item) => item._id === month)?.count || 0;

      // Sum all user types for the total
      const totalUsers = tourists + sellers + advertisers + tourGuides;

      return {
        month,
        totalUsers, // Combine all into a single totalUsers field
      };
    });

    res.status(200).json(totalUsersPerMonth);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch user counts" });
  }
};

//PromoCode

const createPromoCode = async (req, res) => {
  const { code, discountValue } = req.body;
  try {
    const newCode = await PromoCode.create({ code, discountValue });

    res.status(200).json(newCode);
  } catch (error) {
    res.status(400).json({ error: error.mssg });
  }
};

const getAllPromoCodes = async (req, res) => {
  const allCodes = await PromoCode.find({}).sort({ createdAt: -1 });

  res.status(200).json(allCodes);
};

const deletePromoCode = async (req, res) => {
  const { id } = req.params;

  // Check if the ID is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such promocode" });
  }

  try {
    // Find and delete the seller, and return the deleted document
    const code = await PromoCode.findOneAndDelete({ _id: id });

    // Check if the seller exists
    if (!code) {
      return res.status(400).json({ error: "No such promo code" });
    }

    res.status(200).json({ message: "Promo code deleted successfully", code });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const filterRevenueByProduct = async (req, res) => {
  try {
    const { productId } = req.params; // Assuming the product ID is passed as a URL parameter

    // Step 1: Validate the product ID
    if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        message: "Invalid product ID",
      });
    }

    // Step 2: Find the product to ensure it exists and get its price and sales
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    // Step 3: Calculate the total revenue for this product
    const totalRevenue = product.sales * product.price;

    // Step 4: Send the response
    res.status(200).json({
      message: "Total revenue calculated successfully for the product",
      productName: product.name,
      totalSales: product.sales,
      price: product.price,
      totalRevenue: totalRevenue.toFixed(2), // Round to 2 decimal places
    });
  } catch (error) {
    // Handle any errors
    res.status(500).json({
      message: "Error calculating revenue for the product",
      error: error.message,
    });
  }
};

const getNotificationsAdmin = async (req, res) => {
  try {
    const admin = await Admin.findById("674a3e827a6dcbe8e5bd8069");
    if (!admin) {
      res.status(400).json({ message: "admin is not found" });
    } else {
      res.status(200).json(admin.notifications);
    }
  } catch {
    console.error("Error getting notifications:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getMonthlyRevenue = async (req, res) => {
  try {
    const currentYear = new Date().getFullYear();
    const startDate = new Date(currentYear, 0, 1); // January 1st of current year
    const endDate = new Date(currentYear, 11, 31); // December 31st of current year

    const productRevenue = await Tourist.aggregate([
      { $unwind: "$orders" },
      {
        $match: {
          "orders.orderDate": { $gte: startDate, $lte: endDate },
        },
      },
      {
        $group: {
          _id: { month: { $month: "$orders.orderDate" } },
          totalRevenue: { $sum: "$orders.totalPrice" },
        },
      },
      { $sort: { "_id.month": 1 } },
    ]);

    const itineraryRevenue = await bookedItinerary.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $group: {
          _id: { month: { $month: "$createdAt" } },
          totalRevenue: { $sum: { $multiply: ["$totalPrice", 0.1] } },
        },
      },
      { $sort: { "_id.month": 1 } },
    ]);

    const activityRevenue = await bookedActivity.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $group: {
          _id: { month: { $month: "$createdAt" } },
          totalRevenue: { $sum: { $multiply: ["$totalPrice", 0.1] } },
        },
      },
      { $sort: { "_id.month": 1 } },
    ]);

    // Initialize an array for all 12 months
    const monthlyRevenue = Array.from({ length: 12 }, (_, i) => ({
      month: i + 1,
      productRevenue: 0,
      itineraryRevenue: 0,
      activityRevenue: 0,
      totalRevenue: 0,
    }));

    // Combine revenues
    [
      { data: productRevenue, key: "productRevenue" },
      { data: itineraryRevenue, key: "itineraryRevenue" },
      { data: activityRevenue, key: "activityRevenue" },
    ].forEach(({ data, key }) => {
      data.forEach((entry) => {
        const monthIndex = entry._id.month - 1;
        monthlyRevenue[monthIndex][key] = entry.totalRevenue;
        monthlyRevenue[monthIndex].totalRevenue += entry.totalRevenue;
      });
    });

    // Add month names and format numbers
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const formattedRevenue = monthlyRevenue.map((item) => ({
      ...item,
      monthName: monthNames[item.month - 1],
      productRevenue: Number(item.productRevenue.toFixed(2)),
      itineraryRevenue: Number(item.itineraryRevenue.toFixed(2)),
      activityRevenue: Number(item.activityRevenue.toFixed(2)),
      totalRevenue: Number(item.totalRevenue.toFixed(2)),
    }));

    res.status(200).json({
      message: "Yearly revenue calculated successfully",
      year: currentYear,
      data: formattedRevenue,
    });
  } catch (error) {
    console.error("Error calculating yearly revenue:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const filterRevenueByDate = async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ message: "Date parameter is required" });
    }

    const selectedDate = new Date(date);
    const nextDate = new Date(selectedDate);
    nextDate.setDate(nextDate.getDate() + 1);

    const productRevenue = await Tourist.aggregate([
      { $unwind: "$orders" },
      {
        $match: {
          "orders.orderDate": { $gte: selectedDate, $lt: nextDate },
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$orders.totalPrice" },
        },
      },
    ]);

    const itineraryRevenue = await bookedItinerary.aggregate([
      {
        $match: {
          createdAt: { $gte: selectedDate, $lt: nextDate },
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: { $multiply: ["$totalPrice", 0.1] } },
        },
      },
    ]);

    const activityRevenue = await bookedActivity.aggregate([
      {
        $match: {
          createdAt: { $gte: selectedDate, $lt: nextDate },
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: { $multiply: ["$totalPrice", 0.1] } },
        },
      },
    ]);

    const totalProductRevenue =
      productRevenue.length > 0 ? productRevenue[0].totalRevenue : 0;
    const totalItineraryRevenue =
      itineraryRevenue.length > 0 ? itineraryRevenue[0].totalRevenue : 0;
    const totalActivityRevenue =
      activityRevenue.length > 0 ? activityRevenue[0].totalRevenue : 0;

    const totalRevenue =
      totalProductRevenue + totalItineraryRevenue + totalActivityRevenue;

    res.status(200).json({
      message: "Revenue filtered by date successfully",
      date: selectedDate.toISOString().split("T")[0],
      productRevenue: Number(totalProductRevenue.toFixed(2)),
      itineraryRevenue: Number(totalItineraryRevenue.toFixed(2)),
      activityRevenue: Number(totalActivityRevenue.toFixed(2)),
      totalRevenue: Number(totalRevenue.toFixed(2)),
    });
  } catch (error) {
    console.error("Error filtering revenue by date:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createAdmin,
  deleteAdmin,
  createGoverner,
  deleteGoverner,
  getAllPreferenceTag,
  getPreferenceTag,
  createPreferenceTag,
  deletePreferenceTag,
  updatePreferenceTag,
  getAllActivityCategory,
  getActivityCategory,
  createActivityCategory,
  deleteActivityCategory,
  updateActivityCategory,
  createProduct,
  getAllProducts,
  getAllProductIds,
  searchProductbyName,
  filterProduct,
  updateProduct,
  sortProducts,
  getAllAdmin,
  getAllGoverner,
  acceptAdvertiser,
  acceptSeller,
  acceptTourGuide,
  rejectAdvertiser,
  rejectSeller,
  rejectTourGuide,
  getAllComplaints,
  getComplaint,
  updateComplaint,
  replyComplaint,
  changePasswordAdmin,
  sortComplaintsByDate,
  filterComplaintsByStatus,
  getUploadedDocuments,
  deleteTourist,
  deleteGuide,
  deleteSeller,
  deleteCompany,
  getPassword,
  deleteAdmin,
  deleteGoverner,
  getQuantity,
  archiveProduct,
  unarchiveProduct,
  uploadPicture,
  markItineraryInappropriate,
  createTransportation,
  markActivityInappropriate,
  createTransportation,
  totalProductRevenue,
  totalItineraryRevenue,
  totalActivityRevenue,
  countTotalUsers,
  getUsersPerMonth,
  createPromoCode,
  getAllPromoCodes,
  deletePromoCode,
  filterRevenueByProduct,
  getNotificationsAdmin,
  getUploadedDocumentsByID,
  markActivityAppropriate,
  markItineraryAppropriate,
  getMonthlyRevenue,
  filterRevenueByDate,
  getAdmin,
};
