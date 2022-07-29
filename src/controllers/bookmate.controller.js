import BookmateService from '../services/bookmate.service.js';

async function matchBookmates(req, res, next) {
    const queryId = req.params.id ? req.params.id : req.userId;
    BookmateService.match(queryId).then((bookmates) => {
        res.json(bookmates);
    }).catch(next);
}

async function currentBookmates(req, res, next) {
    BookmateService.currentBookmates(req.userId).then((value) => res.status(200).json(value));
}

async function sendRequest(req, res, next) {
    BookmateService.sendRequest(req.userId, req.body.userId).then((value) => res.status(200).send(value));
}

async function acceptRequest(req, res, next) {
    BookmateService.acceptRequest(req.userId, req.body.userId).then((value) => res.status(200).send(value));
}

async function declineRequest(req, res, next) {
    BookmateService.declineRequest(req.userId, req.body.userId).then((value) => res.status(200).send(value));
}

export default {
    matchBookmates, currentBookmates, sendRequest, acceptRequest, declineRequest,
};
