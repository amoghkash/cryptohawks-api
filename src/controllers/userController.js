const { getUserFromDB, addUserToDB } = require('../db/userDB');
const {validateUser} = require('./authController')

const login = async (req, res, next) => {
    // get user information from db
    console.log(req.body)
    var dbUser = await getUserFromDB(req, res);
    var responseJSON
    if(dbUser){
        if(validateUser(req, dbUser)) {
            responseJSON = dbUser.toJSON()
            responseJSON.valid = true
            res.status(200)
        }
    } else {
        console.log("b1")
        var responseJSON = {
            valid:false, 
            issue: "Wrong Username or Password"
        }
    }
    res.json(responseJSON).end()
}

const signup = async (req, res, next) => {
    var success = await addUserToDB(req, res);
    // TODO Add token
    /* if(success) {
        const authToken = generateToken({ email: req.body.email });
        res.cookie("token", authToken, { httpOnly: true });
        res.status(201).send("User Created");
    } else {
        res.send();
    } */
    res.send()
}

module.exports = { login, signup};


