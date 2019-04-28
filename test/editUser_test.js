const { assert, request, app, User, testUserData } = require('./test_require');

describe('Edit a user', () => {
    const testUser = new User(testUserData);

    xit('by adding a new duty date', async () => {
        await testUser.save();
        const res = await request(app)
            .put(`/api/users/${testUser._id}`)
            .send({ dutyDates: new Date('2019-04-13') });
        const updatedUser = res.body;
        console.log(updatedUser.dutyDates[0]);
        assert(updatedUser.dutyDates[0] === '2019-04-13T00:00:00.000Z');
    });
});