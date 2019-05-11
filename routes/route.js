const mongoose = require('mongoose');
const UsersController = require('../controllers/users_controller');

module.exports = app => {
    // Index Page
    app.get('/', UsersController.greeting);

    // Home Page
    app.get('/api/home', UsersController.getUsers);

    // Create a user
    app.post('/api/createUser', UsersController.createUser);

    // Edit a user
    app.put('/api/users/:id', UsersController.editUser);

    // Delete a user
    app.delete('/api/users/:id', UsersController.deleteUser);

    // Delete a duty date
    app.delete('/api/delete_dutyDate/:id/:dutyDate', UsersController.deleteDutyDate);
};

