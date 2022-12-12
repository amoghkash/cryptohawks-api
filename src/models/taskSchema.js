// This file defines the User Model for MongoDB - User Schema

// Import packages
const { boolean } = require('joi');
const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    uid: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    assignee: {
        type: String,
    },
    isCompleted: {
        type: Boolean,
        required: true,
    },
    percentCompleted: {
        type: Number,
        required: true,
    },
    startDate: {
        type: Date,
    },
    endDate: {
        type: Date
    },
    type: {
        type: String,
        required: true,
    }
});

// TODO
// Add Subteam
// Add account creation day
// Add last account sign in
// Add admin status field
const Task = mongoose.model('tasks', TaskSchema)

module.exports ={ Task };