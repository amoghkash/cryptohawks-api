# Database

## What is a database?

A database stores all the information and data needed by the application to run. We use a NOSQL database called MongoDB. Inside a Database, there are different collections. Collections organize types of data, allowing seperation of data within a database. The individual pieces of data are stored as documents within the collections.

## Our Database

In the Cryptohawks database, there are two collections, a user collection that contains all the user data and a task collection that contains all the task data. It is hosted in MongoDB Atlas and contains 512MB of space. It is consumed using the Mongoose API. All database operation must be *asyncronous* and **make the use of await when being called**. This allows for the data to be fully loaded before continuing.

## What does the database do

We store user and task data in the database, accessing and serving it in responses to the requests that users make. This data is all organized and can be accessed/created through the library. Look at the [Mongoose Docs](https://mongoosejs.com/docs/api.html) for more information on how to do this.

## Purpose of DB module

While many of these tasks can be completed within the controller, creating a DB module to abstract these functions makes the system simpler and more accessible while allowing for increased performance.along with better organization/readability.

## Database Function List

1. userDB.js
   1. getUserFromDB
      - Purpose: Returns a user from database
   2. getAllUserFromDB
      - Pupose: Returns an Array of all users from the database
   3. addUsertoDB
      - Purpose: Create a user in the database
   4. addTaskToUser
      - Purpose: Link a task to a user in the database

2. taskDB.js
   1. db_createTask
      - Purpose: Create a task in the database
   2. db_getTask
      - Purpose: Return a task based on id from the database
   3. db_updateTask
      - Purpose: Update the data in a task in the database
   4. getNextUID
      - Purpose: Get the next available ID number for a new task
