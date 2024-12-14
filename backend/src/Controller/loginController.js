// const TourGuide = require("../Models/tourGuideModel.js");
// const Admin = require("../Models/AdminModel");
// const Governer = require("../Models/tourismGovernorModel");
// const Tourist = require("../Models/touristModel");
// const Seller = require("../Models/SellerModel");
// const Advertiser = require("../Models/companyProfileModel");

// const loginUser = async (req, res) => {
//   const { email, password, userType } = req.body;

//   // Validate input fields
//   if (!email || !password || !userType) {
//     return res
//       .status(400)
//       .json({ error: "Email, password, and userType are required" });
//   }

//   // Map userType to models
//   const userTypeMap = {
//     tourguide: TourGuide,
//     admin: Admin,
//     governor: Governer,
//     tourist: Tourist,
//     seller: Seller,
//     advertiser: Advertiser,
//   };

//   // Check if the provided userType is valid
//   const Model = userTypeMap[userType.toLowerCase()];
//   if (!Model) {
//     return res.status(400).json({ error: "Invalid userType" });
//   }

//   try {
//     // Find the user by email
//     const user = await Model.findOne({ email });

//     // Check if user exists
//     if (!user) {
//       return res.status(404).json({ error: `${userType} not found` });
//     }

//     // Validate the password
//     if (user.password !== password) {
//       return res.status(401).json({ error: "Invalid credentials" });
//     }

//     // Login successful, return the user's ID
//     res
//       .status(200)
//       .json({ id: user._id, message: `${userType} login successful` });
//   } catch (error) {
//     console.error(`Error during ${userType} login:`, error);
//     res.status(500).json({ error: "Server error" });
//   }
// };

// module.exports = { loginUser };

const TourGuide = require("../Models/tourGuideModel.js");
const Admin = require("../Models/AdminModel");
const Governer = require("../Models/tourismGovernorModel");
const Tourist = require("../Models/touristModel");
const Seller = require("../Models/SellerModel");
const Advertiser = require("../Models/companyProfileModel");
const nodemailer = require("nodemailer");

// Create reusable transporter object using SMTP transport
const sendOtp = async (req, res) => {
  const { email, otp } = req.body;

  // Validation: Ensure email and OTP are provided
  if (!email || !otp) {
    return res.status(400).json({ error: "Email and OTP are required" });
  }

  // Create a transporter
  const transporter = nodemailer.createTransport({
    service: "gmail", // Use Gmail as the email service
    auth: {
      user: "watermelonglobe@gmail.com", // Replace with your Gmail address
      pass: "tzve vdjr usit evdu", // Use your generated Gmail app password here
    },
  });

  // Set up email options
  const mailOptions = {
    from: '"Watermelon Globe" <watermelonglobe@gmail.com>', // sender address
    to: email, // recipient address
    subject: "Your OTP for Forgot Password", // Subject line
    text: `Your OTP is: ${otp}`, // OTP text message
  };

  try {
    // Send OTP email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: ", info.response);

    // Send success response
    return res
      .status(200)
      .json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    // Log and return error
    console.error("Error sending email: ", error);
    return res.status(500).json({
      success: false,
      message: "Failed to send email.",
      error: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password, userType } = req.body;

  // Validate input fields
  if (!email || !password || !userType) {
    return res
      .status(400)
      .json({ error: "Email, password, and userType are required" });
  }

  // Map userType to models
  const userTypeMap = {
    tourguide: TourGuide,
    admin: Admin,
    governor: Governer,
    tourist: Tourist,
    seller: Seller,
    advertiser: Advertiser,
  };

  // Check if the provided userType is valid
  const Model = userTypeMap[userType.toLowerCase()];
  if (!Model) {
    return res.status(400).json({ error: "Invalid userType" });
  }

  try {
    console.log("Request received", req.body);
    // Dynamically find if the schema has 'email' or 'Email'
    const emailField = Object.keys(Model.schema.paths).includes("email")
      ? "email"
      : "Email";

    console.log(emailField);
    // Find the user by email
    const user = await Model.findOne({ [emailField]: email });

    console.log(user);
    // Check if user exists
    if (!user) {
      return res.status(404).json({ error: `${userType} not found` });
    }

    // Validate the password
    if (user.password !== password) {
      console.log(`Invalid credentials for ${email}`);
      //return res.status(401).json({ error: "Invalid credentials" });
    }

    // Login successful, return the user's ID
    res
      .status(200)
      .json({ id: user._id, message: `${userType} login successful` });
  } catch (error) {
    console.error(`Error during ${userType} login:`, error);
    res.status(500).json({ error: "Server error" });
  }
};

const loginUserOTP = async (req, res) => {
  const { email, userType } = req.body;

  // Validate input fields
  if (!email || !userType) {
    return res
      .status(400)
      .json({ error: "Email, password, and userType are required" });
  }

  // Map userType to models
  const userTypeMap = {
    tourguide: TourGuide,
    admin: Admin,
    governor: Governer,
    tourist: Tourist,
    seller: Seller,
    advertiser: Advertiser,
  };

  // Check if the provided userType is valid
  const Model = userTypeMap[userType.toLowerCase()];
  if (!Model) {
    return res.status(400).json({ error: "Invalid userType" });
  }

  try {
    console.log("Request received", req.body);
    // Dynamically find if the schema has 'email' or 'Email'
    const emailField = Object.keys(Model.schema.paths).includes("email")
      ? "email"
      : "Email";

    console.log(emailField);
    // Find the user by email
    const user = await Model.findOne({ [emailField]: email });

    console.log(user);
    // Check if user exists
    if (!user) {
      return res.status(404).json({ error: `${userType} not found` });
    }

    // Login successful, return the user's ID
    res
      .status(200)
      .json({ id: user._id, message: `${userType} login successful` });
  } catch (error) {
    console.error(`Error during ${userType} login:`, error);
    res.status(500).json({ error: "Server error" });
  }
};

const checkUserExistenceByEmailAndType = async (req, res) => {
  const { email } = req.body; // Email is still taken from the request body
  const { userType } = req.params; // UserType is now taken from route params
  console.log(userType);
  if (!email || !userType) {
    return res.status(400).json({ error: "Email and userType are required" });
  }

  try {
    let user;
    console.log(`Checking user existence for ${userType} and email ${email}`);

    // Use the userType to query the appropriate model
    switch (userType.toLowerCase()) {
      case "seller":
        user = await Seller.findOne({ Email: email });
        break;
      case "tourist":
        user = await Tourist.findOne({ email });
        break;
      case "admin":
        user = await Admin.findOne({ email });
        break;
      case "advertiser":
        user = await Advertiser.findOne({ Email: email });
        break;
      case "tourguide":
        user = await TourGuide.findOne({ email });
        break;
      case "governer":
        user = await Governer.findOne({ email });
        break;
      default:
        return res.status(400).json({ error: "Invalid user type" });
    }

    // Check if user exists
    if (user) {
      return res.status(200).json({ exists: true, message: "User exists" });
    } else {
      return res.status(404).json({ exists: false, message: "User not found" });
    }
  } catch (error) {
    console.error(`Error checking user existence:`, error);
    return res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  loginUser,
  sendOtp,
  checkUserExistenceByEmailAndType,
  loginUserOTP,
};
