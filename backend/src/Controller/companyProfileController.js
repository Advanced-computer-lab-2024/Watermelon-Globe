const CompanyProfileModel = require('../Models/companyProfileModel');

const createProfile = async (req, res) => {
    try {
        const { Name, About, Hotline, Link } = req.body;

        const newCompanyProfile = new CompanyProfileModel({
            Name,
            About,
            Hotline,
            Link,
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

module.exports = { createProfile, getProfiles, updateProfile };
