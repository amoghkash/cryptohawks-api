// Import Packages & Modules
const { User } = require('../models/userSchema');
const mongoose = require('mongoose');
const { changeCollection } = require('./connectDB') ;


// Function Name: getUserFromDB
// Function Description: Gets User from database
// Function Params: Username
// Function Returns: User data as JSON object
// Function Throws: Returns null if user not found 
/* 
    Function Notes:
        - Has to be an asyncronous function
        - Must be used with await
        - Implemented in userController.js
*/
async function getUserFromDB(targetUser) {
    // Change Collection
    changeCollection('users');

    // Find User
    let user = await User.findOne({ username: targetUser });
    
    if (user) { // If user exists
        return user;
    } else { // If user doesn't exist
        return null;
    }
}
// TODO - Change Function Name


// Function Name: getAllUserFromDB
// Function Description: Gets a list of all usernames from database
// Function Params: None
// Function Returns: Array of usernames
// Function Throws: Returns null if usernames not found 
/* 
    Function Notes:
        - Has to be an asyncronous function
        - Must be used with await
        - Implemented in userController.js
*/
async function getAllUserFromDB() {
    
    // Change Collection
    changeCollection('users');
    
    // Get an array of unique usernames (which is all of them)
    let user = await User.distinct('username');
    
    if (user) { // If user array exists
        return user;
    } else {
        return null;
    }
}
// TODO - Change Function Name


// Function Name: addUserToDB
// Function Description: Adds User to database
// Function Param: request - get request information 
// Function Param: response - set response information
// Function Returns: True if user is created
// Function Returns: False if user exists
// Function Throws: Sets response status if user exists
/* 
    Function Notes:
        - Has to be an asyncronous function
        - Must be used with await
        - Implemented in userController.js
*/
async function addUserToDB(req, res) {
    // Change Collection
    changeCollection('users');

    // User inputted username
    inputUsername = req.body.username.trim();

    // Look for User
    let user = await User.findOne({ username: inputUsername }); // See if User exists
    
    
    if (user) { // User exists
        res.status(440); // User Already Exists, Response is set as 404
        return false;
    } else { // Create User
        // Create new user
        user = new User({
            username: inputUsername,
            name: req.body.name.trim(),
            password: req.body.password.trim(),
            subteam: req.body.subteam,
            tasks: [0],
            grade: req.body.grade[0].content,
            admin: req.body.admin
        });

        // Save User
        await user.save();
        //console.log('User Saved'); // For Debug
        return true;
    };
}
// TODO - Change Function Name
// TODO - Pass only res.body as parameter instead of all res
// TODO - Remove response param and set status of res in userController



// Function Name: addTaskToUser
// Function Description: Adds Task to User profile
// Function Param: targetUser - username
// Function Param: taskUID - ID of task that is being added
// Function Returns: Nothing
// Function Throws: Error if Error and Success if success
/* 
    Function Notes:
        - Has to be an asyncronous function
        - Must be used with await
        - Implemented in taskController.js
*/
async function addTaskToUser(targetUser, taskUID) {
    // Update User Task
    User.findOneAndUpdate(
    { username: targetUser}, 
    { $push: { tasks: taskUID  } }, // Push taskID to array
    function (error, success) {
            if (error) {
                console.log(error);
            } else {
                console.log(success);
            }
    });
}
// TODO - Change Function Name


// db_removeTask
// TODO - Create Function to remove task from user profile


// Export Functions
module.exports = { getUserFromDB, addUserToDB, getAllUserFromDB, addTaskToUser};



