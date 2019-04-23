const mongoose = require('mongoose');



before(done => {
    mongoose.connect('mongodb://localhost/dutyApi_test', {useNewUrlParser: true});
    mongoose.connection
        .once('open', () => done())
        .on('error', err => console.warn('Warning',err));
});

beforeEach(done => {
    const { users } = mongoose.connection.collections;
    users.drop()
        .then(() => done());
});