const { getUserFromDB, addUserToDB } = require('../db/userDB');
const {validateUser} = require('./authController')
const { generateToken } = require('../scripts/jwt'); // JWT Verification

const maxSensitiveCookieAge = 86400000

const login = async (req, res, next) => {
    // get user information from db
    var dbUser = await getUserFromDB(req, res);
    var responseJSON
    console.log(dbUser)
    if(dbUser){
        if(validateUser(req, dbUser)) {
            var responseJSON = {
                valid:true
            }
            res.status(200)
            const authToken = generateToken(req.body.username.trim())
            res.cookie("token", authToken, {httpOnly:true, maxAge: maxSensitiveCookieAge, secure: true, sameSite:'None'})
            responseJSON.tokenSet = true
            responseJSON.username = dbUser.username
            responseJSON.name = dbUser.name
        } else {    // If password is wrong
            var responseJSON = {
                valid:false, 
                issue: "Wrong Username or Password"
            }
        }
    } else {    // If password is wrong
        var responseJSON = {
            valid:false, 
            issue: "User Does not Exist"
        }
    }// If user doesn't exist
    res.json(responseJSON).end()
}

const signup = async (req, res, next) => {
    var success = await addUserToDB(req, res);

    if(success) {
        const authToken = generateToken(req.body.username);
        res.cookie("token", authToken, {httpOnly:true, maxAge: maxSensitiveCookieAge, secure: true, sameSite:'None'})
        res.cookie("tokenSet", "true", {maxAge: maxSensitiveCookieAge, secure: true, sameSite:'None'})
        res.cookie("username", req.body.username, {secure: true, sameSite:'None'})
        res.cookie("name", req.body.name, {secure: true, sameSite:'None'})
        res.cookie("firsttime", true, {secure: true, sameSite:'None'})
        res.status(201);
        var responseJSON = {
            valid:true
        }
    }else if(!success) {
        var responseJSON = {
            valid:false, 
            issue: "User Already Exists...Please Login"
        }
    } 
    res.json(responseJSON).end()
}

module.exports = { login, signup};


