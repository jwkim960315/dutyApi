const User = require('../db/schema/user');
const moment = require('moment');

module.exports = {
    greeting(req,res) {
        res.send({ hello: 'world'});
    },

    async getUsers(req,res) {
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getYear();
        const lastDayOfCurrentMonth = new Date().
        const firstDateOfCurrentMonth = new Date(`${currentYear}-${currentMonth}-01`);
        const lastDateOfCurrentMonth = new Date(``)
        User.find({ dutyDates: { $gte: currentMonth , $lte: currentMonth }})
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