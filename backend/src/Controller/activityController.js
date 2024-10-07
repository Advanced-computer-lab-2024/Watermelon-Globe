const ActivityModel = require('../Models/Activity');
const Tag = require('../Models/tag');
const CompanyProfile = require('../Models/CompanyProfile'); // Adjust the path if necessary

const createTags = async (req, res) => {
    const tags = [
        { type: 'Monuments', historicPeriod: 'Ancient Egyptian' },
        { type: 'Museums', historicPeriod: 'Victorian Era' },
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
        const tags = await Tag.find();
        res.status(200).json(tags);
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
        const { Advertiser, tags, ...activityData } = req.body; // Expect userId in the request body

        // Validate Advertiser
        if (!Advertiser) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        // Find the user profile based on the user ID
        const userProfile = await CompanyProfile.findById(Advertiser);
        if (!userProfile) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if tags are provided
        if (!tags || tags.length === 0) {
            return res.status(400).json({ message: 'Tags are required' });
        }

        // Validate tag IDs
        const tagDocuments = await Tag.find({ _id: { $in: tags } });

        // Check if the number of found tags matches the number of requested tags
        if (tagDocuments.length !== tags.length) {
            return res.status(400).json({
                message: 'One or more tags were not found',
                missingTags: tags.filter(tag => 
                    !tagDocuments.some(doc => 
                        doc._id.toString() === tag
                    )
                )
            });
        }

        const newActivity = new ActivityModel({
            ...activityData,
            tags: tagDocuments.map(tag => tag._id),
            Advertiser: userProfile._id
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
            .populate('tags')
            .populate('Advertiser');
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
        // Populate related fields (tags and advertiser)
        const activity = await ActivityModel.findById(id)
            .populate('tags')
        if (!activity) {
            return res.status(404).json({ message: 'Activity not found' });
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
