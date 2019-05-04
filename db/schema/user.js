const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    googleId: {
        type: String,
        required: true
    },
    name: {
        firstName: String,
        lastName: String
    },
    dutyDates: [{
        type: Date,
        default: []
    }],
    company: String,
    ets: Date,
    dutyType: String
});

const User = mongoose.model('users',UserSchema);

module.exports = User;