const CompanyProfileModel = require('../Models/CompanyProfile');

const createProfile = async (req, res) => {
    try {
        const { Name, About, Hotline, Link } = req.body;
        const newCompanyProfile = new CompanyProfileModel({
            Name,
            About,
            Hotline,
            Link
        });
        await newCompanyProfile.save();
        res.status(201).json({
            message: 'Company Profile created successfully',
            profile: newCompanyProfile
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error creating profile',
            error: error.message
        });
    }
};

module.exports = { createProfile };
