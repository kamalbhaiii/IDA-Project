const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    googleId: { type: String, required: true, unique: true },
    displayName: { type: String },
    email: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    surveyCompleted: { type: Boolean, default: false }
});

module.exports = mongoose.model('User', UserSchema);