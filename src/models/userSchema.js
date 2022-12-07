// This file defines the User Model for MongoDB - User Schema

// Import packages
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        maxlength: 200
    },
    name: {
        type: String,
        required: true,
        maxlength: 200
    },
    password: {
        type: String,
        required: true,
        maxlength: 200
    },
    subteam: {
        type: Object,
        required: true,
    },
    grade: {
        type: Number,
    },
    tasks: {
        type: Array,
        required: true,
    },
    admin: {
        type: Boolean,
        required: true,
    }
},  {timestamps: true });

// TODO
// Add admin status field
const User = mongoose.model('user', UserSchema)

module.exports ={ User };