// Include Packages
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


// Sign-Up
router.post('/signup', userController.signup);

// Login
router.post('/login', userController.login);

// Get User - GET
router.get('/', userController.returnUser);

// Update User - PATCH


// Get List of Tasks
router.get('/:username/tasks', userController.returnUserTaskList)

module.exports = router;