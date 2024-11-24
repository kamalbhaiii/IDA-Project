const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');
require('dotenv').config()
const config = require(`./env/${process.env.NODE_ENV}.json`)

module.exports = (passport) => {
    passport.use(
        new GoogleStrategy(
            {
                clientID: config.google.googleClientId,
                clientSecret: config.google.googleClientSecret,
                callbackURL: `${config.app.apiUrl}/api/users/auth/google/callback`,
            },
            async (accessToken, refreshToken, profile, done) => {
                const newUser = { googleId: profile.id, displayName: profile.displayName, email: profile.emails[0].value };
                try {
                    let user = await User.findOne({ googleId: profile.id });
                    if (!user) user = await User.create(newUser);
                    done(null, user);
                } catch (error) {
                    done(error, null);
                }
            }
        )
    );
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser((id, done) => User.findById(id, (err, user) => done(err, user)));
};