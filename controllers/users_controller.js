const User = require('../db/schema/user');

module.exports = {
    greeting(req,res) {
        res.send({ hello: 'world'});
    },

    async createUser(req,res) {
        const newUserData = req.body;

        const newUser = User.create(newUserData);
        res.send(newUser);
    },

    async editUser(req,res) {
        const userId = req.params.id;
        const userUpdateInfo = req.body;

        const updatedUser = await User.findByIdAndUpdate(userId, userUpdateInfo, { new: true });
        res.send(updatedUser);
    },

    async deleteUser(req,res) {
        const userId = req.params.id;

        await User.findOneAndDelete({ _id: userId });
        res.send({ message: 'successfully deleted'});
    }
};