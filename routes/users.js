const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
// const User = mongoose.model('User');
// let User = require('../models/user.model');

let userController = require('../controllers/user.controller');

// default start with /users

// function func() {
//     // ...
// }

// const func = () => {

// }

// Simple User Information:
// create new user
//the router.post is a promise, if the promise resolved, go to .then, if rejected, go to .catch
router.post('/', userController.createUser);

// user login use email, return id to the frontend
router.post('/login', userController.loginUser);

// update user information
router.put('/:id', userController.updateUser);

// get user information
router.get('/:id', userController.getUserInfo);

// delete user according to id
router.delete('/:id', userController.deleteUser);


// Book realted User API
// add to user's book list using isbn
// router.get('')


module.exports = router;
