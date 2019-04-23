const mongoose = require('mongoose');
const request = require('supertest');
const assert = require('assert');

const app = require('../app');

describe('The express app', () => {
    xit('successfully runs on port 3000', done => {
        request(app)
            .get('/')
            .end((err,res) => {
                assert(res.body.hello === 'world');
                done();
            });
    });
});