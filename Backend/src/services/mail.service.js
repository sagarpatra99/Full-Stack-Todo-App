// import nodemailer from "nodemailer";
// // const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//   //   service: "gmail",
//   host: "smtp.gmail.com",
//   port: 465,
//   secure: true,
//   auth: {
//     type: "OAuth2",
//     user: process.env.GOOGLE_USER,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
//     clientId: process.env.GOOGLE_CLIENT_ID,
//   },
//   connectionTimeout: 10000,
// });

// transporter
//   .verify()
//   .then(() => {
//     console.log("Email transporter is ready to send emails");
//   })
//   .catch((err) => {
//     console.log("Email transporter verification failed:", err);
//   });

// export const sendEmail = async ({ to, subject, html, text }) => {
//   const mailOptions = {
//     from: process.env.GOOGLE_USER,
//     to,
//     subject,
//     html,
//     text,
//   };

//   const details = await transporter.sendMail(mailOptions);
//   console.log(`Email sent:`, details);
// };

import { Resend } from "resend";

const resend = new Resend("re_QzvNHKFa_BWPDkakH1xUReUJKNPKzC7HU");

export const sendEmail = async ({ to, subject, html }) => {
  try {
    const response = await resend.emails.send({
      from: "DO IT <onboarding@resend.dev>",
      to,
      subject,
      html,
    });

    console.log("Email sent:", response);

  } catch (error) {
    console.error("Email sending failed:", error);
  }
};