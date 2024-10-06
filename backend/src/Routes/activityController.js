const ActivityModel = require('../Models/Activity');

const createActivity = async (req, res) => {
    try {
        const newActivity = new ActivityModel(req.body);
        await newActivity.save();
        res.status(201).json({
            message: 'Activity created successfully',
            activity: newActivity
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error creating activity',
            error: error.message
        });
    }
};

const getActivities = async (req, res) => {
    try {
        const activities = await ActivityModel.find({});
        res.status(200).json(activities);
    } catch (error) {
        console.error(error);
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
            message: 'Activity deleted successfully', deletedActivity
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error deleting activity',
            error: error.message
        });
    }
};

module.exports = { createActivity, getActivities, getActivityById, updateActivity, deleteActivity};
