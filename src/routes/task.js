// Include Packages
const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');


// Post: Create a task
router.post('/', taskController.createTask);



// Get All Tasks
router.get('/all', taskController.returnAllTasks);

// Get User - GET
router.get('/:taskID', taskController.getTask);

// Update User - PATCH
router.put('/', taskController.updateTask)
// Get: Get a task


// Patch: Update a task

// Delete: Delete a Task

module.exports = router;