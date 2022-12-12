const {db_createTask, db_getTask, db_updateTask} = require('../db/taskDB')
const {validateTaskCreation} = require('../scripts/inputValidation')
const {getCurrentUID} = require('../db/taskDB')
const {getUserFromDB, addTaskToUser} = require('../db/userDB')

// TODO Add support to add task UID to person's user document
const createTask = async (req, res, next) => {
    const {error} = validateTaskCreation(req.body);
    var responseJSON
    if(!error) { // If input is valid
        var success = await db_createTask(req, res);
        var user = await getUserFromDB(success.assignee) 
        if(success) {
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
            res.status(201);
            addTaskToUser(user.username, success.uid) // Adds User to Task
        }else {
            responseJSON = {
                valid:false, 
                issue: "Cannot Create Task"
            }
        }
    } else {
        responseJSON = {
            valid:false,
            issue: error.details[0].message
        }
        res.status(400)
    } 
    res.json(responseJSON).end()
}

// will return nothing if task doesnt exist
const getTask = async (req, res, next) => {
    var responseJSON
    let taskID = req.params.taskID;
    var task = await db_getTask(taskID);
    var user = await getUserFromDB(task.assignee)
    //console.log(task)
    if(task) {
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
        res.status(200);
    }
    res.json(responseJSON).end()
}

const updateTask = async (req, res, next) => {
    var responseJSON
    const status = await db_updateTask(req.body.taskID, req)
    console.log(status)
    if(status) {
        responseJSON = {
            valid:true, 
            issue: "Updated"
        }
        res.status(200);
    }
    res.json(responseJSON).end()
}

// Get all Tasks
const returnAllTasks = async (req, res, next) => {
    let returnObject = {}
    let numTasks = await getCurrentUID()
    for (let index = 0; index < numTasks; index++) {
        let task = await db_getTask(index)
        var user;
        if(task){
            if(task.assignee){
                user = await getUserFromDB(task.assignee) 
            }
            if(user){
                task.assignee=user.name
            }
            returnObject[index] = task
        }
    }
    res.status(200)
    res.json(returnObject)
    res.end()
}
module.exports = { createTask, getTask, updateTask, returnAllTasks }