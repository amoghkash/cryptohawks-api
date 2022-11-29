function validateUser(req, userObject) {
    var uip = req.body.password.trim(); // User Inputted Password
    var up = userObject.password; // User Password from DataBase
    if(uip == up){
        return true;
    } else {
        return false;
    }
};

module.exports = { validateUser }