import Message from '../models/messages.model.js';

async function get(params ) {
    // just for testing framework
    return Message.Find({senderID : params.senderID, receiverID : params.receiverID});
}

async function send(params) {
    // just for testing framework
    const message = new Message();
    message.senderID = params.senderID;
    message.receiverID = params.receiverID;
    message.message = params.text;
    message.timestamp = new Date();
    return message.save();
}

export default {
    get, send
};
