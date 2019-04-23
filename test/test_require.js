const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const moment = require('moment');

const app = require('../app');
const User = require('../db/schema/user');

// Seedable user data
const testUserData = {
    name: {
        firstName: 'Joe',
        lastName: 'Kim'
    },
    dutyDates: [new Date('2019-04-15')],
    company: '사단본중',
    ets: new Date('2019-06-24'),
    dutyType: '인사과당직'
};

const testUser = new User(testUserData);

module.exports = {
    moment,
    mongoose,
    assert,
    request,
    app,
    User,
    testUser,
    testUserData
};