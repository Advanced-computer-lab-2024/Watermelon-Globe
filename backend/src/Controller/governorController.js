const governorModel = require("../Models/tourismGovernorModel");
const siteModel = require("../Models/tourismSiteModel");
const { default: mongoose } = require("mongoose");
const Tag = require("../Models/tagModel");
// const createSite = async (req, res) => {
//   const{id}=req.params;
//   const {
//     name,
//     description,
//     pictures,
//     location,
//     openingHours,
//     ticketPrices,
//     tag,

//   } = req.body;
//   try {
//     const governor = governorModel.findById(id);
//     const site = await siteModel.create({
//       name,
//       description,
//       pictures,
//       location,
//       openingHours,
//       ticketPrices,
//       tag,
//       tourismGovernor:id,
//     });
//     governor.tourismSite.push(site._id);
//     await governorModel.save();
//     res.status(200).json(site);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// Get Tag by ID
const getTagById = async (req, res) => {
  const { id } = req.params;
  try {
    const tag = await Tag.findById(id);
    if (!tag) {
      return res.status(404).json({ message: "Tag not found" });
    }
    res.status(200).json(tag);
  } catch (error) {
    console.error("Error fetching tag:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
// Delete Tag
const deleteTag = async (req, res) => {
  try {
    const { id } = req.params; // Get the tag ID from the request parameters

    // Find and delete the tag by its ID
    const deletedTag = await Tag.findByIdAndDelete(id);

    if (!deletedTag) {
      return res.status(404).json({ message: "Tag not found" });
    }

    res
      .status(200)
      .json({ message: "Tag deleted successfully", tag: deletedTag });
  } catch (error) {
    console.error("Error deleting tag:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
// Edit Tag
const editTag = async (req, res) => {
  const { id } = req.params;
  const { type, historicPeriod } = req.body;
  try {
    const tag = await Tag.findById(id);
    if (!tag) {
      return res.status(404).json({ message: "Tag not found" });
    }

    // Update fields if provided
    if (type) tag.type = type;
    if (historicPeriod) tag.historicPeriod = historicPeriod;

    await tag.save();
    res.status(200).json(tag);
  } catch (error) {
    console.error("Error editing tag:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get All Tags
const getAllTags = async (req, res) => {
  try {
    const tags = await Tag.find(); // Fetch all tags
    res.status(200).json(tags);
  } catch (error) {
    console.error("Error fetching tags:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getAllGovernors = async (req, res) => {
  try {
    // Fetch all governors and populate their tourismSite references
    const governors = await governorModel.find().populate("tourismSite");

    // Return the governors as a JSON response
    res.status(200).json(governors);
  } catch (error) {
    console.error("Error fetching governors:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getGovernorById = async (req, res) => {
  try {
    // Extract the governor ID from the URL parameters
    const { id } = req.params;

    // Find the governor by ID and populate their tourismSite references
    const governor = await governorModel.findById(id).populate("tourismSite");

    // If no governor is found, return a 404 error
    if (!governor) {
      return res.status(404).json({ message: "Governor not found" });
    }

    // Return the governor as a JSON response
    res.status(200).json(governor);
  } catch (error) {
    console.error("Error fetching governor by ID:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const createSite = async (req, res) => {
  const { id } = req.params; // tourismGovernor ID
  const {
    name,
    description,
    pictures,
    location,
    openingHours,
    ticketPrices,
    tag,
  } = req.body;

  try {
    // Find the governor by ID and validate its existence
    const governor = await governorModel.findById(id);
    if (!governor) {
      return res.status(404).json({ error: "Tourism Governor not found" });
    }

    // Create the site
    const site = await siteModel.create({
      name,
      description,
      pictures,
      location,
      openingHours,
      ticketPrices,
      tag,
      tourismGovernor: id, // Link to the governor
    });

    // Add the site to the governor's tourismSite array
    governor.tourismSite.push(site._id);

    // Save the governor document
    await governor.save();

    // Return the newly created site
    res.status(200).json(site);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getSite = async (req, res) => {
  const { id } = req.params; // Extract the site ID from the request parameters

  // Validate if the provided ID is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid site ID" });
  }

  try {
    // Find the tourism site by ID and populate the tourismGovernor field
    const site = await siteModel.findById(id).populate("tourismGovernor");

    // If no site is found, return a 404 error
    if (!site) {
      return res.status(404).json({ message: "Site not found" });
    }

    // Return the found site as a response
    res.status(200).json(site);
  } catch (error) {
    // Handle any server errors
    res.status(500).json({ error: error.message });
  }
};

const getAllSites = async (req, res) => {
  const sites = await siteModel.find({}).sort({ createdAt: -1 });

  for (let index = 0; index < sites.length; index++) {
    const element = sites[index];
    //console.log(element.id);
  }
  res.status(200).json(sites);
};

const getMySites = async (req, res) => {
  const { id } = req.params; // Extract the Governor ID from the request parameters

  // Validate if the provided ID is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid governor ID" });
  }

  try {
    // Find the tourism site by ID and populate the tourismGovernor field
    const site = await siteModel.find({ tourismGovernor: id });

    // If no site is found, return a 404 error
    if (!site) {
      return res.status(404).json({ message: "Site not found" });
    }

    // Return the found site as a response
    res.status(200).json(site);
  } catch (error) {
    // Handle any server errors
    res.status(500).json({ error: error.message });
  }
};

const updateSite = async (req, res) => {
  const { id } = req.query; // Extracting the site ID from request parameters
  const { name, description, pictures, location, openingHours, ticketPrices } =
    req.body; // Extracting the updated fields from request body

  // Validate the site ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid site ID" });
  }

  try {
    // Find the site by ID and update it with the new details
    const updatedSite = await siteModel.findByIdAndUpdate(
      id,
      { name, description, pictures, location, openingHours, ticketPrices }, // Updating the fields
      { new: true, runValidators: true } // Option to return the updated site and run validation
    );

    // If the site is not found, return a 404
    if (!updatedSite) {
      return res.status(404).json({ message: "Tourism site not found" });
    }

    // Send the updated site as a response
    res.status(200).json(updatedSite);
  } catch (error) {
    // Handle any errors that occur
    res.status(500).json({ error: error.message });
  }
};

const deleteSite = async (req, res) => {
  const { id } = req.params; // Extract the site ID from the request parameters

  // Validate the site ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid site ID" });
  }

  try {
    // Attempt to find and delete the site by its ID
    const deletedSite = await siteModel.findByIdAndDelete(id);

    // If no site was found with the provided ID, return a 404 error
    if (!deletedSite) {
      return res.status(404).json({ message: "Tourism site not found" });
    }

    // Send a success message if the site was deleted
    res.status(200).json({ message: "Tourism site deleted successfully" });
  } catch (error) {
    // Handle any errors that occur
    res.status(500).json({ error: error.message });
  }
};

const filterByTags = async (req, res) => {
  try {
    const { id } = req.params; // Get the tag from the request parameters

    // Find itineraries (or sites) that include the tag
    const filteredSites = await siteModel
      .find({
        tag: id, // Assuming 'Tags' is an array of ObjectId references to the 'Tag' model
      })
      .populate("tag"); // Optionally populate the tags with details

    // Send back the filtered itineraries
    // if (filteredSites.length === 0) {
    //   return res.status(404).json({ message: 'No sites found with the specified tag' });
    // }

    return res.status(200).json(filteredSites);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error filtering sites by tag", error });
  }
};

const changePasswordGovernor = async (req, res) => {
  const { id } = req.params;
  const { oldPassword, newPassword, newPasswordConfirmed } = req.body; // Changed to req.body

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
    const governor = await governorModel.findOne({ _id: id });

    if (!governor) {
      return res.status(404).json({ error: "governor not found" }); // Tourist not found
    }

    // Compare the old password directly
    if (governor.password !== oldPassword) {
      return res.status(401).json({ error: "Wrong old password" }); // Use 401 for unauthorized access
    }

    // Check if new passwords match
    if (newPassword !== newPasswordConfirmed) {
      return res
        .status(400)
        .json({ error: "New password and confirmed password do not match" });
    }

    // Update the password directly
    governor.password = newPassword;
    await governor.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const getPassword = async (req, res) => {
  const { id } = req.query;
  console.log(id);
  try {
    const governor = await governorModel.findById(id);
    console.log(governor);
    if (!governor) {
      res.status(400).json({ message: "governor is not found" });
    } else {
      res.status(200).json(governor.password);
    }
  } catch {
    console.error("Error getting password:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const loginGovernor = async (req, res) => {
  const { Username, Password } = req.body;

  if (!Username || !Password) {
    return res
      .status(400)
      .json({ error: "Username and Password are required" });
  }

  try {
    // Find the governor by username
    const governor = await governorModel.findOne({ username: Username });

    if (!governor) {
      return res.status(404).json({ error: "Governor not found" });
    }

    // Check if the password matches
    if (governor.password !== Password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Return the governor's ID if login is successful
    res.status(200).json({ id: governor._id });
  } catch (error) {
    console.error("Error during governor login:", error);
    res.status(500).json({ error: "Server error" });
  }
};
const createTag = async (req, res) => {
  const { type, historicPeriod } = req.body;

  // Validate input data
  if (!type || !historicPeriod) {
    return res
      .status(400)
      .json({ message: "Type and historic period are required." });
  }

  try {
    // Create a new tag
    const newTag = new Tag({ type, historicPeriod });

    // Save the tag to the database
    const savedTag = await newTag.save();

    // Return the newly created tag in the response
    res.status(201).json(savedTag);
  } catch (error) {
    console.error("Error creating tag:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  createSite,
  getSite,
  getAllSites,
  updateSite,
  deleteSite,
  getMySites,
  filterByTags,
  changePasswordGovernor,
  getPassword,
  loginGovernor,
  getAllGovernors,
  getGovernorById,
  getAllTags,
  getTagById,
  editTag,
  deleteTag,
  createTag,
};
