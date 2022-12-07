const { changeCollection } = require('./connectDB') 
const { Task } = require('../models/taskSchema')
const mongoose = require('mongoose');


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
        percentCompleted: 0
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
    task = task.toJSON()
    if (task) {
        delete task.__v
        delete task._id
        return task
    } else {
        res.status(404);
    }
}

// Delete Task
// Paramters: Task to Modify(ID), (Value to Change), (New Value)

// Modify Task
// Paramters: Task to Modify(ID), (Value to Change), (New Value)

module.exports = {db_createTask, db_getTask}

// Get Current UID
// Return: Current UID number

async function getCurrentUID() {
    const database = mongoose.connection
    let maxObj = await Task.aggregate()
    .group({ _id: null, num: { $max: '$uid' } })
    .exec()
    let newUID = maxObj[0].num +1
    return(newUID)
}
