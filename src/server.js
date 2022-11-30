require('dotenv').config();

// Import Dependencies
const express = require('express');
const mongoose = require('mongoose');

const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}



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
app.use(express.json())
app.use(cors(corsOptions))
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