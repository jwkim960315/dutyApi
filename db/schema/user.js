const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Sub-Documents required
const NameSchema = require('./subDocuments/name');


const UserSchema = new Schema({
    name: {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        }
    },
    dutyDates: [{
        type: Date,
        default: []
    }],
    company: {
        type: String,
        required: true
    },
    ets: Date,
    dutyType: {
        type: String,
        required: true
    }
});

const User = mongoose.model('users',UserSchema);

module.exports = User;