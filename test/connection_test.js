const { request, app, assert, mongoose } = require('./test_require');

describe('The express app', () => {
    xit('successfully runs on port 3000', async () => {
        const res = await request(app).get('/');
        assert(res.body.hello === 'world');
    });
});