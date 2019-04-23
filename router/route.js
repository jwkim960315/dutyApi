const mongoose = require('mongoose');
const UsersController = require('../controllers/users_controller');

module.exports = app => {
    // Home Page
    app.get('/',UsersController.greeting);

    // Creating a user
    app.post('/api/users',UsersController.createUser);

    // Assigning a duty
    // app.post('/api/duties',() => {});
};

