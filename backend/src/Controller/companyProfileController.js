const CompanyProfileModel = require("../Models/companyProfileModel");

const createProfile = async (req, res) => {
  try {
    const { Name, Email, Password } = req.body;

    const newCompanyProfile = new CompanyProfileModel({
      Name,
      Email,
      Password,
    });

    const savedProfile = await newCompanyProfile.save();

    res.status(201).json({
      message: "Company Profile created successfully",
      profile: savedProfile,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error creating profile",
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
        return res.status(404).json({ message: "Profile not found" });
      }
      res.status(200).json(profile);
    } else {
      const profiles = await CompanyProfileModel.find({});
      res.status(200).json(profiles);
    }
    console.log("Fetching profile with ID:", id);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching company profiles",
      error: error.message,
    });
  }
};

const getLastApprovedAdvertiser = async (req, res) => {
  try {
    const lastApprovedAdvertiser = await CompanyProfileModel.findOne({
      status: "accepted",
    })
      .sort({ updatedAt: -1 }) // Sort by latest update
      .exec();

    if (!lastApprovedAdvertiser) {
      return res.status(404).json({ message: "No approved advertiser found" });
    }

    res.status(200).json(lastApprovedAdvertiser);
  } catch (error) {
    console.error("Error fetching last approved advertiser:", error);
    res.status(500).json({
      message: "Error fetching last approved advertiser",
      error: error.message,
    });
  }
};

const approveAdvertiser = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedAdvertiser = await CompanyProfileModel.findByIdAndUpdate(
      id,
      { status: "accepted" },
      { new: true }
    ).exec();

    if (!updatedAdvertiser) {
      return res.status(404).json({ message: "Advertiser not found" });
    }

    res.status(200).json({
      message: "Advertiser approved successfully",
      profile: updatedAdvertiser,
    });
  } catch (error) {
    console.error("Error approving advertiser:", error);
    res.status(500).json({
      message: "Error approving advertiser",
      error: error.message,
    });
  }
};

const updateProfile = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedProfile = await CompanyProfileModel.findByIdAndUpdate(
      id,
      updates,
      { new: true }
    );
    if (!updatedProfile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.status(200).json({
      message: "Profile updated successfully",
      profile: updatedProfile,
    });
  } catch (error) {
    console.error("Error fetching profiles:", error);
    res.status(500).json({
      message: "Error fetching company profiles",
      error: error.message,
    });
  }
};

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
    return res
      .status(400)
      .json({ error: "New password confirmation is required" });
  }

  try {
    // const adverstiser = await CompanyProfileModel.findOne({ _id: id });
    const advertiser = await CompanyProfileModel.findById(id );

    if (!advertiser) {
      return res.status(404).json({ error: "advertiser not found" }); // Tourist not found
    }

    // Compare the old password directly
    if (advertiser.Password !== oldPassword) {
      return res.status(401).json({ error: "Wrong old password" }); // Use 401 for unauthorized access
    }

    // Check if new passwords match
    if (newPassword !== newPasswordConfirmed) {
      return res
        .status(400)
        .json({ error: "New password and confirmed password do not match" });
    }

    // Update the password directly
    advertiser.Password = newPassword;
    await advertiser.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const requestDeletionAdvertiser = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the advertiser by ID and update the deletionRequest to "Pending"
    const advertiser = await CompanyProfileModel.findByIdAndUpdate(
      id,
      { deletionRequest: "Pending" },
      { new: true } // Return the updated document
    );

    if (!advertiser) {
      return res.status(404).json({ message: "Advertiser not found" });
    }

    res.status(200).json({
      message: "Deletion request updated successfully",
    });
  } catch (error) {
    console.error("Error updating deletion request:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getPassword = async (req, res) => {
  const { id } = req.query;
  console.log(id);
  try {
    const advertiser = await CompanyProfileModel.findById(id);
    console.log(advertiser);
    if (!advertiser) {
      res.status(400).json({ message: "advertiser is not found" });
    } else {
      res.status(200).json(advertiser.Password);
    }
  } catch {
    console.error("Error getting password:", error);
    res.status(500).json({ message: "Server error" });
  }
};

//accept terms and conditions

const acceptTermsAndConditions = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedAdvertiser = await CompanyProfileModel.findByIdAndUpdate(
      id,
      { termsAndConditions: true },
      { new: true }
    );

    if (!updatedAdvertiser) {
      return res.status(404).json({ message: "Advertiser not found" });
    }
    res.status(200).json(updatedAdvertiser);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error updating terms and conditions: " + error.message });
  }
};


module.exports = {
  createProfile,
  getProfiles,
  getLastApprovedAdvertiser,
  approveAdvertiser,
  updateProfile,
  getPassword,
  changePasswordAdvertiser,
  requestDeletionAdvertiser,
  acceptTermsAndConditions,
};
