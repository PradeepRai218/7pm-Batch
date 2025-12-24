const nodemailer = require("nodemailer");

const transporter =  nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use true for port 465, false for port 587
    auth: {
      user: "pradeep.9997@gmail.com",
      pass: "sseydycwihxomdwy",
    },
  });

module.exports = { transporter };
