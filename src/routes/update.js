const updateController = require('../controllers/updateController');
// Include Packages
const express = require('express');
const router = express.Router(); // Create Router

router.post('/', updateController.createUpdate)
router.get('/', updateController.getAllUpdates)

module.exports = router