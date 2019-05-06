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
        let firstDateOfCalendar = (firstDateOfMonth.isoWeekday() !== 0) ? firstDateOfMonth.isoWeekday(0) : firstDateOfMonth;

        let lastDateOfMonth = moment(`${currentDate.year()}-${currentDate.format('MM')}-${currentDate.daysInMonth()}`);
        let lastDateOfCalendar = (lastDateOfMonth.isoWeekday() !== 6) ? lastDateOfMonth.isoWeekday(6) : lastDateOfMonth;
        console.log(firstDateOfCalendar.toISOString(true));
        console.log(lastDateOfCalendar.toISOString(true));
        const usersLstTest = await User.find({});
        const usersLst = await User.find({ dutyDates: { $gte: firstDateOfCalendar.toISOString(true), $lte: lastDateOfCalendar.toISOString(true) }});
        console.log(usersLstTest);
        console.log(usersLst);
        const dutyDateUserDic = {};

        usersLst.forEach(user => {
            user.dutyDates.forEach(dutyDate => {
                dutyDateUserDic[`${moment(dutyDate).format('YYYY-MM-DD')}`] = user;
            });
        });

        res.send(dutyDateUserDic);
    },

    async createUser(req,res) {
        console.log(req.user);
        if (!req.user) {
            res.send(null);
        }

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

        const newUser = await User.findByIdAndUpdate(req.user.id,newUserData);
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