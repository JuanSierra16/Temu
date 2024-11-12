import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for port 465, false for port 587
    auth: {
      user: "temulabsoftware@gmail.com",
      pass: "svbf wvpb wzld uoxv",
    },
  });
  

export default transporter;