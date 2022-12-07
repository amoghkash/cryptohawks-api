// Include Packages
const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');


// Post: Create a task
router.post('/', taskController.createTask);

// Login

// Get User - GET
router.get('/:taskID', taskController.getTask);

// Update User - PATCH

// Get: Get a task


// Patch: Update a task

// Delete: Delete a Task

module.exports = router;