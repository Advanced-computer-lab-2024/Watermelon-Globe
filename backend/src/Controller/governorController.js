const governorModel = require('../Models/tourismGovernorModel');
const siteModel = require('../Models/tourismSiteModel');
const { default: mongoose } = require('mongoose');



const createSite = async (req, res) => {

  const { name, description, pictures, location, openingHours, ticketPrices, tag, tourismGovernor } = req.body;
  try {
    const site = await siteModel.create(
      { name, description, pictures, location, openingHours, ticketPrices, tag, tourismGovernor });

    res.status(200).json(site)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
};

const getSite = async (req, res) => {
  const { id } = req.params; // Extract the site ID from the request parameters

  // Validate if the provided ID is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid site ID' });
  }

  try {
    // Find the tourism site by ID and populate the tourismGovernor field
    const site = await siteModel.findById(id).populate('tourismGovernor');

    // If no site is found, return a 404 error
    if (!site) {
      return res.status(404).json({ message: 'Site not found' });
    }

    // Return the found site as a response
    res.status(200).json(site);
  } catch (error) {
    // Handle any server errors
    res.status(500).json({ error: error.message });
  }
};

const getAllSites = async (req, res) => {
  const sites = await siteModel.find({}).sort({ createdAt: -1 })

  for (let index = 0; index < sites.length; index++) {
    const element = sites[index];
    //console.log(element.id);
  }
  res.status(200).json(sites)
};

const getMySites = async (req, res) => {
  const { governorID } = req.query; // Extract the Governor ID from the request parameters

  // Validate if the provided ID is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(governorID)) {
    return res.status(400).json({ error: 'Invalid governor ID' });
  }

  try {
    // Find the tourism site by ID and populate the tourismGovernor field
    const site = await siteModel.find({ tourismGovernor: governorID });

    // If no site is found, return a 404 error
    if (!site) {
      return res.status(404).json({ message: 'Site not found' });
    }

    // Return the found site as a response
    res.status(200).json(site);
  } catch (error) {
    // Handle any server errors
    res.status(500).json({ error: error.message });
  }
};

const updateSite = async (req, res) => {
  const { id } = req.params; // Extracting the site ID from request parameters
  const { name, description, pictures, location, openingHours, ticketPrices } = req.body; // Extracting the updated fields from request body

  // Validate the site ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid site ID' });
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
      return res.status(404).json({ message: 'Tourism site not found' });
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
    return res.status(400).json({ error: 'Invalid site ID' });
  }

  try {
    // Attempt to find and delete the site by its ID
    const deletedSite = await siteModel.findByIdAndDelete(id);

    // If no site was found with the provided ID, return a 404 error
    if (!deletedSite) {
      return res.status(404).json({ message: 'Tourism site not found' });
    }

    // Send a success message if the site was deleted
    res.status(200).json({ message: 'Tourism site deleted successfully' });
  } catch (error) {
    // Handle any errors that occur
    res.status(500).json({ error: error.message });
  }
};

const filterByTags = async (req, res) => {
  try {
    const { id } = req.params;  // Get the tag from the request parameters

    // Find itineraries (or sites) that include the tag
    const filteredSites = await siteModel.find({
      tag: id // Assuming 'Tags' is an array of ObjectId references to the 'Tag' model
    }).populate('tag'); // Optionally populate the tags with details

    // Send back the filtered itineraries
    // if (filteredSites.length === 0) {
    //   return res.status(404).json({ message: 'No sites found with the specified tag' });
    // }

    return res.status(200).json(filteredSites);
  } catch (error) {
    return res.status(500).json({ message: 'Error filtering sites by tag', error });
  }
};

module.exports = {createSite, getSite, getAllSites, updateSite, deleteSite, getMySites, filterByTags };