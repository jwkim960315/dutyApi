const mongoose = require('mongoose');
const UsersController = require('../controllers/users_controller');

module.exports = app => {
    // Index Page
    app.get('/', UsersController.greeting);

    // Create a user
    app.post('/api/users', UsersController.createUser);

    // Edit a user
    app.put('/api/users/:id', UsersController.editUser);

    // Delete a user
    app.delete('/api/users/:id', UsersController.deleteUser);
};

