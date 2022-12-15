// Import Packages and Modules
const { getUserFromDB, addUserToDB, getAllUserFromDB} = require('../db/userDB'); // User DB Abstractions
const {validateUser} = require('./authController') // User Validation
const { generateToken, parse } = require('../scripts/jwt'); // JWT Verification
const { validateSignupInput, validateLoginInput } = require('../scripts/inputValidation') // Input Validation
const {db_getTask} = require('../db/taskDB') // Task DB Abstractions

// How long are sensitive cookies saved?
// Defines how long user is logged in for
const maxSensitiveCookieAge = 3000 // 5 Minutes


// Login User
// Param: req.body.username, req.body.password
const login = async (req, res, next) => {
    // Validate User Input
    const {error} = validateLoginInput(req.body); 
    
    // Response Declaration
    var responseJSON;

    if(!error) { // If Input is Validated

        // Save Input Username
        let inputUsername = req.body.username.trim();
        
        // Get User from Database
        var dbUser = await getUserFromDB(inputUsername);

        if(dbUser){  // User Exists
        
            if(validateUser(req, dbUser)) {  // User Password matches
                
                // Create JWT Authentication Token
                const authToken = generateToken(req.body.username.trim()) 
                //console.log(dbUser) // Used for Debug

                // Setup the Response
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

                //console.log(responseJSON) // Used for Debug
            } else {  // Password is Wrong

                // Setup Response
                responseJSON = {
                    valid:false, 
                    issue: "Wrong Username or Password"
                }
                res.status(400)
            }
        } else {  // User doesn't Exist

            // Setup Response
            responseJSON = {
                valid:false, 
                issue: "User Does not Exist"
            }
            res.status(404)
        }
    } else {  // If Input is not Validated
        
        // Setup Response
        responseJSON = {
            valid:false,
            issue: error.details[0].message // Error Message
        }
        res.status(400)
    }


    // Send Response
    res.json(responseJSON).end()
}



// Signup User
// Param: req.body.username, req.body.name, req.body.password, req.body.subteam, req.body.grade, req.body.type
const signup = async (req, res, next) => {
    // Validate User Input
    const {error} = validateSignupInput(req.body);

    // Response Declaration
    var responseJSON

    if(!error) { // If Input is Validated
        
        // Add User to Database
        var success = await addUserToDB(req, res);

        if(success) { // If user is successfully added
            
            // Create JWT Authentication Token
            const authToken = generateToken(req.body.username);

            // Setup Response
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


        }else { // If user already exists

            // Setup Response
            responseJSON = {
                valid:false, 
                issue: "User Already Exists...Please Login"
            }
        }
    } else {  // If Input is not Validated
        responseJSON = {
            valid:false,
            issue: error.details[0].message
        }
        res.status(400)
    } 

    // Send Response
    res.json(responseJSON).end()
}



// Get User
// Param: req.query.token (Set in link - /user/?token={jwtToken})
const returnUser = async (req, res, next) => {
    let token = req.query.token // Read Token

    if(token) { // If token exists in request
        let decodedContent= await parse(token) // Get username from token

        // Find user 
        let user = await getUserFromDB(decodedContent)
        let returnUser = user.toJSON()

        // Delete sensitive document parameters
        delete returnUser._id
        delete returnUser.__v
        delete returnUser.updatedAt

        // Setup Response 
        res.json(returnUser)
        res.status(200)


    } else { // If token doesn't exist in request
        res.status(401)
    }

    // Send Response
    res.end()
}


// Get a list of all user tasks
// Param: req.params.username (Set in Link)
const returnUserTaskList = async (req, res, next) => {
    // Get Username
    let req_username = req.params.username;

    // Get User Data
    const userdata_temp = await getUserFromDB(req_username)

    // Response Declaration
    let returnObject = {}

    if(userdata_temp) { // If user exists
        const userdata = userdata_temp.toJSON(); // Convert Mongoose Doc to JSON object
        let taskArray = userdata.tasks // Get the list of Task UID's from User
        
        // Loop through array of tasks and add them to response
        for (let index = 0; index < taskArray.length; index++) {
            const element = taskArray[index]; // Get Task UID
            task = await db_getTask(element) // Get Task
            
            if(task){ // If Task Exists
                
                // User Declaration
                var user;

                if(task.assignee){ // If task has an assignee
                    user = await getUserFromDB(task.assignee) // Get Assignee Data
                }

                if(user){ // If assignee exists
                    task.assignee=user.name // Set task field assignee to the assignee name
                }

                // Save task in return object
                returnObject[index] = task
            }
        }
        res.status(200) // Set Response Status
    }

    // Send Response
    res.json(returnObject)
    res.end()
}

// Get a list of all users
// Param: None
const returnAllUsers = async (req, res, next) => {
    // Get a list of all usernames
    const userdata_array = await getAllUserFromDB()

    // Response Declaration
    let returnObject = {}

    if(userdata_array) { // If list of users exist

        // Loop through list of all usernames
        for (let index = 0; index < userdata_array.length; index++) {
            const username = userdata_array[index]; // Set Username
            let user = await getUserFromDB(username) // Get User Data from Database with Username
            returnObject[username] = user.name // Set username as index and name as value in response
        }
        res.status(200) // Set Response Data
    }

    // Send Response
    res.json(returnObject)
    res.end()
}


// Export Functions
module.exports = { login, signup, returnUser, returnUserTaskList, returnAllUsers};
