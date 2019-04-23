const { mongoose } = require('./test_require');



before(done => {
    mongoose.connect('mongodb://localhost/dutyApi_test', {useNewUrlParser: true});
    mongoose.connection
        .once('open', () => done())
        .on('error', err => console.warn('Warning',err));
});

beforeEach(done => {
    const { users } = mongoose.connection.collections;
    users.deleteMany({}, (err) => {
        if (err) {
            console.log(err);
        }
        done();
    })
});