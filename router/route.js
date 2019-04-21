const mongoose = require('mongoose');

module.exports = app => {
    // Home Page
    app.get('/',(req,res) => {
        res.send({ hello: 'world!'});
    });

    // Creating a user
    app.post('/api/users')

    // Assigning a duty
    app.post('/api/duties')
};