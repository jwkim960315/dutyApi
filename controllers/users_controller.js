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

        const usersLst = await User.find({ dutyDates: { $gte: firstDateOfCalendar.toISOString(true), $lte: lastDateOfCalendar.toISOString(true) }});

        const dutyDateUserDic = {};

        usersLst.forEach(user => {
            user.dutyDates.forEach(dutyDate => {
                dutyDateUserDic[`${moment(dutyDate).format('YYYY-MM-DD')}`] = user;
            });
        });

        res.send(dutyDateUserDic);
    },

    async createUser(req,res) {

        if (!req.user) {
            res.send(null);
        }

        let { firstName, lastName, company, dutyDates, ets, dutyType, addedDutyDatesNum, newDutyDates, dutyDatesDic } = req.body;

        dutyDates = dutyDates || [];

        Object.keys(dutyDatesDic).forEach(key => {
            dutyDates.push(new Date(`${dutyDatesDic[key]}`));
        });

        newDutyDates.forEach(newDutyDate => {
            if (newDutyDate.length !== 0) {
                dutyDates.push(new Date(`${newDutyDate}`));
            }
        });

        for (let i=0;i < addedDutyDatesNum; i++) {
            if (req.body[`newDutyDate${i}`]) {
                // console.log(req.body[`newDutyDate${i}`]);
                dutyDates.push(new Date(`${req.body[`newDutyDate${i}`]}`));
            }
        }

        const newUserData = {
            name: {
                firstName: firstName,
                lastName: lastName
            },
            company,
            ets: new Date(ets.replace(/\//g,'-')),
            dutyDates,
            dutyType
        };

        await User.findByIdAndUpdate(req.user.id,newUserData);
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
    },

    async deleteDutyDate(req, res) {
        const userId = req.params.id;
        let user = await User.findById(userId);
        let dutyDatesLst = user.dutyDates;

        dutyDatesLst = dutyDatesLst.filter(dutyDate => {
            return !moment(moment(dutyDate).format('YYYY/MM/DD')).isSame(moment(req.params.dutyDate).format('YYYY/MM/DD'));
        });

        user = await User.findOneAndUpdate({ _id: userId },{ dutyDates: dutyDatesLst }, { new: true });
        // user = await User.findOne({ _id: userId });
        res.send(user);
    },

    async getAllUsers(req,res) {
        let users = await User.find({});

        res.send(users);
    }
};