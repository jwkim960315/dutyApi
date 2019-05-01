const User = require('../db/schema/user');
const moment = require('moment');

module.exports = {
    greeting(req,res) {
        res.send({ hello: 'world'});
    },

    async getUsers(req,res) {
        const { currentDateISOString } = req.query;
        const currentDate = moment(currentDateISOString);

        let firstDateOfMonth = moment(`${currentDate.year()}-${currentDate.format('MM')}-01`);
        let firstDateOfCalendar = (firstDateOfMonth.day() !== 0) ? firstDateOfMonth.day(0) : firstDateOfMonth;

        let lastDateOfMonth = moment(`${currentDate.year()}-${currentDate.format('MM')}-${currentDate.daysInMonth()}`);
        let lastDateOfCalendar = (lastDateOfMonth.day() !== 6) ? lastDateOfMonth.day(6) : lastDateOfMonth;

        const usersLst = await User.find({ dutyDates: { $gte: firstDateOfCalendar.toISOString(), $lte: lastDateOfCalendar.toISOString() }});

        const dutyDateUserDic = {};

        usersLst.forEach(user => {
            user.dutyDates.forEach(dutyDate => {
                dutyDateUserDic[`${moment(dutyDate).format('YYYY-MM-DD')}`] = user;
            });
        });

        res.send(dutyDateUserDic);
    },

    async createUser(req,res) {
        const { first_name, last_name, company, ets, dutyDates, dutyType } = req.body;
        const newUserData = {
            name: {
                firstName: first_name,
                lastName: last_name
            },
            company,
            ets: new Date(ets.replace(/\//g,'-')),
            dutyDates,
            dutyType
        };

        const newUser = await User.create(newUserData);
        res.send(newUserData);
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