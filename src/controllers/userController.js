const { getUserFromDB, addUserToDB, getAllUserFromDB} = require('../db/userDB');
const {validateUser} = require('./authController')
const { generateToken, parse } = require('../scripts/jwt'); // JWT Verification
const { validateSignupInput, validateLoginInput } = require('../scripts/inputValidation')
const {db_getTask} = require('../db/taskDB')

const maxSensitiveCookieAge = 3000 // 5 minutes

// Login User
const login = async (req, res, next) => {
    const {error} = validateLoginInput(req.body);
    var responseJSON
    if(!error) {
        let inputUsername = req.body.username.trim();
        var dbUser = await getUserFromDB(inputUsername);
        if(dbUser){
            if(validateUser(req, dbUser)) {
                const authToken = generateToken(req.body.username.trim())
                console.log(dbUser)
                responseJSON = {
                    valid:true,
                    username: dbUser.username,
                    name: dbUser.name,
                    access_token: authToken,
                    token_expires_in: maxSensitiveCookieAge,
                    admin: dbUser.admin
                }
                res.status(200)
                responseJSON.tokenSet = true
                console.log(responseJSON)
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

//Signup User
const signup = async (req, res, next) => {
    const {error} = validateSignupInput(req.body);
    var responseJSON
    if(!error) { // If input is valid
        var success = await addUserToDB(req, res);
        if(success) {
            const authToken = generateToken(req.body.username);
            responseJSON = {
                valid:true,
                username: req.body.username.trim(),
                name: req.body.name.trim(),
                firsttime: true,
                access_token: authToken,
                token_expires_in: maxSensitiveCookieAge
            }
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

// Get User based on token
const returnUser = async (req, res, next) => {
    let token = req.query.token
    if(token) {
        let decodedContent= await parse(token)
        let user = await getUserFromDB(decodedContent)
        let returnUser = user.toJSON()
        delete returnUser._id
        delete returnUser.__v
        delete returnUser.updatedAt
        res.json(returnUser)
        res.status(200)
    } else {
        res.status(401)
    }
    res.end()
}

const returnUserTaskList = async (req, res, next) => {
    let req_username = req.params.username;
    const userdata_temp = await getUserFromDB(req_username)
    let returnObject = {}
    if(userdata_temp) {
        const userdata = userdata_temp.toJSON();
        let taskArray = userdata.tasks
        for (let index = 0; index < taskArray.length; index++) {
            const element = taskArray[index];
            task = await db_getTask(element)
            var user;
            if(task){
                if(task.assignee){
                    user = await getUserFromDB(task.assignee) 
                }
                if(user){
                    task.assignee=user.name
                }
                returnObject[index] = task
            }
        }
        res.status(200)
    }
    res.json(returnObject)
    res.end()
}

const returnAllUsers = async (req, res, next) => {
    const userdata_array = await getAllUserFromDB()
    let returnObject = {}
    if(userdata_array) {
        for (let index = 0; index < userdata_array.length; index++) {
            const element = userdata_array[index];
            let user = await getUserFromDB(element)
            returnObject[element] = user.name
        }
        res.status(200)
    }
    res.json(returnObject)
    res.end()
}




module.exports = { login, signup, returnUser, returnUserTaskList, returnAllUsers};
