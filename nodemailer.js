const nodemailer = require("nodemailer");

// Налаштування транспортного засобу для відправки електронної пошти
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Функція для відправки електронного листа
const sendEmail = (email, subject, text) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: subject,
    text: text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

// Використання цієї функції для відправки сповіщень про нові товари
const notifySubscribers = async (newProduct) => {
  const subscribers = await Subscriber.find();
  subscribers.forEach((subscriber) => {
    sendEmail(
      subscriber.email,
      "New Product Alert",
      `We have a new product: ${newProduct.name} available now!`
    );
  });
};
