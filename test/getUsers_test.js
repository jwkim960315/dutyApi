const { assert, request, app, mongoose, User, testUserData } = require('./test_require');

describe('Get users\' data', () => {
    const testUser = new User(testUserData);

    it('via accessing home page', async () => {
        await testUser.save();
        const { usersLst } = (await request(app)
            .get('/home')).body;
        assert(usersLst.length === 1);
        assert(usersLst[0].name.firstName === 'Joe');
    });
});