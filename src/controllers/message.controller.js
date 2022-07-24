import MessageService from '../services/message.service.js';

async function getMessages(req, res, next) {
    MessageService.get(req.body).then((value) => (value ? res.status(200).send(value) : res.status(400).send('bad request.Check the credentials')));
}

async function getAllMessagesOfCurrentUser(req, res) {
    MessageService.getAllMessagesOfCurrentUser(req.userId).then((value) => res.status(200).send(value));
}

async function sendMessage(req, res, next) {
    MessageService.send(req.body).then((value) => (value ? res.status(200).send(value) : res.status(400).send('error occured please validate your message credentials')));
}

async function getDialog(req, res, next) {
    MessageService.getDialog(req).then((value) => res.status(200).send(value));
}

export default {
    getMessages, sendMessage, getAllMessagesOfCurrentUser, getDialog, 
};
