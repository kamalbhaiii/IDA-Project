const mongoose = require('mongoose');
require('dotenv').config()
const config = require('./env/' + process.env.NODE_ENV + '.json')

const connectDB = async () => {
    try {
        await mongoose.connect(config.db.dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

module.exports = connectDB;