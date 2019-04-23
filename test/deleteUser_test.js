const { app, request, assert, User, testUserData } = require('./test_require');

describe('Delete a user', () => {
    const testUser = new User(testUserData);

    it('by his id', async () => {
        console.log(testUser._id);
        await testUser.save();
        await request(app)
            .delete(`/api/users/${testUser._id}`);
        const queriedUser = await User.findOne({ _id: testUser._id });
        assert(queriedUser === null);
    });
});