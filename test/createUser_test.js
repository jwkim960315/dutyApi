const assert = require('assert');
const request = require('supertest');

const app = require('../app');

describe('Creating records', () => {
    it('saves a user to the database', done => {
        request(app)
            .post('/api/users')
            .send({
                name: {
                    firstName: 'Joe',
                    lastName: 'Kim'
                },
                company: '사단본중',
                ets: new Date(2019,6,24),
                dutyType: '인사과당직'
            })
            .end((err,res) => {
                done();
            });

    });
});