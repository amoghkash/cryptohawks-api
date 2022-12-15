# Controllers

## What are controllers?

Controllers are linked by routes and run the code required by a specified request. For example, if a request comes in asking to login, the controller would handle the logic of getting the login username and password, verify that the username and password match in relation to the database, and then setting the response to the client.

Controllers are also asyncronous(async) constants, not functions. The format to creating a task is as follows:

`
const TASKNAME = async(req, res, next) => {
    //function logic
}
`

## Controller List

1. userController.js
   1. login
      - Purpose: Log the user In
   2. signup
      - Pupose: Sign the user Up
   3. returnUser
      - Purpose: Return user Data Based on Token
   4. returnUserTaskList
      - Purpose: Return a list of user's tasks
   5. returnAllUsers
      - Purpose: Return a list of all users

2. taskController.js
   1. createTask
      - Purpose: Create a task
   2. getTask
      - Purpose: Return a task based on id
   3. updateTask
      - Purpose: Update the data in a task
   4. returnAllTasks
      - Purpose: Return a list of all tasks available
