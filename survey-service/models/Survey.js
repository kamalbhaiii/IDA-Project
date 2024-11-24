const mongoose = require('mongoose');

const SurveySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    isInternationalStudent: {
        type: Boolean,
        required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other', 'Prefer not to say'],
        required: true
    },
    ageGroup: {
        type: String,
        enum: ['Under 22', '22-25', '26-30', '31-35', 'Above 35'],
        required: true
    },
    fieldOfStudy: {
        type: String,
        required: true,
        minlength: 2
    },
    educationLevel: {
        type: String,
        enum: ['Bachelor’s Degree', 'Master’s Degree', 'Doctorate', 'Other'],
        required: true
    },
    germanProficiency: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced', 'Fluent'],
        required: true
    },
    currentlyEmployed: {
        type: Boolean,
        required: true
    },
    jobSearchDuration: {
        type: String,
        enum: ['Less than 1 month', '1-3 months', '3-6 months', 'More than 6 months', 'Still looking for a job'],
        required: true
    },
    jobSearchMethods: {
        type: [String],
        enum: ['Online job portals', 'University career services', 'Networking events', 'Social media platforms', 'Direct applications to companies', 'Other'],
        required: true
    },
    hasInternshipExperience: {
        type: Boolean,
        required: true
    },
    jobSearchChallenges: {
        type: [String],
        enum: ['Language barrier', 'Lack of work experience', 'Networking opportunities', 'Understanding the application process', 'Other'],
        required: true
    },
    networkingFrequency: {
        type: String,
        enum: ['Never', 'Rarely', 'Occasionally', 'Frequently'],
        required: true
    },
    networkingImportance: {
        type: String,
        enum: ['Not important', 'Somewhat important', 'Very important', 'Essential'],
        required: true
    },
    industryInterest: {
        type: String,
        required: true,
        minlength: 2
    },
    adviceForFutureStudents: {
        type: String,
        minlength: 10,
        maxlength: 1000
    }
}, { timestamps: true });

const Survey = mongoose.model('Survey', SurveySchema);

module.exports = Survey;
