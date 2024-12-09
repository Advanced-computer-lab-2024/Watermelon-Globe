// // // controllers/otpController.js
// // const otpGenerator = require("otp-generator");
// // const OTP = require("../Models/otpModel");
// // const User = require("../Models/touristModel");

// // exports.sendOTP = async (req, res) => {
// //   try {
// //     const { email } = req.body;
// //     // Check if user is already present
// //     const checkUserPresent = await User.findOne({ email });
// //     // If user found with provided email
// //     if (checkUserPresent) {
// //       return res.status(401).json({
// //         success: false,
// //         message: "User is already registered",
// //       });
// //     }
// //     let otp = otpGenerator.generate(6, {
// //       upperCaseAlphabets: false,
// //       lowerCaseAlphabets: false,
// //       specialChars: false,
// //     });
// //     let result = await OTP.findOne({ otp: otp });
// //     while (result) {
// //       otp = otpGenerator.generate(6, {
// //         upperCaseAlphabets: false,
// //       });
// //       result = await OTP.findOne({ otp: otp });
// //     }
// //     const otpPayload = { email, otp };
// //     const otpBody = await OTP.create(otpPayload);
// //     res.status(200).json({
// //       success: true,
// //       message: "OTP sent successfully",
// //       otp,
// //     });
// //   } catch (error) {
// //     console.log(error.message);
// //     return res.status(500).json({ success: false, error: error.message });
// //   }
// // };

// const otpGenerator = require("otp-generator");
// const OTP = require("../Models/otpModel");
// const User = require("../Models/touristModel");

// exports.sendOTP = async (req, res) => {
//   try {
//     const { email } = req.body;

//     // Check if the user is registered with the provided email
//     const checkUserPresent = await User.findOne({ email });
//     if (!checkUserPresent) {
//       return res.status(404).json({
//         success: false,
//         message: "No user found with this email",
//       });
//     }

//     // Generate a 6-digit OTP
//     let otp = otpGenerator.generate(6, {
//       upperCaseAlphabets: false,
//       lowerCaseAlphabets: false,
//       specialChars: false,
//     });

//     // Ensure the OTP is unique
//     let result = await OTP.findOne({ otp });
//     while (result) {
//       otp = otpGenerator.generate(6, {
//         upperCaseAlphabets: false,
//       });
//       result = await OTP.findOne({ otp });
//     }

//     // Create OTP payload
//     const otpPayload = {
//       email,
//       otp,
//       type: "passwordReset", // To distinguish it from other OTP types
//       expiresAt: Date.now() + 3600000, // 1 hour expiration time
//     };

//     // Store OTP in the database
//     await OTP.create(otpPayload);

//     // Send OTP via email (You should implement actual email sending here)
//     // Example: sendEmailToUser(email, otp);

//     res.status(200).json({
//       success: true,
//       message: "OTP sent successfully for password reset",
//       otp, // You might not want to send OTP back in the response for security reasons
//     });
//   } catch (error) {
//     console.log(error.message);
//     return res.status(500).json({ success: false, error: error.message });
//   }
// };

// Reset password after OTP verification
exports.resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    // Check if the OTP exists and is valid
    const otpRecord = await OTP.findOne({ email, otp, type: "passwordReset" });
    if (!otpRecord) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // Check if OTP has expired
    if (otpRecord.expiresAt < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired",
      });
    }

    // Find the user by email
    const userRecord = await user.findOne({ email });
    if (!userRecord) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Hash the new password
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(newPassword, 10);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error hashing password: " + error.message,
      });
    }

    // Update the user's password in the database
    userRecord.password = hashedPassword;
    await userRecord.save();

    // Optionally, delete OTP record after successful reset
    await OTP.deleteOne({ email, otp, type: "passwordReset" });

    res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Error resetting password: " + error.message,
    });
  }
};
