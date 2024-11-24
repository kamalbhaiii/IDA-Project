const express = require('express');
const { submitSurvey, getAllSurveys, getUserSurvey } = require('../controllers/surveyController');
const validateSurvey = require('../validations/surveyValidation');
const router = express.Router();

router.post('/submit', validateSurvey, submitSurvey);
router.get('/user-survey', getUserSurvey);
router.get('/all-surveys', getAllSurveys);

module.exports = router;
