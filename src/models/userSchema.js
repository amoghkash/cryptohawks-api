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
    }
});

const User = mongoose.model('user', UserSchema)

module.exports ={ User };