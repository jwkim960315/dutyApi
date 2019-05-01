const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const app = express();

passport.use(new GoogleStrategy());

// Router required
const route = require('./router/route');

// Middlewares
app.use(express.json());

if (process.env.NODE_ENV !== 'test ' || undefined) {
    console.log(process.env.NODE_ENV);
    console.log('This is not a test!!!');
    mongoose.connect('mongodb://localhost/dutyApi', {useNewUrlParser: true});
}

route(app);

module.exports = app;