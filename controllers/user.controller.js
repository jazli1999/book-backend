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
        res.send("Save new user success")
    }).catch(next);
} // no need for ;

module.exports = { createUser };


