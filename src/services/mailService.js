require('dotenv').config();
const nodemailer = require('nodemailer');
const { mailOptions } = require('../config/mailConfig');
const transporter = nodemailer.createTransport(mailOptions);
const generateEmailTemplate = (name) => {
    return `
        <h1>Xin chào, ${name}!</h1>
        <p>Cảm ơn bạn đã đăng ký. Chúng tôi rất vui mừng chào đón bạn.</p>
        <br>
        <footer>Chào mừng bạn đến với Gooup1</footer>
    `;
};
const sendMail = (to, subject, name) => { 
    const mailOptions = {
        from: process.env.EMAIL,
        to: to,
        subject: subject,
        html: generateEmailTemplate(name)
    }
    
    return transporter.sendMail(mailOptions);
}
module.exports = sendMail;