// This file defines the User Model for MongoDB - User Schema

// Import packages
const mongoose = require('mongoose');


// Create Schema
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
// TODO - Change "Assignee" to Owner or Responsible
// TODO - Add support for multiple assignee


// Connect Schema to collection in a model
const Task = mongoose.model('tasks', TaskSchema);


// Export Model
module.exports ={ Task };