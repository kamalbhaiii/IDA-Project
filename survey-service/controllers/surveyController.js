const axios = require('axios');
const Survey = require('../models/Survey');
const User = require('../models/User');
const { verifyToken } = require('../config/jwt');
const config = require('../config/env/development.json')
const path = require('path')
const ejs = require('ejs')

const submitSurvey = async (req, res) => {
    const {
        isInternationalStudent,
        gender,
        ageGroup,
        fieldOfStudy,
        educationLevel,
        germanProficiency,
        currentlyEmployed,
        jobSearchDuration,
        jobSearchMethods,
        hasInternshipExperience,
        jobSearchChallenges,
        networkingFrequency,
        networkingImportance,
        industryInterest,
        adviceForFutureStudents,
    } = req.body;

    try {
        const token = req.headers?.authorization.split(" ")[1];
        const { data } = await verifyToken(token)

        const existingUser = await User.findById(data._id)
        const existingSurvey = await Survey.findOne({ userId: data._id });

        if (existingUser && existingSurvey) {
            return res.status(403).json({ message: 'You have already completed the survey.' });
        }

        if (existingUser) {
            const survey = new Survey({
                userId: data._id,
                isInternationalStudent,
                gender,
                ageGroup,
                fieldOfStudy,
                educationLevel,
                germanProficiency,
                currentlyEmployed,
                jobSearchDuration,
                jobSearchMethods,
                hasInternshipExperience,
                jobSearchChallenges,
                networkingFrequency,
                networkingImportance,
                industryInterest,
                adviceForFutureStudents,
            });

            await survey.save();

            await User.findByIdAndUpdate(data._id, { surveyCompleted: true });

            const templatePath = path.join('__dirname', '..', 'templates', 'surveyCompleted.ejs')

            const htmlContent = await ejs.renderFile(templatePath, { name: existingUser.displayName })
            try {
                await axios.post(`${config.app.notificationApiUrl}/send`, {
                    email: existingUser.email,
                    subject: "Survey successfully completed.",
                    htmlContent: htmlContent
                })
            }
            catch (err) {
                console.log(err)
            }
            return res.status(201).json({ message: 'Survey submitted successfully.' });
        }
        else {
            return res.status(401).json({ message: "User doesn't exist." });
        }
    } catch (error) {
        console.error('Error submitting survey:', error);
        res.status(500).json({ error: 'Server error during survey submission.' });
    }
};

// Fetch survey data for a specific user
const getUserSurvey = async (req, res) => {
    const token = req.headers?.authorization.split(" ")[1]
    const { data } = await verifyToken(token)
    try {
        const survey = await Survey.findOne({ userId: data._id });
        if (!survey) {
            return res.status(404).json({ message: 'Survey not found.' });
        }
        res.status(200).json(survey);
    } catch (error) {
        console.error('Error fetching survey:', error);
        res.status(500).json({ error: 'Server error fetching survey data.' });
    }
};

// Fetch all survey responses (for admin use)
const getAllSurveys = async (req, res) => {
    try {
        const surveys = await Survey.find();
        res.status(200).json(surveys);
    } catch (error) {
        console.error('Error fetching surveys:', error);
        res.status(500).json({ error: 'Server error fetching surveys.' });
    }
};

module.exports = { submitSurvey, getUserSurvey, getAllSurveys };