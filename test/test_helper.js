const { mongoose } = require('./test_require');



before(done => {
    mongoose.connect('mongodb://localhost/dutyApi_test', {useNewUrlParser: true});
    mongoose.connection
        .once('open', () => done())
        .on('error', err => console.warn('Warning',err));
});

beforeEach(async () => {
    const { users } = mongoose.connection.collections;
    await users.deleteMany({});
});