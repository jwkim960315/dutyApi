const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Router required
const route = require('./router/route');

// Middlewares
app.use(express.json());

if (process.env.NODE_ENV !== 'test') {
    mongoose.connect('mongodb://localhost/dutyApi');
}

route(app);

module.exports = app;