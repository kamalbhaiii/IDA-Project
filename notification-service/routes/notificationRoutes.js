const express = require('express');
const { sendWelcomeEmail, sendLoginNotification, sendSurveyConfirmation } = require('../controllers/notificationController');
const router = express.Router();

router.post('/send-welcome', sendWelcomeEmail);
router.post('/send-login', sendLoginNotification);
router.post('/send-survey-confirmation', sendSurveyConfirmation);

module.exports = router;
