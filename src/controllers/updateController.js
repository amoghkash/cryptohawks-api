const {db_createUpdate, db_getUpdate, getNextUID} = require('../db/updateDB')
const {validateUpdateCreation} = require('../scripts/inputValidation')

const createUpdate = async (req, res, next) => {
    var {error} = validateUpdateCreation(req.body)
    var responseObject ={}
    if(error) {
        responseObject.valid=false
        responseObject.issue=error.message
        res.json(responseObject)
        res.end()
        return 0
    }
    var update = await db_createUpdate(req.body)
    responseObject.update = update
    responseObject.valid= true
    res.json(responseObject)
    res.end()
}

const getAllUpdates = async (req, res, next) => {
    // Response Declaration
    let returnObject = {}
    // Get Total Number of Tasks
    let numTasks = await getNextUID()

    // For Each uid of task, add it to an array
    for (let index = 0; index < numTasks; index++) {
        
        // Get Task from Database
        let update = await db_getUpdate(index)
        if(update){   // If Task Exists
            returnObject[index] = update // Add task to returnObject
        } else {
            res.status(500)
            res.json(returnObject)
            res.end()
            return 0
        }
    }
    res.status(200) // Set Response Status
    res.json(returnObject) // Set Response Body
    res.end() // Send Response
}

module.exports={createUpdate, getAllUpdates}