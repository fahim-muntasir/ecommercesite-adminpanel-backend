const nodemailer = require("nodemailer");

const sendMail = (req, res, next) => {
  const OTP = Math.floor(Math.floor(Math.random() * 9990) + 1000);

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // hostname
    secure: false, // use SSL
    port: 25, // port for secure SMTP
    auth: {
      user: process.env.APP_EMAIL,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailoption = {
    from: process.env.APP_EMAIL,
    to: req.body.userEmail,
    subject: "Verify you email address.",
    text: `This is your OTP: ${OTP}`,
  };

  transporter.sendMail(mailoption, function (error, info) {
    if (error) {
      console.log(error);
      res.send(error);
    } else {
      console.log("Email sent: " + info.response);
      req.otp = OTP;
      next();
    }
  });
};

module.exports = sendMail;
