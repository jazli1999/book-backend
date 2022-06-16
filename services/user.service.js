const mongoose = require('mongoose');
let User = require('../models/user.model');

async function create (userToCreate) {
    let user = new User(); // contructor always be sync
    user.firstName = userToCreate.user.firstName;
    user.lastName = userToCreate.user.lastName;
    user.email = userToCreate.user.email;
    // for now
    user.password = userToCreate.user.password;
    return user.save(); // .save is asyn will return a promise
}

module.exports = { create };