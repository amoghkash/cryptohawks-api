const { getUserFromDB, addUserToDB } = require('../db/userDB');
const {validateUser} = require('./authController')
const { generateToken } = require('../scripts/jwt'); // JWT Verification
const { validateSignupInput, validateLoginInput } = require('../scripts/inputValidation')

const maxSensitiveCookieAge = 86400000 // 1 day


const login = async (req, res, next) => {
    const {error} = validateLoginInput(req.body);
    var responseJSON
    if(!error) {
        var dbUser = await getUserFromDB(req, res);
        console.log(dbUser)
        if(dbUser){
            if(validateUser(req, dbUser)) {
                const authToken = generateToken(req.body.username.trim())
                responseJSON = {
                    valid:true,
                    username: dbUser.username,
                    name: dbUser.name,
                    access_token: authToken,
                    token_expires_in: maxSensitiveCookieAge
                }
                res.status(200)     
                responseJSON.tokenSet = true
            } else {    // If password is wrong
                responseJSON = {
                    valid:false, 
                    issue: "Wrong Username or Password"
                }
                res.status(400)
            }
        } else {    // If user doesn't exist
            responseJSON = {
                valid:false, 
                issue: "User Does not Exist"
            }
            res.status(404)
        }
    } else {
        responseJSON = {
            valid:false,
            issue: error.details[0].message
        }
        res.status(400)
    }
    res.json(responseJSON).end()
}

const signup = async (req, res, next) => {
    const {error} = validateSignupInput(req.body);
    var responseJSON
    if(!error) { // If input is valid
        var success = await addUserToDB(req, res);
        if(success) {
            responseJSON = {
                valid:true,
                username: req.body.username.trim(),
                name: req.body.name.trim(),
                firsttime: true
            }
            const authToken = generateToken(req.body.username);
            res.cookie("token", authToken, {httpOnly:true, maxAge: maxSensitiveCookieAge, secure: true, sameSite:'None'})
            responseJSON.tokenSet = true
            res.status(201);
            
        }else {
            responseJSON = {
                valid:false, 
                issue: "User Already Exists...Please Login"
            }
        }
    } else {
        responseJSON = {
            valid:false,
            issue: error.details[0].message
        }
        res.status(400)
    } 
    res.json(responseJSON).end()
}

module.exports = { login, signup};


