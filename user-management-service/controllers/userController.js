const User = require('../models/User');
const { createToken, verifyToken } = require('../config/jwt');
const config = require(`../config/env/${process.env.NODE_ENV}.json`)
const ejs = require("ejs")
const axios = require("axios");
const path = require('path')

// Controller to handle login redirection and email notifications
const handleLogin = async (req, res) => {
    try {
        console.log(req.user)
        const user = await User.findOne({ googleId: req.user.googleId });

        const token = await createToken(req.user)

        if (!user) {
            await User.create({
                googleId: req.user.googleId,
                displayName: req.user.displayName,
                email: req.user.email,
                bearerToken: token
            })

            const templatePath = path.join('__dirname', '..', 'templates', 'newUser.ejs')

            const htmlContent = await ejs.renderFile(templatePath, { name: req.user.displayName })
            try {
                axios.post(`${config.app.notificationApiUrl}/send`, {
                    email: req.user.email,
                    htmlContent: htmlContent,
                    subject: `Welcome onboard! ${req.user.displayName}`
                })
            }
            catch (err) {
                console.log(err)
            }
            return res.redirect(`${config.app.appUrl}/survey?token=${token}`)
        } else {
            if (!user.bearerToken) {
                await User.findOneAndUpdate({ googleId: req.user.googleId }, { bearerToken: token })
                if (!user.surveyCompleted) {
                    const templatePath = path.join('__dirname', '..', 'templates', 'newUser.ejs')

                    const htmlContent = await ejs.renderFile(templatePath, { name: req.user.displayName })
                    try {
                        axios.post(`${config.app.notificationApiUrl}/send`, {
                            email: req.user.email,
                            subject: `Welcome back ${req.user.displayName}`,
                            htmlContent: htmlContent
                        })
                    }
                    catch (err) {
                        console.log(err)
                    }
                    return res.redirect(`${config.app.appUrl}/survey?token=${token}`)
                }
                else {
                    const templatePath = path.join('__dirname', '..', 'templates', 'userSurveyCompleted.ejs')

                    const htmlContent = await ejs.renderFile(templatePath, { name: req.user.displayName })
                    try {
                        axios.post(`${config.app.notificationApiUrl}/send`, {
                            email: req.user.email,
                            subject: `Welcome back ${req.user.displayName}`,
                            htmlContent: htmlContent
                        })
                    }
                    catch (err) {
                        console.log(err)
                    }
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
            const templatePath = path.join('__dirname', '..', 'templates', 'userLoggedOut.ejs')

            const htmlContent = await ejs.renderFile(templatePath, { name: user.displayName })
            try {
                axios.post(`${config.app.notificationApiUrl}/send`, {
                    email: user.email,
                    subject: `Log out success`,
                    htmlContent: htmlContent
                })
            }
            catch (err) {
                console.log(err)
            }
            return res.redirect(`${config.app.appUrl}/logout`);
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
