const User = require('../db/schema/user');

module.exports = {
    greeting(req,res) {
        res.send({ hello: 'world'});
    },

    createUser(req,res) {
        const newUserData = req.body;

        User.create(newUserData, (err,newUser) => {
            if (err) {
                console.log(err);
            }

            res.send('Successfully saved to the database');
        });
    }
};