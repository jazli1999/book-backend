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
}

async function loginUser(req, res, next) {
    UserService.login(req.body).then((value) => {
        res.send(value);
    }).catch(next);
}

async function updateUser(req, res) {
    UserService.update(req.userId, req.body).then((value) => res.status(200).send(value));
}

async function getUserInfo(req, res, next) {
    // TODO for third-party query, do not return everything
    const queryId = req.params.id ? req.params.id : req.userId;
    UserService.get(queryId).then((user) => {
        res.json(user);
    }).catch(next);
}

async function deleteUser(req, res, next) {
    UserService.deleteUser(req.params.id).then(() => {
        res.send('delete success');
    }).catch(next);
}

export default {
    createUser, loginUser, updateUser, getUserInfo, deleteUser,
};
