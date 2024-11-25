const express = require('express');
const { sendEmail } = require('../controllers/notificationController');
const router = express.Router();

router.post('/send', sendEmail);

module.exports = router;
