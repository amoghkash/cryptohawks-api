// Import Packages and Modules
const {db_createTask, db_getTask, db_updateTask, db_deleteTask} = require('../db/taskDB')
const {validateTaskCreation} = require('../scripts/inputValidation')
const {getNextUID} = require('../db/taskDB')
const {getUserFromDB, addTaskToUser, db_removeTaskFromUser} = require('../db/userDB')



// Create Task
// Param: req.body
const createTask = async (req, res, next) => {
    // Validate Task Creation
    const {error} = validateTaskCreation(req.body);
    
    // Response Declaration
    var responseJSON

    if(!error) { // If Input is Validated

        // Save user to database
        var success = await db_createTask(req, res);

        // Get Assignee from Database
        var user = await getUserFromDB(success.assignee) 

        if(success) { // If Task is Successfully Created
            responseJSON = {
                valid: true,
                title: success.title,
                description: success.description,
                taskID: success.uid,
                assignee: user.name,
                startDate: success.startDate,
                endDate: success.endDate,
                type: success.type
            }
            res.status(201); // Set Response Status

            // Adds Task to User Data
            await addTaskToUser(user.username, success.uid) 

        }else { // If Task is not Created
            responseJSON = {
                valid:false, 
                issue: "Cannot Create Task"
            }
        }
    } else { // If Input is not valid
        responseJSON = {
            valid:false,
            issue: error.details[0].message // Error Message
        }
        res.status(400) // Response Status
    } 

    // Send Response
    res.json(responseJSON).end()
}




// Get Task
// Param: req.params - taskID from the link
const getTask = async (req, res, next) => {
    // Response Declaration
    var responseJSON

    // Get TaskID
    let taskID = req.params.taskID;

    // Get Task from Database
    var task = await db_getTask(taskID);

    // Get Assignee from Database

    if(task.assignee){
        var user = await getUserFromDB(task.assignee);
        //console.log(task) // For Debug

        if(task) {  // If task exists
            responseJSON = {
                title: task.title,
                description: task.description,
                taskID: task.uid,
                assignee: user.name,
                startDate: task.startDate,
                endDate: task.endDate,
                progress: task.percentCompleted,
                type: task.type
            }
            res.status(200); // Set Response Status
        }

        // Send Response 
    }
    res.json(responseJSON).end()
    
}




// Update Task
// Param: req.body
const updateTask = async (req, res, next) => {

    // Response Declaration
    var responseJSON;

    // Update Task in Database
    const status = await db_updateTask(req.body.taskID, req)
    //console.log(status)   // For Debug

    
    if(status) {    // If update is successful
        responseJSON = {
            valid:true, 
            issue: "Updated"
        }
        res.status(200); // Set Response Status
    }

    // Send Response
    res.json(responseJSON).end()
}

// Delete Task
// Param: req.body
const deleteTask = async (req, res, next) => {
    //console.log('delete') // For Debug
    // Response Declaration
    var responseJSON;

    // Update Task in Database
    const task = await db_getTask(req.params.taskID)

    const status = await db_deleteTask(req.params.taskID)

    await db_removeTaskFromUser(task.assignee,req.params.taskID)
    
    if(status) {    // If update is successful
        responseJSON = {
            valid:true, 
            issue: "Deleted"
        }
        res.status(200); // Set Response Status
    }

    // Send Response
    res.json(responseJSON).end()
}



// Get All Tasks
// Param: req.body
const returnAllTasks = async (req, res, next) => {
    
    // Response Declaration
    let returnObject = {}
    // Get Total Number of Tasks
    let numTasks = await getNextUID()

    // For Each uid of task, add it to an array
    for (let index = 0; index < numTasks; index++) {
        
        // Get Task from Database
        let task = await db_getTask(index)
        var user;   // Create User Variable

        if(task){   // If Task Exists


            if(task.assignee){  // If Task Has an assignee
                user = await getUserFromDB(task.assignee)   // Get user from database
            }
            if(user){ // If user exists
                task.assignee=user.name // Set task assignee to User's name
            }
            returnObject[index] = task // Add task to returnObject
        }
    }
    res.status(200) // Set Response Status
    res.json(returnObject) // Set Response Body
    res.end() // Send Response
}
// TODO - Add admin status validation


// Export Functions
module.exports = { createTask, getTask, updateTask, deleteTask, returnAllTasks }