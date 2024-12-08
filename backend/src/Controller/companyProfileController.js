const CompanyProfile = require("../Models/companyProfileModel");
const CompanyProfileModel = require("../Models/companyProfileModel");
const ActivityBooking = require("../Models/activityBookingModel");
const Activity = require("../Models/activityModel");
const mongoose = require("mongoose");

const frontendAdvertiserTable = async (req, res) => {
  try {
    // Fetch only sellers with 'accepted' status from the database
    const sellers = await CompanyProfileModel.find(
      { status: "accepted" },
      "Name Email status"
    );

    // Format the data
    const formattedData = sellers.map((seller) => ({
      id: seller._id,
      name: seller.Name,
      email: seller.Email,
      status: seller.status,
    }));

    // Send the response
    res.status(200).json(formattedData);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error fetching advertiser" });
  }
};
const frontendPendingAdvertiserTable = async (req, res) => {
  try {
    // Fetch only sellers with 'pending' status from the database
    const sellers = await CompanyProfileModel.find(
      { status: "pending" },
      "Name Email status"
    );

    // Format the data
    const formattedData = sellers.map((seller) => ({
      id: seller._id,
      name: seller.Name,
      email: seller.Email,
      status: seller.status,
    }));

    // Send the response
    res.status(200).json(formattedData);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error fetching pending advertiser" });
  }
};
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
const getAllProfiles = async (req, res) => {
  try {
    // Fetch all profiles from the database
    const profiles = await CompanyProfileModel.find({});

    // If no profiles are found
    if (!profiles || profiles.length === 0) {
      return res.status(404).json({ message: "No profiles found" });
    }

    // Send the profiles in the response
    res.status(200).json(profiles);
  } catch (error) {
    console.error("Error fetching company profiles:", error.message);

    // Send error response
    res.status(500).json({
      message: "Error fetching company profiles",
      error: error.message,
    });
  }
};

const getProfiles = async (req, res) => {
  const { id } = req.params; // Extract the profile ID if provided

  try {
    // If an ID is provided, fetch the specific profile
    if (id) {
      const profile = await CompanyProfileModel.findById(id);

      if (!profile) {
        // Handle case where profile is not found
        return res.status(404).json({ message: "Profile not found" });
      }

      console.log("Fetching profile with ID:", id);
      return res.status(200).json(profile);
    }

    // If no ID is provided, fetch all profiles
    const profiles = await CompanyProfileModel.find({});
    console.log("Fetching all profiles.");
    return res.status(200).json(profiles);
  } catch (error) {
    // Log and handle errors
    console.error("Error fetching company profiles:", error);
    return res.status(500).json({
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
    const advertiser = await CompanyProfileModel.findById(id);

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

const getSalesReport = async (req, res) => {
  const { advertiserId } = req.params;
  try {
    const advertiser = await CompanyProfileModel.findById(advertiserId);
    if (!advertiser) {
      return res
        .status(404)
        .json({ success: false, message: "Advertiser not found" });
    }

    const activities = await Activity.find({ Advertiser: advertiserId });
    const activityIds = activities.map((activity) => activity._id);

    const bookings = await ActivityBooking.find({
      activity: { $in: activityIds },
      status: "confirmed",
      paymentStatus: "paid",
    }).populate("activity");

    const report = activities.map((activity) => {
      const activityBookings = bookings.filter((booking) =>
        booking.activity._id.equals(activity._id)
      );
      const totalRevenue = activityBookings.reduce(
        (sum, booking) => sum + activity.Price,
        0
      );
      return {
        activityName: activity.Name,
        totalRevenue,
        bookingCount: activityBookings.length,
      };
    });

    const totalRevenue = report.reduce(
      (sum, item) => sum + item.totalRevenue,
      0
    );
    const totalBookings = report.reduce(
      (sum, item) => sum + item.bookingCount,
      0
    );

    res.status(200).json({
      success: true,
      data: { totalRevenue, totalBookings, breakdown: report },
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching sales report" });
  }
};
const getNotificationsAdvertiser = async (req, res) => {
  const { id } = req.params;
  try {
    const adverstiser = await CompanyProfileModel.findById(id);
    if (!adverstiser) {
      res.status(400).json({ message: "adverstiser is not found" });
    } else {
      res.status(200).json(adverstiser.notifications);
    }
  } catch {
    console.error("Error getting notifications:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteProfile = async (req, res) => {
  const { id } = req.params;

  // Check if the ID is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such seller" });
  }

  try {
    // Find and delete the seller, and return the deleted document
    const seller = await CompanyProfileModel.findOneAndDelete({ _id: id });

    // Check if the seller exists
    if (!seller) {
      return res.status(400).json({ error: "No such CompanyProfileModel" });
    }

    res
      .status(200)
      .json({ message: "CompanyProfileModel deleted successfully", seller });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// GET: Fetch a company profile by ID
const getCompanyProfileById = async (req, res) => {
  const { id } = req.params; // Extract ID from URL parameters

  try {
    // Find the company profile by ID
    const companyProfile = await CompanyProfile.findById(id);

    // Check if the document exists
    if (!companyProfile) {
      return res.status(404).json({ message: "Company profile not found" });
    }

    // Return the found company profile
    res.status(200).json(companyProfile);
  } catch (error) {
    console.error("Error fetching company profile by ID:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
  // GET: Fetch a company profile by ID
  const getCompanyProfileById = async (req, res) => {
    const { id } = req.params; // Extract ID from URL parameters

    try {
      // Find the company profile by ID
      const companyProfile = await CompanyProfile.findById(id);

      // Check if the document exists
      if (!companyProfile) {
        return res.status(404).json({ message: "Company profile not found" });
      }

      // Return the found company profile
      res.status(200).json(companyProfile);
    } catch (error) {
      console.error("Error fetching company profile by ID:", error.message);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
};

// Function to calculate total revenue from booked itineraries filtered by guide ID (10% of their price)
const ActivityRevenue = async (req, res) => {
  try {
    const { advertiserId } = req.params; // Assuming the guideId is passed as a parameter

    // Step 1: Retrieve all child itineraries (booked itineraries)
    const bookedActivities = await ActivityBooking.find({});

    // Step 2: Initialize total revenue
    let totalRevenue = 0;

    // Step 3: Loop through all child itineraries and check if the associated itinerary has the guideId
    for (const bookedActivity of bookedActivities) {
      // Fetch the parent itinerary (itinerary model)
      const activity = await Activity.findById(bookedActivity.activity);

      // Check if the guide of the itinerary matches the provided guideId
      if (activity && activity.Advertiser.toString() === advertiserId) {
        if (bookedActivity.totalPrice) {
          // Add 10% of the total price for this child itinerary to the total revenue
          totalRevenue += bookedActivity.totalPrice * 0.1;
        }
      }
    }

    // Step 4: Send the total revenue as a response
    res.status(200).json({
      message: "Total revenue calculated successfully for the tour guide",
      totalRevenue: totalRevenue.toFixed(2), // Round to 2 decimal places
    });
  } catch (error) {
    // Handle any errors
    res.status(500).json({
      message: "Error calculating total revenue for the tour guide",
      error: error.message,
    });
  }
};


const advertiserMonthlyRevenue = async (req, res) => {
  try {
    const { advertiserId } = req.params;
    const currentYear = new Date().getFullYear();
    const startDate = new Date(currentYear, 0, 1);
    const endDate = new Date(currentYear, 11, 31);

    if (!advertiserId) {
      return res.status(400).json({ message: "Advertiser ID is required" });
    }

    // Aggregate activity revenue for the current year
    const activityRevenue = await ActivityBooking.aggregate([
      {
        $lookup: {
          from: 'activities',
          localField: 'activity',
          foreignField: '_id',
          as: 'parentActivity'
        }
      },
      { $unwind: '$parentActivity' },
      {
        $match: {
          'parentActivity.Advertiser': new mongoose.Types.ObjectId(advertiserId),
          'createdAt': { $gte: startDate, $lte: endDate },
        }
      },
      {
        $group: {
          _id: { month: { $month: '$createdAt' } },
          totalRevenue: {
            $sum: { $multiply: ['$totalPrice', 0.1] } // Assuming 10% commission
          },
          bookingsCount: { $sum: 1 }
        }
      },
      { $sort: { '_id.month': 1 } }
    ]);

    // Initialize monthly revenue array
    const monthlyRevenue = Array.from({ length: 12 }, (_, i) => ({
      month: i + 1,
      totalRevenue: 0,
      bookingsCount: 0
    }));

    // Populate actual data
    activityRevenue.forEach(entry => {
      const monthIndex = entry._id.month - 1;
      monthlyRevenue[monthIndex].totalRevenue = entry.totalRevenue;
      monthlyRevenue[monthIndex].bookingsCount = entry.bookingsCount;
    });

    // Add month names and format numbers
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    const formattedRevenue = monthlyRevenue.map(item => ({
      ...item,
      monthName: monthNames[item.month - 1],
      totalRevenue: Number(item.totalRevenue.toFixed(2))
    }));

    // Calculate yearly totals
    const yearlyTotals = formattedRevenue.reduce((acc, month) => {
      acc.totalRevenue += month.totalRevenue;
      acc.totalBookings += month.bookingsCount;
      return acc;
    }, { totalRevenue: 0, totalBookings: 0 });

    // Send response
    res.status(200).json({
      message: "Yearly activity revenue calculated successfully for the advertiser",
      year: currentYear,
      advertiserId,
      data: formattedRevenue,
      yearlyTotals: {
        totalRevenue: Number(yearlyTotals.totalRevenue.toFixed(2)),
        totalBookings: yearlyTotals.totalBookings
      }
    });

  } catch (error) {
    console.error("Error calculating monthly activity revenue:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const filterRevenueByDateAdvertiser = async (req, res) => {
  try {
    const { date } = req.query;
    const { advertiserId } = req.params; // advertiserId passed as a route parameter

    if (!date) {
      return res.status(400).json({ message: "Date parameter is required" });
    }

    if (!advertiserId) {
      return res.status(400).json({ message: "Advertiser ID is required" });
    }

    const selectedDate = new Date(date);
    const nextDate = new Date(selectedDate);
    nextDate.setDate(nextDate.getDate() + 1);

    const activityRevenue = await ActivityBooking.aggregate([
      {
        $lookup: {
          from: "activities",
          localField: "activity",
          foreignField: "_id",
          as: "parentActivity"
        }
      },
      { $unwind: "$parentActivity" },
      {
        $match: {
          "parentActivity.Advertiser": new mongoose.Types.ObjectId(advertiserId),
          "createdAt": { $gte: selectedDate, $lt: nextDate },
        }
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: { $multiply: ["$totalPrice", 0.1] } }, // Calculate 10% of the total price
          bookingsCount: { $sum: 1 }
        }
      }
    ]);

    const totalActivityRevenue = activityRevenue.length > 0 ? activityRevenue[0].totalRevenue : 0;
    const bookingsCount = activityRevenue.length > 0 ? activityRevenue[0].bookingsCount : 0;

    res.status(200).json({
      message: "Revenue filtered by date successfully for the advertiser",
      date: selectedDate.toISOString().split("T")[0],
      activityRevenue: Number(totalActivityRevenue.toFixed(2)),
      bookingsCount: bookingsCount,
      totalRevenue: Number(totalActivityRevenue.toFixed(2))
    });
  } catch (error) {
    console.error("Error filtering revenue by date for advertiser:", error);
    res.status(500).json({ message: "Server error", error: error.message });
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
  getSalesReport,
  getNotificationsAdvertiser,
  frontendPendingAdvertiserTable,
  frontendAdvertiserTable,
  deleteProfile,
  getAllProfiles,
  getCompanyProfileById,
  ActivityRevenue,
  advertiserMonthlyRevenue,
  filterRevenueByDateAdvertiser
};
