// For oauth
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id); // This id is not the profileId, but the ine generated at our DB
});

// id will be the token we get
passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});

// Create a new google strategy and tell it how users will be logged
/*
passport.use -> tell passport what strategy to use
*/
passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback',
        proxy: true
    }, async (accessToken, refreshToken, profile, done) => {
        // Part where we say what to do with the information from Google's oAuth process
        console.log('accessToken: ',accessToken );
        console.log('refreshToken: ',refreshToken );
        console.log('profile: ',profile );  // This contains the id we want to store
        const existingUser = await User.findOne({ googleId: profile.id });
        if(existingUser)
        {
            // We already have a record with that Id, we do nothing
            return done(null, existingUser);
        }
        // Create new user
        const user = new User({ googleId: profile.id, name: profile.displayName }).save();
        done(null, user); 
    })
);