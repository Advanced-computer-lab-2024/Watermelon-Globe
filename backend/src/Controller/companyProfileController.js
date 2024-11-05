const CompanyProfileModel = require('../Models/CompanyProfile');

const createProfile = async (req, res) => {
    try {
        const { Name, Email, Password } = req.body;

        const newCompanyProfile = new CompanyProfileModel({
            Name,
            Email,
            Password
        });

        const savedProfile = await newCompanyProfile.save();

        res.status(201).json({
            message: 'Company Profile created successfully',
            profile: savedProfile,  // This should contain _id
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error creating profile',
            error: error.message,
        });
    }
};


const getProfiles = async (req, res) => {
    const { id } = req.params;
    try {
        if (id) {
            const profile = await CompanyProfileModel.findById(id);
            if (!profile) {
                return res.status(404).json({ message: 'Profile not found' });
            }
            res.status(200).json(profile);
        } else {
            const profiles = await CompanyProfileModel.find({});
            res.status(200).json(profiles);
        }
        console.log('Fetching profile with ID:', id);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error fetching company profiles',
            error: error.message
        });
    }
};

const updateProfile = async (req, res) => {
    const {id} = req.params;
    const updates = req.body;

    try {
        const updatedProfile = await CompanyProfileModel.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedProfile) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        res.status(200).json({
            message: 'Profile updated successfully',
            profile: updatedProfile
        });
    } catch (error) {
        console.error("Error fetching profiles:", error);
        res.status(500).json({
            message: 'Error fetching company profiles',
            error: error.message
        });
    }
}

const changePasswordAdvertiser = async (req, res) => {
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
      return res.status(400).json({ error: "New password confirmation is required" });
    }
  
    try {
      const adverstiser = await CompanyProfileModel.findOne({ _id: id });
  
      if (!adverstiser) {
        return res.status(404).json({ error: "adverstiser not found" }); // Tourist not found
      }
  
      // Compare the old password directly
      if (adverstiser.Password !== oldPassword) {
        return res.status(401).json({ error: "Wrong old password" }); // Use 401 for unauthorized access
      }
  
      // Check if new passwords match
      if (newPassword !== newPasswordConfirmed) {
        return res.status(400).json({ error: "New password and confirmed password do not match" });
      }
  
      // Update the password directly
      adverstiser.Password = newPassword;
      await adverstiser.save();
  
      res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
      console.error("Error updating password:", error);
      res.status(500).json({ error: "Server error" });
    }
  };

module.exports = { createProfile, getProfiles, updateProfile,changePasswordAdvertiser };
