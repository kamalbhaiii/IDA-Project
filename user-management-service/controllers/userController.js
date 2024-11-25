const User = require('../models/User');
const transporter = require('../config/email');
const { createToken, verifyToken } = require('../config/jwt');
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

        const token = await createToken(req.user)

        if (!user) {
            await User.create({
                googleId: req.user.googleId,
                displayName: req.user.displayName,
                email: req.user.email,
                bearerToken: token
            })
            sendEmail(req.user.email, 'Welcome!', 'Thanks for joining! Please complete the survey.');
            return res.redirect(`${config.app.appUrl}/survey?token=${token}`)
        } else {
            if (!user.bearerToken) {
                await User.findOneAndUpdate({ googleId: req.user.googleId }, { bearerToken: token })
                if (!user.surveyCompleted) {
                    sendEmail(req.user.email, 'Welcome back!', 'You have successfully logged in. Please complete the survey.');
                    return res.redirect(`${config.app.appUrl}/survey?token=${token}`)
                }
                else {
                    sendEmail(req.user.email, 'Welcome back!', 'You have successfully logged in.');
                    return res.redirect(`${config.app.appUrl}/dashboard?token=${token}`)
                }
            }
            else {
                return res.status(400).json({ error: 'Session already active.' })
            }
        }
    } catch (error) {
        res.status(500).json({ error: 'Server error during login.' });
    }
};

const handleLogout = async (req, res) => {
    const token = req.headers?.authorization.split(" ")[1]
    const { data } = await verifyToken(token)

    if (data) {
        const user = await User.findById(data._id)
        if (user.bearerToken == token) {
            await User.findByIdAndUpdate(user._id, { bearerToken: "" })
            sendEmail(data.email, 'Thank You!', 'You have successfully logged out.');
            return res.redirect('/logout');
        }
        else {
            return res.status(401).json({ error: "Unauthorized." })
        }
    }
    else {
        return res.status(401).json({ error: "Unauthorized." })
    }
};

module.exports = { handleLogin, handleLogout };
