const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');
const mongoose = require('mongoose');
const app = express();

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
    console.log('access token', accessToken);
    console.log('refresh token', refreshToken);
    console.log('profile', profile);
    }
));

// Router required
const route = require('./router/route');

// Middlewares
app.use(express.json());

if (process.env.NODE_ENV !== 'test ' || undefined) {
    console.log(process.env.NODE_ENV);
    console.log('This is not a test!!!');
    mongoose.connect('mongodb://localhost/dutyApi', {useNewUrlParser: true});
}

route(app, passport);

module.exports = app;