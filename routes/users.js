const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
// const User = mongoose.model('User');
let User = require('../models/user.model');

let userController = require('../controllers/user.controller');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//     res.send('respond with a resource');
// });

// function func() {
//     // ...
// }

// const func = () => {

// }


// default start with /users
// update user information
router.put('/:id', userController.updateUser);


// user login use email, return id to the frontend
router.post('/login', userController.loginUser);


// create new user
//the router.post is a promise, if the promise resolved, go to .then, if rejected, go to .catch
router.post('/', userController.createUser);


// delete user according to id
router.delete('/:id', (req, res, next) => {
    User.findByIdAndDelete(req.params.id).then(() => res.send("delete success"));
});


module.exports = router;
