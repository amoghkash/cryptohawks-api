///////////////////////// APPLICATION SETUP START
require('dotenv').config();

// Import Dependencies
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const cors=require("cors");

// Create MongoDB Connection
mongoose.connect("mongodb+srv://urbanarobotics:cryptohawks@userdb.gmtmp2l.mongodb.net/MikeOxlong?retryWrites=true&w=majority");
mongoose.set('strictQuery', false);
const database = mongoose.connection

// Throw error if there is an error connection
database.on('error', (error) => {
    console.log(error)
})

// Connection Confirmation
database.once('connected', () => {
    console.log('Database Connected');
})

// Setup Application
const app = express(); // Create Express App


// !!! ONLY CHANGE ORIGIN DURING DEVELOPMENT
// Setup CORS Settings  
// Must be before express.json()
app.use(cors({
    origin:'http://localhost:5173', // Prod Link: 'https://amoghkash.github.io'  Dev Link: 'http://localhost:5173'
    credentials:true,
    allowedHeaders:'Content-Type,Authorization',
    optionsSuccessStatus: 200
})) 

app.use(cookieParser()); // Setup Cookie Parser
app.use(express.json()); // Setup Read ability for Request Body


// Set Server Port
const port = process.env.PORT;

///////////////////////// APPLICATION SETUP END




///// APPLICATION START

// Import Modules and Files
const userRouter = require('./routes/user');
const taskRouter = require('./routes/task');

// Link Routers
app.use('/user', userRouter);
app.use('/task', taskRouter);

// Get Request to Main API Link
// Validates that API is live
app.get('/api', (req, res) => {
    res.send("This is Cryptohawks' API");
});

app.get('/version', (req, res) => {
    res.json({"id":"1.0.0"});
    res.status(200)
    res.send()
    res.end()
});


// Start the Server
app.listen(port, () => {
    console.log(`Server Started at ${port}`);
})

