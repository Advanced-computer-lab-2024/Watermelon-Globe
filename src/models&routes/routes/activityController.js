const ActivityModel = require('../Models/Activity');
const Tag = require('../Models/tag');
const CompanyProfile = require('../Models/CompanyProfile'); // Adjust the path if necessary

const createTags = async (req, res) => {
    const tags = [
        { type: 'Monuments', historicPeriod: 'Ancient Egyptian' },
        { type: 'Museums', historicPeriod: 'Victorian Era' },
        // Add other predefined tags as needed
    ];

    try {
        await Tag.insertMany(tags);
        res.status(201).json({ message: 'Tags created successfully' });
    } catch (error) {
        console.error('Error creating tags:', error);
        res.status(500).json({ message: 'Error creating tags', error: error.message });
    }
};

const getTags = async (req, res) => {
    try {
        const tags = await Tag.find(); // Fetch all tags from the database
        res.status(200).json(tags); // Send the tags in the response
    } catch (error) {
        console.error('Error fetching tags:', error);
        res.status(500).json({
            message: 'Error fetching tags',
            error: error.message
        });
    }
};

const createActivity = async (req, res) => {
    try {
        const { userId, Tags, ...activityData } = req.body; // Expect userId in the request body

        // Validate userId
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        // Find the user profile based on the user ID
        const userProfile = await CompanyProfile.findById(userId);

        if (!userProfile) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Find the tags based on the tag names in the request body
        const tagDocuments = await Tag.find({ type: { $in: Tags } });

        if (tagDocuments.length !== Tags.length) {
            return res.status(400).json({
                message: 'One or more tags were not found',
                missingTags: Tags.filter(tag => !tagDocuments.some(doc => doc.type === tag))
            });
        }

        const tagIds = tagDocuments.map(tag => tag._id);

        // Create a new activity with the tag ObjectIds and the advertiser's ID
        const newActivity = new ActivityModel({
            ...activityData,
            Tags: tagIds,
            Advertiser: userProfile._id // Use the ID of the found user
        });

        await newActivity.save();
        res.status(201).json({
            message: 'Activity created successfully',
            activity: newActivity
        });
    } catch (error) {
        console.error('Error creating activity:', error);
        res.status(500).json({
            message: 'Error creating activity',
            error: error.message
        });
    }
};

const getActivities = async (req, res) => {
    try {
        const activities = await ActivityModel.find({})
            .populate('Tags') // Populate the tags field with actual Tag data
            .populate('Advertiser'); // Populate the Advertiser field with the corresponding CompanyProfile data

        res.status(200).json(activities);
    } catch (error) {
        console.error('Error fetching activities:', error);
        res.status(500).json({
            message: 'Error fetching activities',
            error: error.message
        });
    }
};

const getActivityById = async (req, res) => {
    try {
        const { id } = req.params;
        const activity = await ActivityModel.findById(id);
        if (!activity) {
            return res.status(404).json({
                message: 'Activity not found'
            });
        }
        res.status(200).json(activity);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error fetching activity',
            error: error.message
        });
    }
};

const updateActivity = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedActivity = await ActivityModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedActivity) {
            return res.status(404).json({
                message: 'Activity not found'
            });
        }
        res.status(200).json({
            message: 'Activity updated successfully',
            activity: updatedActivity
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error updating activity',
            error: error.message
        });
    }
};

const deleteActivity = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedActivity = await ActivityModel.findByIdAndDelete(id);
        if (!deletedActivity) {
            return res.status(404).json({
                message: 'Activity not found'
            });
        }
        res.status(200).json({
            message: 'Activity deleted successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error deleting activity',
            error: error.message
        });
    }
};

module.exports = {createTags,getTags, createActivity, getActivities, getActivityById, updateActivity, deleteActivity};
