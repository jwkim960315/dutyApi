const { request, app, assert, mongoose } = require('./test_require');

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