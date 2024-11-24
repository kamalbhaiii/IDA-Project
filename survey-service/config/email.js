const nodemailer = require('nodemailer');
const config = require(`./env/${process.env.NODE_ENV}.json`)

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: config.google.googleEmail,
        pass: config.google.googlePassword,
    },
});

transporter.verify((error, success) => {
    if (error) {
        console.error('Email configuration error:', error);
    } else {
        console.log('Email server is ready to take messages:', success);
    }
});

module.exports = transporter;
