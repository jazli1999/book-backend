const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
// const User = mongoose.model('User');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

// default start with users
// router.put('/add', function(req, res, next) {
//   User.findById(req.payload.id).then(function(user){
//     if(!user) {return res.sendStatus(401);}


//   })
// });

module.exports = router;
