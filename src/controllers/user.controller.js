import UserService from '../services/user.service.js';
// const userServiceInstance = new userService();

async function createUser(req, res, next) {
    // try {
    //     const createdUser = await userService.create(req.body);
    //     return res.send(createdUser);
    // } catch (err) {
    //     res.status(500).send(err);
    // }
    UserService.create(req.body).then(() => {
        res.send('save new user success');
    }).catch(next);
} // no need for ;

async function loginUser(req, res, next) {
    UserService.login(req.body).then((value) => {
        res.send(value);
    }).catch(next);
} // no need for ;

async function updateUser(req, res, next) {
    UserService.update(req.params.id, req.body).then((value) => {
        res.send(value);
    }).catch(next);
} // no need for ;

async function getUserInfo(req, res, next) {
    UserService.get(req.params.id).then((user) => {
        res.json(user);
    }).catch(next);
}

async function deleteUser(req, res, next) {
    UserService.deleteUser(req.params.id).then(() => {
        res.send('delete success');
    }).catch(next);
}

export {
    createUser, loginUser, updateUser, getUserInfo, deleteUser,
};
