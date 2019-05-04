const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');
const app = express();

// Middlewares
app.use(express.json());
app.use(
    cookieSession({
        maxAge: 30*24*60*60*1000,
        keys: [keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());

if (process.env.NODE_ENV !== 'test ' || undefined) {
    console.log(process.env.NODE_ENV);
    console.log('This is not a test!!!');
    mongoose.connect(keys.mongoURI, {useNewUrlParser: true});
}

require('./routes/route')(app);
require('./routes/authRoutes')(app);

module.exports = app;
