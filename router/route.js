const mongoose = require('mongoose');
const UsersController = require('../controllers/users_controller');

module.exports = (app, passport) => {
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

    // Google Auth
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
    }));

    app.get('/auth/google/callback', passport.authenticate('google'));

    // Naver Auth
    app.get('/auth/naver', passport.authenticate('naver', {
        scope: ['profile', 'email']
    }));


};

