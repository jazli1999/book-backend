// import mongoose from 'mongoose';
import User from '../models/user.model.js';

async function create(userToCreate) {
    const user = new User(); // contructor always be sync
    user.firstName = userToCreate.user.firstName;
    user.lastName = userToCreate.user.lastName;
    user.email = userToCreate.user.email;
    // for now
    user.password = userToCreate.user.password;
    return user.save(); // .save is asyn will return a promise
}

async function login(userToLogin, res) {
    if (!userToLogin.user.email) {
        // 422 unprocessable entity
        return res.status(422).json({ error: { email: "can't be blank" } });
    }
    if (!userToLogin.user.password) {
        return res.status(422).json({ error: { password: "can't be blank" } });
    }

    return User.find({ email: userToLogin.user.email }).then((user) => {
        // res.send(typeof user); // object
        // if(Array.isArray(user)) res.send("array"); // is a array
        if (user.length === 0) return 'email not exist';
        if (user[0].password === userToLogin.user.password) {
            // frontend should use this id for further functions
            return `${user[0]._id} approved`;
        }

        return 'declined';

        // res.json(user[0])
    });
}

async function update(userId, userInfo) {
    return User.findById(userId).then((user) => {
        // need test
        if (user === null) return 'no such user';
        if (typeof userInfo.user.firstName !== 'undefined') {
            user.firstName = userInfo.user.firstName;
        }
        if (typeof userInfo.user.lastName !== 'undefined') {
            user.lastName = userInfo.user.lastName;
        }
        if (typeof userInfo.user.gender !== 'undefined') {
            user.gender = userInfo.user.gender;
        }
        if (typeof userInfo.user.bio !== 'undefined') {
            user.bio = userInfo.user.bio;
        }
        if (typeof userInfo.user.address !== 'undefined') {
            user.address = {};
            if (typeof userInfo.user.address.houseNumber !== 'undefined') {
                user.address.houseNumber = userInfo.user.address.houseNumber;
            }
            if (typeof userInfo.user.address.street !== 'undefined') {
                user.address.street = userInfo.user.address.street;
            }
            if (typeof userInfo.user.address.city !== 'undefined') {
                user.address.city = userInfo.user.address.city;
            }
            if (typeof userInfo.user.address.state !== 'undefined') {
                user.address.state = userInfo.user.address.state;
            }
            if (typeof userInfo.user.address.country !== 'undefined') {
                user.address.country = userInfo.user.address.country;
            }
            if (typeof userInfo.user.address.postcode !== 'undefined') {
                user.address.postcode = userInfo.user.address.postcode;
            }
        }
        return user.save().then(() => 'update success');
    });
}

async function get(userId) {
    return User.findById(userId);
}

async function deleteUser(userId) {
    return User.findByIdAndDelete(userId);
}

export default {
    create, login, update, get, deleteUser,
};
