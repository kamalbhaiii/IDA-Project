const Joi = require('joi');

const surveyValidationSchema = Joi.object({
    isInternationalStudent: Joi.boolean().required(),
    gender: Joi.string()
        .valid('Male', 'Female', 'Other', 'Prefer not to say')
        .required(),
    ageGroup: Joi.string()
        .valid('Under 22', '22-25', '26-30', '31-35', 'Above 35')
        .required(),
    fieldOfStudy: Joi.string().min(2).required(),
    educationLevel: Joi.string()
        .valid('Bachelor’s Degree', 'Master’s Degree', 'Doctorate', 'Other')
        .required(),
    germanProficiency: Joi.string()
        .valid('Beginner', 'Intermediate', 'Advanced', 'Fluent')
        .required(),
    currentlyEmployed: Joi.boolean().required(),
    jobSearchDuration: Joi.string()
        .valid('Less than 1 month', '1-3 months', '3-6 months', 'More than 6 months', 'Still looking for a job')
        .required(),
    jobSearchMethods: Joi.array()
        .items(
            Joi.string().valid(
                'Online job portals',
                'University career services',
                'Networking events',
                'Social media platforms',
                'Direct applications to companies',
                'Other'
            )
        )
        .required(),
    hasInternshipExperience: Joi.boolean().required(),
    jobSearchChallenges: Joi.array()
        .items(
            Joi.string().valid(
                'Language barrier',
                'Lack of work experience',
                'Networking opportunities',
                'Understanding the application process',
                'Other'
            )
        )
        .required(),
    networkingFrequency: Joi.string()
        .valid('Never', 'Rarely', 'Occasionally', 'Frequently')
        .required(),
    networkingImportance: Joi.string()
        .valid('Not important', 'Somewhat important', 'Very important', 'Essential')
        .required(),
    industryInterest: Joi.string().min(2).required(),
    adviceForFutureStudents: Joi.string().min(10).max(1000).optional(),
});

const validateSurvey = (req, res, next) => {
    const { error } = surveyValidationSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

module.exports = validateSurvey;
