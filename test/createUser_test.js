const { app, request, assert, User, testUserData } = require('./test_require');

describe('Creating records', () => {
    it('saves a user to the database', async () => {
        await request(app)
            .post('/api/users')
            .send(testUserData);
        const joe = await User.findOne({ name: { firstName: 'Joe', lastName: 'Kim' }});
        assert(joe.name.firstName === 'Joe');
        assert(joe.name.lastName === 'Kim');
    });
});