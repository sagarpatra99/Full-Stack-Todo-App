// const nodemailer = require("nodemailer");
import nodemailer from "nodemailer";

const transpoter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.GOOGLE_USER,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
    clientId: process.env.GOOGLE_CLIENT_ID,
  },
});

transpoter
  .verify()
  .then(() => {
    console.log("Email transpoter is ready to send emails");
  })
  .catch((err) => {
    console.log("Email transpoter verification failed:", err);
  });

export const sendEmail = async ({ to, subject, html, text }) => {
  const mailOptions = {
    from: process.env.GOOGLE_USER,
    to,
    subject,
    html,
    text,
  };

  const details = await transpoter.sendMail(mailOptions);
  console.log(`Email sent:`, details);
};
