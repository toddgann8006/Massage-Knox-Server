const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    rewards: {
        type: Array,
        required: true,
        default: []
    },
    newuser: {
        type: Array,
        required: true,
        default: []
    }
});

module.exports = mongoose.model('User', userSchema);