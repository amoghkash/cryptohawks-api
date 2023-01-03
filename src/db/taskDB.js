const { changeCollection } = require('./connectDB') 
const { Task } = require('../models/taskSchema')
const mongoose = require('mongoose');
const {getUserFromDB, addTaskToUser, db_removeTaskFromUser} = require('../db/userDB')

// Function Name: db_createTask
// Function Description: Creates Task in Task database
// Function Param: request - username
// Function Param: response
// Function Returns: Task Document
// Function Throws: None
/* 
    Function Notes:
        - Has to be an asyncronous function
        - Must be used with await
        - Implemented in taskController.js
*/
async function db_createTask(req, res) {
    // Change Collection
    changeCollection('tasks');
    
    // Get new UID for task
    const taskID = await getNextUID()

    // Declare Assignee
    let assigneeVar
    if(!req.body.assignee) { // If Assignee doesn't exist
        assigneeVar = "" // assignee is empty
    } else { // If Assignee exists
        assigneeVar= req.body.assignee // Assignee is set
    }

    // Create new task
    let task = new Task({
        title: req.body.title.trim(),
        uid: taskID,
        description: req.body.description.trim(),
        assignee: assigneeVar.trim(),
        isCompleted: false,
        percentCompleted: 0,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        type: req.body.type
    });
    
    // Save Task into Database
    await task.save()

    // Return Task
    return task
}
// TODO - Return Boolean
// TODO - Change param to only include req.body




// Function Name: db_getTask
// Function Description: Gets Task from Task database
// Function Param: taskUID - the id of task being requested
// Function Returns: Task Document
// Function Throws: None
/* 
    Function Notes:
        - Has to be an asyncronous function
        - Must be used with await
        - Implemented in taskController.js
*/
async function db_getTask(taskUID) {
    // Change Collection
    changeCollection('tasks');

    // Find task
    let task = await Task.findOne({ uid: taskUID });

    if(task==null) { // If task not found
    } else{ // If Task Found
        task = task.toJSON() // Convert task to JSON
        if (task) { // If task still exists
            
            // Delete sensitive task variables
            delete task.__v 
            delete task._id

            // Return Task
            return task
        } else {

            // TODO - Remove response status
            res.status(404);
        }
    }
}
// FIXME - Fix all task handling





// Function Name: db_updateTask
// Function Description: Updated Task in Task database
// Function Param: taskUID - the id of task being requested
// Function Param: request
// Function Returns: True or None
// Function Throws: None
/* 
    Function Notes:
        - Has to be an asyncronous function
        - Must be used with await
        - Implemented in taskController.js
*/
async function db_updateTask(taskUID, req) {
    // Change Collection
    changeCollection('tasks');
    //console.log(taskUID) // For Debug
    taskUID = Number(taskUID)
    // Find Task
    let task = await Task.findOne({ uid: taskUID });
    //console.log(task) // For Debug

    // If title exists in req.body, update it
    if(req.body.title) {
        // console.log(req.body.title) // For Debug
        task.title = req.body.title // Set New Title
    }

    // If description exists in req.body, update it
    if(req.body.description) {
        task.description = req.body.description // Set New Description
    }

    // If assignee exists in req.body, update it
    if(req.body.assignee) {
        db_removeTaskFromUser(task.assignee, taskUID);
        addTaskToUser(req.body.assignee, taskUID);
        task.assignee = req.body.assignee // Set New Assignee
        //TODO: Add support to remove task from current assignee
    }

    // If progress exists in req.body, update it
    if(req.body.progress) {
        task.percentCompleted=req.body.progress // Set New percentCompleted

        // Set is completed field
        if(req.body.progress == 100){ // if progress is 100%
            task.isCompleted = true
        } else { // if progress is not 100%
            task.isCompleted = false
        }
    }

    // If startDate exists in req.body, update it
    if(req.body.startDate) {
        task.startDate=req.body.startDate // Set New startDate
    }

    // If endDate exists in req.body, update it
    if(req.body.endDate) {
        task.endDate=req.body.endDate // Set New endDate
    }

    //console.log(task) // For Debug

    // Save Task to Database
    task.save()

    // Return True
    return true
}
// TODO - Pass req.body as param, not whole req



// Delete Task
// Paramters: Task to Delete(ID)
async function db_deleteTask(taskUID) {
    // Change Collection
    changeCollection('tasks');

    // Find task
    let task = await Task.deleteOne({ uid: taskUID });
    return true
}




// Function Name: getNextUID
// Function Description: Get next available UID
// Function Param: None
// Function Returns: UID:number
// Function Throws: None
/* 
    Function Notes:
        - Has to be an asyncronous function
        - Must be used with await
*/
async function getNextUID() {

    // Get the current Max UID Task Value from DB
    let maxObj = await Task.aggregate()
    .group({ _id: null, num: { $max: '$uid' } })
    .exec()
    // Returns array with object in postion 0

    
    if(maxObj.length == 0){  // If maxObj is empty
        return 0 // Return first Task in database index
    }

    // Access number from array and add one to it
    let newUID = maxObj[0].num +1

    // Return next number
    return(newUID)
}





// Export Functions
module.exports = {db_createTask, db_getTask, db_updateTask, db_deleteTask, getNextUID}


