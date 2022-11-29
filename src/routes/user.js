// Include Packages
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


// Sign-Up
router.post('/signup', userController.signup);

// Login
router.post('/login', userController.login);

// Get User - GET
router.get('/', (req, res) => {
    res.send("Find or Create a User");
});

// Update User - PATCH



module.exports = router;