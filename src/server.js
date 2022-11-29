require('dotenv').config();

// Import Dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');



// SETUP MONGODB Connection
const uri = process.env.DATABASE_URL
mongoose.connect(uri);
const database = mongoose.connection

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})


// Setup Application
const app = express();
app.use(express.json());


// Import Modules and Files
const userRouter = require('./routes/user');


app.use('/api/user', userRouter)

app.get('/api', (req, res) => {
    res.send("This is Cryptohawks' API");
});

app.listen(8080, () => {
    console.log(`Server Started at ${8080}`)
})