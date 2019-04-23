const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Router required
const route = require('./router/route');

// Middlewares
app.use(express.json());

if (process.env.NODE_ENV.trim() !== 'test') {
    console.log(process.env.NODE_ENV.length);
    console.log('This is not a test!!!');
    mongoose.connect('mongodb://localhost/dutyApi', {useNewUrlParser: true});
}

route(app);

module.exports = app;