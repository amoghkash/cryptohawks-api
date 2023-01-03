// Validate the User
// Param: req.body, user
function validateUser(req, userObject) {
    var uip = req.body.password.trim(); // User Inputted Password
    var up = userObject.password; // User Password from DataBase
    if(uip == up){ // Passwords are the Same
        return true;
    } else { // Passwords are different
        return false;
    }
};
// TODO - Deprecate function or move to /scripts or have this function get user data from cloud and compare

// Export Function
module.exports = { validateUser }