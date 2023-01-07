// This file defines the User Model for MongoDB - User Schema

// Import packages
const mongoose = require('mongoose');


// Create Schema
const UpdateSchema = new mongoose.Schema({
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
    assignedTo: {
        type: Array,
        required: true
    },
    postDate: {
        type: Date,
        required: true
    },
    createdBy:{
        type:String,
        required: true
    }
});
// TODO - Change "Assignee" to Owner or Responsible
// TODO - Add support for multiple assignee


// Connect Schema to collection in a model
const Update = mongoose.model('updates', UpdateSchema);


// Export Model
module.exports ={ Update };