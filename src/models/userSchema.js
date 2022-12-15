// This file defines the User Model for MongoDB - User Schema

// Import packages
const mongoose = require('mongoose');


// Create Schema
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


// Connect Schema to collection in a model
const User = mongoose.model('user', UserSchema);


// Export Model
module.exports ={ User };