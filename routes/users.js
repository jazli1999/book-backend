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

// router.get('/', users.consoleLog);


// function func() {
//     // ...
// }

// const func = () => {

// }

// default start with /users

router.put('/:id', (req, res, next) => {
    // so the field after the req.body. is field in the body...
    User.findById(req.params.id).then(user => {
        if(user.length === 0) return res.sendStatus(401);

        if(typeof req.body.user.firstName !== 'undefined') 
            user.firstName = req.body.user.firstName;
        if(typeof req.body.user.lastName !== 'undefined') 
            user.lastName = req.body.user.lastName;

        if(typeof req.body.user.email !== 'undefined') 
            user.email = req.body.user.email;

        if(typeof req.body.user.gender !== 'undefined')
            user.gender = req.body.user.gender;

        if(typeof req.body.user.bio !== 'undefined')
            user.bio = req.body.user.bio;

        // console.log(req.body.user.address.a);
        
        if(typeof req.body.user.address !== 'undefined') {
            user.address = {};
            if(typeof req.body.user.address.houseNumber !== 'undefined')
                user.address["houseNumber"] = req.body.user.address.houseNumber;
            if(typeof req.body.user.address.street !== 'undefined')
                user.address["street"] = req.body.user.address.street;
            if(typeof req.body.user.address.city !== 'undefined')
                user.address["city"] = req.body.user.address.city;
            if(typeof req.body.user.address.state !== 'undefined')
                user.address["state"] = req.body.user.address.state;
            if(typeof req.body.user.address.country !== 'undefined')
                user.address["country"] = req.body.user.address.country;
            if(typeof req.body.user.address.postcode !== 'undefined')
                user.address["postcode"] = req.body.user.address.postcode;
        }

        return user.save().then( () => res.send("update success"));
    }).catch(next);
});


// user login use email, return id to the frontend
router.post('/login', (req, res, next) => {
    if(!req.body.user.email) {
        // 422 unprocessable entity
        return res.status(422).json({error: {email: "can't be blank"}});
    }
    if(!req.body.user.password) {
        return res.status(422).json({error: {password: "can't be blank"}});
    }

    //this "user" is the return value of User.find()
    User.find({email: req.body.user.email}).then(user => {
        // res.send(typeof user); // object
        // if(Array.isArray(user)) res.send("array"); // is a array
        if(user.length===0) res.send("email not exist");
        if(user[0].password === req.body.user.password) {
            // frontend should use this id for further functions
            res.send(`${user[0]._id} approved`);
        } else {
            res.send("declined");
        }
        // res.json(user[0])
    });
});


// create new user
// router.post('/', (req, res, next) => {
//     let user = new User();
//     user.firstName = req.body.user.firstName;
//     user.lastName = req.body.user.lastName;
//     user.email = req.body.user.email;
//     // for now
//     user.password = req.body.user.password;

//     user.save().then( () => {
//         res.send("Save new user success")
//     }).catch(next);
// });
//the router.post is a promise, if the promise resolved, go to .then, if rejected, go to .catch

router.post('/', userController.createUser);




// delete user according to id
router.delete('/:id', (req, res, next) => {
    User.findByIdAndDelete(req.params.id).then(() => res.send("delete success"));
});

module.exports = router;
