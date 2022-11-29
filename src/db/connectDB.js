const mongoose = require('mongoose');

function changeCollection(name) {
    const database = mongoose.connection.collection(name)
    return(database)
}


module.exports = {changeCollection}