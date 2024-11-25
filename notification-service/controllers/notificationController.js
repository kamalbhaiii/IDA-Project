const transporter = require('../config/email');

const sendEmail = async (req, res) => {
    const { email, subject, htmlContent } = req.body;
    try {
        await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: email,
            subject: subject,
            html: htmlContent
        });
        res.status(200).json({ message: 'Email sent successfully.' });
    } catch (error) {
        console.error('Error sending welcome email:', error);
        res.status(500).json({ error: 'Failed to send welcome email.' });
    }
};

module.exports = {
    sendEmail
};
