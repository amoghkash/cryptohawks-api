// This file defines the User Model for MongoDB - User Schema

// Import packages
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        maxlength: 1024
    },
    subteam: {
        type: String,
        required: true,
        maxlength: 1024
    },
    date_account_created: {
        type: Number,
        required: true,
        maxlength: 100
    }
});

// TODO
// Add Subteam
// Add account creation day
// Add last account sign in
// Add admin status field
const User = mongoose.model('user', UserSchema)

module.exports ={ User };