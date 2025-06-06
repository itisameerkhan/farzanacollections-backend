import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'collectionsfarzana@gmail.com',
    pass: 'aoio rsjb limh hbkd' // use app password if Gmail
  }
});

const sendOtpEmail = async (to, otp) => {
  await transporter.sendMail({
    from: 'collectionsfarzana@gmail.com',
    to,
    subject: 'Your OTP Code',
    text: `Your OTP code is: ${otp}. It expires in 5 minutes.`
  });
};

export default sendOtpEmail;