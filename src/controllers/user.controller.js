import UserService from '../services/user.service.js';
// const userServiceInstance = new userService();

async function createUser(req, res, next) {
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
    const queryId = req.params.id ? req.params.id : req.userId;
    UserService.get(queryId).then((user) => {
        if (req.params.id !== req.userId) {
            const response = JSON.parse(JSON.stringify(user));
            delete response.password;
            delete response.address;
            delete response.birthday;
            delete response.email;
            delete response.orders;   
            delete response.bookmates; 
            res.json(response);
            return;
        }
        res.json(user);
    }).catch(next);
}

async function deleteUser(req, res, next) {
    UserService.deleteUser(req.params.id).then(() => {
        res.send('delete success');
    }).catch(next);
}

// bclist & wslist using the same service function
async function updateBCList(req, res, next) {
    UserService.updateBookList(req.userId, req.body, 'BC').then((value) => res.status(200).send(value));
}

async function updateWSList(req, res, next) {
    UserService.updateBookList(req.userId, req.body, 'WS').then((value) => res.status(200).send(value));
}

// bclist & wslist using the same service function
async function readBCList(req, res, next) {
    console.log(req);
    UserService.readBookList(req.userId, 'BC').then((value) => res.status(200).send(value));
}

async function readWSList(req, res, next) {
    UserService.readBookList(req.userId, 'WS').then((value) => {
        console.log('hle');
        res.status(200).send(value);
    });
}

export default {
    createUser, 
    loginUser, 
    updateUser, 
    getUserInfo, 
    deleteUser, 
    updateBCList, 
    updateWSList, 
    readBCList, 
    readWSList,
};
