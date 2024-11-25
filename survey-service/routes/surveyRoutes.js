const express = require('express');
const { submitSurvey, getAllSurveys, getUserSurvey } = require('../controllers/surveyController');
const validateSurvey = require('../validations/surveyValidation');
const validateAuthorization = require('../validations/authorizationValidation');
const router = express.Router();

router.post('/submit', validateAuthorization, validateSurvey, submitSurvey);
router.get('/user-survey', validateAuthorization, getUserSurvey);
router.get('/all-surveys', getAllSurveys);

module.exports = router;
