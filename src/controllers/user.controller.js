import UserService from '../services/user.service.js';

async function updateUser(req, res) {
    UserService.update(req.userId, req.body).then((value) => res.status(200).send(value));
}

async function getUserInfo(req, res, next) {
    const queryId = req.params.id ? req.params.id : req.userId;
    UserService.get(queryId).then((user) => {
        if (queryId !== req.userId) {
            const response = JSON.parse(JSON.stringify(user));
            delete response.password;
            if (response.address) {
                delete response.address.street;
                delete response.address.houseNumber;
                delete response.address.postcode;
            }
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
    UserService.readBookList(req.userId, 'BC').then((value) => res.status(200).send(value));
}

async function readWSList(req, res, next) {
    UserService.readBookList(req.userId, 'WS').then((value) => {
        res.status(200).send(value);
    });
}

export default {
    updateUser, 
    getUserInfo, 
    deleteUser, 
    updateBCList, 
    updateWSList, 
    readBCList, 
    readWSList,
};
