const nodemailer = require("nodemailer");
const Tourist = require("../Models/touristModel");
const PromoCode = require("../Models/promoCodes"); // Assuming your PromoCode model is in models/PromoCode.js

const generatePromoCode = async () => {
  const percentage = 30; // Fixed discount value (can be dynamic if needed)
  let code = Math.random().toString(36).substring(2, 8).toUpperCase(); // Generates a random string of 6 characters

  // Ensure the promo code is unique by checking the database
  let existingCode = await PromoCode.findOne({ code });

  // Regenerate the code if it already exists
  while (existingCode) {
    code = Math.random().toString(36).substring(2, 8).toUpperCase();
    existingCode = await PromoCode.findOne({ code });
  }

  // Create a new promo code document
  const newPromoCode = new PromoCode({
    code,
    discountValue: percentage, // Set the discount value
  });

  // Save the promo code to the database
  try {
    await newPromoCode.save();
    console.log(`Promo code generated: ${newPromoCode.code}`);
    return newPromoCode; // You can return the newly generated promo code if needed
  } catch (error) {
    console.error("Error saving promo code:", error);
    throw new Error("Error saving promo code");
  }
};

// Function to send email
const sendPromoEmail = async (user, promoCode) => {
  // Create a test account if you don't have real credentials
  //let testAccount = await nodemailer.createTestAccount();

  // Create a transporter
  const transporter = nodemailer.createTransport({
    service: "gmail", // Use Gmail as the email service
    auth: {
      user: "watermelonglobe@gmail.com", // Replace with your Gmail address
      pass: "tzve vdjr usit evdu", // Use your generated Gmail app password here
    },
  });

  // Send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Watermelon Globe" <watermelonglobe@gmail.com>', // sender address,
    to: user.email,
    subject: "Happy Birthday! Here's your special promo code",
    text: `Happy Birthday, ${user.username}! Here's your special promo code: ${promoCode}`,
    html: `<b>Happy Birthday, ${user.username}!</b><p>Here's your special promo code: <strong>${promoCode}</strong></p>`,
  });

  console.log("Message sent: %s", info.messageId);
};

// Function to check birthdays and send promo codes
const checkBirthdaysAndSendPromos = async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const users = await Tourist.find({
    $expr: {
      $and: [
        { $eq: [{ $month: "$dob" }, { $month: today }] },
        { $eq: [{ $dayOfMonth: "$dob" }, { $dayOfMonth: today }] },
        { $ne: [{ $year: "$dob" }, { $year: today }] },
      ],
    },
  });

  for (const user of users) {
    const promoCode = generatePromoCode();
    await sendPromoEmail(user, promoCode);

    user.lastPromoSent = today;
    await user.save();

    console.log(`Promo code sent to ${user.email}`);
  }

  module.exports = { checkBirthdaysAndSendPromos };
};
