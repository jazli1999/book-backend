import Message from '../models/message.model.js';
import User from '../models/user.model.js';


//returns the dialog between specified sender and receiver
async function getDialog(req) {
    const { sender } = req.params;
    const { receiver } = req.params;
    console.log('get service: sender:', sender, 'receiver', receiver )
    return await Message.find({$or: [{$and: [{sender : sender}, {receiver : receiver}]},{$and: [{sender : receiver}, {receiver : sender}]}]})
}


//returns all messages (sent or received) of currently logged user
async function getAllMessagesOfCurrentUser(userId) {
    const messages = await Message.find({$or: [{sender : userId}, {receiver : userId}]})
    return await Message.find({$or: [{sender : userId}, {receiver : userId}]})
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
     send, getAllMessagesOfCurrentUser,getDialog
};


