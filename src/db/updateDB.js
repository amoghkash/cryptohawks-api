const { Update } = require('../models/updateSchema')
const {changeCollection} = require('./connectDB')


async function db_createUpdate(input) {
    // Change Collection
    changeCollection('updates');
    
    // Get new UID
    const updateID = await getNextUID()

    var array_assignedTo = []
    var obj_assignedTo = input.assignedTo
    for(var key in obj_assignedTo) {
        var obj = obj_assignedTo[key];
        array_assignedTo.push(obj.is)
    }
    

    // Create new update
    let update = new Update({
        title: input.title.trim(),
        uid: updateID,
        description: input.description.trim(),
        assignedTo: array_assignedTo,
        createdBy: input.createdBy,
        postDate: new Date()
    });


    // Save Update into Database
    await update.save()

    // Return Update
    return update
}



async function db_getUpdate(updateUID) {
    // Change Collection
    changeCollection('updates');

    // Find update
    let update = await Update.findOne({ uid: updateUID });

    if(update==null) { // If task not found
    } else{ // If Task Found
        update = update.toJSON() // Convert task to JSON
        if (update) { // If task still exists
            
            // Delete sensitive task variables
            delete update.__v 
            delete update._id

            // Return Task
            return update
        }
    }
}





async function getNextUID() {

    // Get the current Max UID Value from DB
    let maxObj = await Update.aggregate()
    .group({ _id: null, num: { $max: '$uid' } })
    .exec()
    // Returns array with object in postion 0
    
    if(maxObj.length == 0){  // If maxObj is empty
        return 0 // Return first uid in database index
    }

    // Access number from array and add one to it
    let newUID = maxObj[0].num +1

    // Return next number
    return(newUID)
}

module.exports = {db_createUpdate, db_getUpdate, getNextUID}