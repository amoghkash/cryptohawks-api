const { changeCollection } = require('./connectDB') 
const { Task } = require('../models/taskSchema')
const mongoose = require('mongoose');
const { returnUserTaskList } = require('../controllers/userController');


// Create Task
// Parameters: Task Title, Task Description, Task Subteam, Task Creator
async function db_createTask(req, res) {
    // TODO Add validation
    /* const {error} = validate.SignUp(req.body);
    if (error) {
        res.status(400).send(error.details[0].message) /// DO NOT USE res.send
        return false;
    }; */
    changeCollection('tasks');
    const taskID = await getCurrentUID()
    let assigneeVar
    if(!req.body.assignee) {
        assigneeVar = ""
    } else {
        assigneeVar= req.body.assignee
    }
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

    await task.save()
    return task
}


// Get Task
// Parameters: Task ID (maybe Task Title?)
// Gets user and returns user as JSON Object
async function db_getTask(taskUID) {
    changeCollection('tasks');
    let task = await Task.findOne({ uid: taskUID });
    if(task==null) {
    } else{
        task = task.toJSON()
        if (task) {
            delete task.__v
            delete task._id
            return task
        } else {
            res.status(404);
        }
    }
}

// Delete Task
// Paramters: Task to Modify(ID), (Value to Change), (New Value)

// Modify Task
// Paramters: Task to Modify(ID), (Value to Change), (New Value)
async function db_updateTask(taskUID, req) {
    changeCollection('tasks');
    console.log(taskUID)
    let task = await Task.findOne({ uid: taskUID });
    console.log(task)
    if(req.body.title) {
        console.log(req.body.title)
        task.title = req.body.title
    }
    if(req.body.description) {
        task.description = req.body.description
    }
    if(req.body.assignee) {
        task.assignee = req.body.assignee 
    }
    if(req.body.progress) {
        task.percentCompleted=req.body.progress
        if(req.body.progress == 100){
            task.isCompleted = true
        } else {
            task.isCompleted = false
        }
    }
    if(req.body.startDate) {
        task.startDate=req.body.startDate
    }
    if(req.body.endDate) {
        task.endDate=req.body.endDate
    }
    console.log(task)
    task.save()
    return true
}
// Get Current UID
// Return: Current UID number

async function getCurrentUID() {
    let maxObj = await Task.aggregate()
    .group({ _id: null, num: { $max: '$uid' } })
    .exec()
    if(maxObj.length == 0){
        return 0 // First Task Index
    }
    let newUID = maxObj[0].num +1
    return(newUID)
}

module.exports = {db_createTask, db_getTask, db_updateTask, getCurrentUID}


