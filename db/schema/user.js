const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Sub-Documents required
const NameSchema = require('./subDocuments/name');


const UserSchema = new Schema({
    name: NameSchema,
    dutyDates: [{
        type: Date,
        default: null
    }],
    company: String
});