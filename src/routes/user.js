// Include Packages
const express = require('express');
const router = express.Router(); // Create Router
const userController = require('../controllers/userController'); // Import Controller


// Sign-Up
router.post('/signup', userController.signup);

// Login
router.post('/login', userController.login);

// Get User - GET
router.get('/', userController.returnUser);

// Update User - PATCH
// TODO - Add support for Updating User

// Get List of Tasks
router.get('/:username/tasks', userController.returnUserTaskList);

// Get List of Users
router.get('/all', userController.returnAllUsers);


// Export Router
module.exports = router;