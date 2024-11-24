const User = require('../models/User');
const transporter = require('../config/email');
const config = require(`../config/env/${process.env.NODE_ENV}.json`)

const sendEmail = (email, subject, text) => {
    const mailOptions = {
        from: config.google.googleEmail,
        to: email,
        subject,
        text,
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
};

// Controller to handle login redirection and email notifications
const handleLogin = async (req, res) => {
    try {
        const user = await User.findOne({ googleId: req.user.googleId });

        if (!user.surveyCompleted) {
            sendEmail(user.email, 'Welcome!', 'Thanks for joining! Please complete the survey.');
            return res.redirect('/survey');
        } else {
            sendEmail(user.email, 'Welcome back!', 'You have successfully logged in.');
            return res.redirect('/dashboard');
        }
    } catch (error) {
        res.status(500).json({ error: 'Server error during login.' });
    }
};

const handleLogout = (req, res) => {
    const email = req.user.email;
    req.logout();
    sendEmail(email, 'Logout Successful', 'You have successfully logged out.');
    res.redirect('/');
};

module.exports = { handleLogin, handleLogout };
