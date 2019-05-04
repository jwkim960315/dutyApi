const passport = require('passport');

module.exports = app => {
    // Google Auth
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
    }));

    app.get('/auth/google/callback',
        passport.authenticate('google', { failureRedirect: '/login' }),
        (req,res) => {
            res.redirect('/createUser');
    });

    app.get('/api/logout', (req,res) => {
        req.logout();
        res.send(req.user);
    });

    app.get('/api/current_user', (req,res) => {
        res.send(req.user);
    });
};