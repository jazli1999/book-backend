import Message from '../models/message.model.js';
import User from '../models/user.model.js';


async function get(params ) {
    return Message.Find({senderID : params.senderID, receiverID : params.receiverID});
}
async function getAllMessagesOfCurrentUser(userId ) {
    return  Message.Find({$or: [{senderID : userId}, {receiverID : userId}]});
}

async function getLastMessage(params ) { //returns last message of the specified sender and receiver
    const messages = Message.Find({senderID : params.senderID, receiverID : params.receiverID});
    if(messages===null){
        return null
    }
    else{
        messages.slice(-1)
    }
}


async function send(params) {
    const sender = await User.findById(params.sender);
    const receiver = await User.findById(params.receiver);
    if(sender===null || receiver===null  || receiver===sender){
        return null;
    }

    const message = new Message();
    message.sender = params.sender;
    message.receiver = params.receiver;
    message.message = params.message;
    message.timestamp = new Date();
    message.isRead = false;
    message.save();

    return 'successfully sent'
}

export default {
    get, send
};


