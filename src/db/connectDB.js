// Import packages
const mongoose = require('mongoose');


// Function Name: changeCollection
// Function Description: Changes current collection in the connection
// Function Param: name - Name of COllection
// Function Returns: database
// Function Throws: None
/* 
    Function Notes:
        - database is changed everywhere through the server
*/
function changeCollection(name) {
    const database = mongoose.connection.collection(name)
    return(database)
}
// TODO - Deprecate Function


// Export Functions
module.exports = {changeCollection}