const userService = require('../services/user.service');
// const userServiceInstance = new userService();


async function createUser (req, res, next) {
    // try {
    //     const createdUser = await userService.create(req.body);
    //     return res.send(createdUser);
    // } catch (err) {
    //     res.status(500).send(err);
    // }
    userService.create(req.body).then( () => {
        res.send("save new user success")
    }).catch(next);
} // no need for ;


async function loginUser (req, res, next) {
    userService.login(req.body).then( value => {
        res.send(value)
    }).catch(next);
} // no need for ;


async function updateUser (req, res, next) {
    userService.update(req.params.id, req.body).then( value => {
        res.send(value)
    }).catch(next);
} // no need for ;


async function getUserInfo (req, res, next) {
    userService.get(req.params.id).then( user => {
        res.json(user);
    }).catch(next);
}

async function deleteUser (req, res, next) {
    userService.deleteUser(req.params.id).then( () => {
        res.send("delete success")
    }).catch(next);
}


module.exports = { createUser, loginUser, updateUser, getUserInfo, deleteUser };


