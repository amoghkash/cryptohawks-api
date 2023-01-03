// Include Packages
const express = require('express');
const router = express.Router(); // Create Router
const taskController = require('../controllers/taskController'); // Import Controller


// Create a task
router.post('/', taskController.createTask);

// Get All Tasks
router.get('/all', taskController.returnAllTasks);

// Get a Task
router.get('/:taskID', taskController.getTask);

// Update a task
router.put('/', taskController.updateTask);

// Delete a Task
router.delete('/:taskID', taskController.deleteTask);

// Export Router
module.exports = router;