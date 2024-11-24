const transporter = require('../config/email');

const sendWelcomeEmail = async (req, res) => {
    const { email, name } = req.body;
    try {
        await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: email,
            subject: 'Welcome to the Job Search Platform!',
            text: `Hi ${name}, welcome! Thank you for joining us!`,
        });
        res.status(200).json({ message: 'Welcome email sent successfully.' });
    } catch (error) {
        console.error('Error sending welcome email:', error);
        res.status(500).json({ error: 'Failed to send welcome email.' });
    }
};

const sendLoginNotification = async (req, res) => {
    const { email } = req.body;
    try {
        await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: email,
            subject: 'Login Notification',
            text: 'You have successfully logged in to the Job Search Platform.',
        });
        res.status(200).json({ message: 'Login notification sent successfully.' });
    } catch (error) {
        console.error('Error sending login notification:', error);
        res.status(500).json({ error: 'Failed to send login notification.' });
    }
};

const sendSurveyConfirmation = async (req, res) => {
    const { email, name } = req.body;
    try {
        await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: email,
            subject: 'Survey Submission Confirmation',
            text: `Hi ${name}, thank you for participating in our survey.`,
        });
        res.status(200).json({ message: 'Survey confirmation email sent successfully.' });
    } catch (error) {
        console.error('Error sending survey confirmation:', error);
        res.status(500).json({ error: 'Failed to send survey confirmation email.' });
    }
};

module.exports = {
    sendWelcomeEmail,
    sendLoginNotification,
    sendSurveyConfirmation,
};
