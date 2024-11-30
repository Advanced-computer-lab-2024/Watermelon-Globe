// const nodemailer = require("nodemailer");
// const Tourist = require("../Models/touristModel");

// // Function to generate a random promo code
// const generatePromoCode = () => {
//   const percentage = 30;
//   const code = Math.random().toString(36).substring(2, 6).toUpperCase();
//   return `${code}${percentage}`;
// };

// // Function to send email
// const sendPromoEmail = async (user, promoCode) => {
//   // Create a test account if you don't have real credentials
//   //let testAccount = await nodemailer.createTestAccount();

//   // Create a transporter using your email service credentials
//   let transporter = nodemailer.createTransport({
//     host: "watermelonglobe@gmail.com",
//     port: 587,
//     secure: false, // Use TLS
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//   });

//   // Send mail with defined transport object
//   let info = await transporter.sendMail({
//     from: '"Your Company" <noreply@example.com>',
//     to: user.email,
//     subject: "Happy Birthday! Here's your special promo code",
//     text: `Happy Birthday, ${user.username}! Here's your special promo code: ${promoCode}`,
//     html: `<b>Happy Birthday, ${user.username}!</b><p>Here's your special promo code: <strong>${promoCode}</strong></p>`,
//   });

//   console.log("Message sent: %s", info.messageId);
// };

// // Function to check birthdays and send promo codes
// const checkBirthdaysAndSendPromos = async () => {
//   const today = new Date();
//   today.setHours(0, 0, 0, 0);

//   const users = await Tourist.find({
//     $expr: {
//       $and: [
//         { $eq: [{ $month: "$dob" }, { $month: today }] },
//         { $eq: [{ $dayOfMonth: "$dob" }, { $dayOfMonth: today }] },
//         { $ne: [{ $year: "$dob" }, { $year: today }] },
//       ],
//     },
//   });

//   for (const user of users) {
//     const promoCode = generatePromoCode();
//     await sendPromoEmail(user, promoCode);

//     user.lastPromoSent = today;
//     await user.save();

//     console.log(`Promo code sent to ${user.email}`);
//   }
//   module.exports = { checkBirthdaysAndSendPromos };
// };
