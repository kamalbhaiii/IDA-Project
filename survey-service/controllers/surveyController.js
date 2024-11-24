const axios = require('axios');
const Survey = require('../models/Survey');
const User = require('../models/User');

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
        const userId = req.user.id; // Assuming `req.user.id` contains the authenticated user's ID

        // Check if the user has already completed the survey
        const existingSurvey = await Survey.findOne({ userId });
        if (existingSurvey) {
            return res.status(400).json({ message: 'You have already completed the survey.' });
        }

        // Create a new survey document
        const survey = new Survey({
            userId,
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

        // Save the survey to the database
        await survey.save();

        // Update the user document to mark the survey as completed
        await User.findByIdAndUpdate(userId, { surveyCompleted: true });

        return res.status(201).json({ message: 'Survey submitted successfully.' });
    } catch (error) {
        console.error('Error submitting survey:', error);
        res.status(500).json({ error: 'Server error during survey submission.' });
    }
};

// Fetch survey data for a specific user
const getUserSurvey = async (req, res) => {
    try {
        const survey = await Survey.findOne({ userId: req.user.id });
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