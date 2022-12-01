require('dotenv').config();

// Import Dependencies
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const cors=require("cors");



// SETUP MONGODB Connection
//const uri = process.env.DATABASE_URL
mongoose.connect("mongodb+srv://urbanarobotics:cryptohawks@userdb.gmtmp2l.mongodb.net/MikeOxlong?retryWrites=true&w=majority");
const database = mongoose.connection

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})


// Setup Application
const app = express();
app.use(cors({
    origin:'https://amoghkash.github.io',
    credentials:true,
    allowedHeaders:'Content-Type,Authorization',
    optionsSuccessStatus: 200
})) // MUST BE BEFORE express.json()
app.use(cookieParser());
app.use(express.json())

const port = process.env.PORT;


// Import Modules and Files
const userRouter = require('./routes/user');


app.use('/user', userRouter)

app.get('/api', (req, res) => {
    res.send("This is Cryptohawks' API");
});

app.listen(port, () => {
    console.log(`Server Started at ${port}`)
})