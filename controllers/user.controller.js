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


module.exports = { createUser, loginUser, updateUser };


