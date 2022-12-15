const Joi = require('joi');


// Function Name: validateSignupInput
// Function Description: Validate the input for signup
// Function Params: User input from signup
// Function Returns: Null if no error
// Function Throws: Returns error as string
/* 
    Function Notes:
        - Used only at signup
*/
function validateSignupInput(user) {
    const schema = Joi.object({
        name: Joi.string().max(50).required(),
        username: Joi.string().max(255).alphanum().required(),
        password: Joi.string().max(255).alphanum().required(),
        subteam: Joi.required(),
        grade: Joi.required(),
        admin: Joi.required()
    }); // Create Signup Schema

    return schema.validate(user); // Validate Schema
}
// TODO - Change schema


// Function Name: validateLoginInput
// Function Description: Validate the input for login
// Function Params: User input from login
// Function Returns: Null if no error
// Function Throws: Returns error as string
/* 
    Function Notes:
        - Used only at login
*/
function validateLoginInput(user) {
    const schema = Joi.object({
        username: Joi.string().max(255).required(),
        password: Joi.string().required()
    }); // Create Login Schema

    return schema.validate(user); // Validate Schema
}



// Function Name: validateTaskCreation
// Function Description: Validate the input for creating a task
// Function Params: Task input from login
// Function Returns: Null if no error
// Function Throws: Returns error as string
/* 
    Function Notes:
        - Used only at task creation
*/
function validateTaskCreation(task) {
    const schema = Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        assignee: Joi.string(),
        startDate: Joi.date(),
        endDate: Joi.date(),
        type: Joi.string().required()
    }); // Create Task Schema

    return schema.validate(task); // Validate Schema
}
// TODO - Change Schema


// Export Functions
module.exports = { validateSignupInput, validateLoginInput, validateTaskCreation};