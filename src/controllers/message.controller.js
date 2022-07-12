import MessageService from '../services/meesage.service.js';
async function getMessages(req, res, next){
    MessageService.get(req.body)
}

async function sendMessages(req, res, next){
    MessageService.send(req.body)
}

export default {getMessages, sendMessages}