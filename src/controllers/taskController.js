const {db_createTask, db_getTask} = require('../db/taskDB')
const {validateTaskCreation} = require('../scripts/inputValidation')


const createTask = async (req, res, next) => {
    const {error} = validateTaskCreation(req.body);
    var responseJSON
    if(!error) { // If input is valid
        var success = await db_createTask(req, res);
        if(success) {
            responseJSON = {
                title: success.title,
                description: success.description,
                taskID: success.uid,
                assignee: success.assignee
            }
            res.status(201);
            
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
    if(task) {
        responseJSON = {
            title: task.title,
            description: task.description,
            taskID: task.uid,
            assignee: task.assignee
        }
        res.status(200);
    }
    res.json(responseJSON).end()
}

// Get all Tasks

module.exports = { createTask, getTask }