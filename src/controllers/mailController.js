const e = require('express');
const sendMail = require('../services/mailService');
const userServices = require('../services/userService');
exports.sendMail = async (req, res) => { 
    try {
        const { to, subject, name } = req.body;
        const user = await userServices.getUserByEmail(to);
        if (!user) {
            userServices.createUser({ email: to, name: name }); 
            await sendMail(to, subject, name);
            res.status(200).json({ message: 'Email sent' }); 
        } 
        else {
            res.status(400).json({ message: 'User already exists' }); 
        }
    }
    catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Error sending email' });
    }
}