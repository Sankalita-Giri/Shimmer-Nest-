const nodemailer = require('nodemailer');

// Configure the transporter using Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Sends an email using Nodemailer
 * @param {string} toEmail - The recipient's email address
 * @param {string} subject - The subject of the email
 * @param {string} htmlContent - The HTML body of the email
 */
const sendEmail = async (toEmail, subject, htmlContent) => {
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.warn("⚠️ Nodemailer skipping email: EMAIL_USER or EMAIL_PASS not set in .env");
      return;
    }

    const mailOptions = {
      from: `"ShimmerNest" <${process.env.EMAIL_USER}>`,
      to: toEmail,
      subject: subject,
      html: htmlContent,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to ${toEmail} | MessageId: ${info.messageId}`);
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
};

module.exports = sendEmail;
