const { User } = require('../models/userSchema');
const mongoose = require('mongoose');
const { changeCollection } = require('./connectDB') 


// Gets user and returns user as JSON Object
async function getUserFromDB(targetUser) {
    // TODO Add login validation
    /*  const {error} = validate.Login(req.body);
    if (error) {
        res.status(400).send(error.details[0].message); // DO NOT USE res.send
        return false;
    }; */
    changeCollection('users');
    let user = await User.findOne({ username: targetUser });
    if (user) {
        return user;
    } else {
        res.status(404);
    }
}

async function addUserToDB(req, res) {
    // TODO Add validation
    /* const {error} = validate.SignUp(req.body);
    if (error) {
        res.status(400).send(error.details[0].message) /// DO NOT USE res.send
        return false;
    }; */
    changeCollection('users');
    inputUsername = req.body.username.trim();
    let user = await User.findOne({ username: inputUsername }); // See if User exists
    if (user) {
        res.status(440); // User Already Exists, this is put into bodyof response when it goes back to controller
        return false;
    } else { // Create User
        let subteamValue = req.body.subteam
        user = new User({
            username: inputUsername,
            name: req.body.name.trim(),
            password: req.body.password.trim(),
            subteam: subteamValue,
            tasks: [0],
            grade: req.body.grade[0].content,
            admin: req.body.admin
        });
        await user.save();
        console.log('User Saved');
        return true;
    };
}

module.exports = { getUserFromDB, addUserToDB };



