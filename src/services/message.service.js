import Message from '../models/message.model.js';
import User from '../models/user.model.js';

// returns the dialog between specified sender and receiver
async function getDialog(req) {
    const { sender } = req.params;
    const { receiver } = req.params;
    const result = await Message.find({ $or: [{ $and: [{ sender }, { receiver }] }, { $and: [{ sender: receiver }, { receiver: sender }] }] });
    return result;
}

// returns all messages (sent or received) of currently logged user
async function getAllMessagesOfCurrentUser(userId) {
    const result = await Message.find({ $or: [{ sender: userId }, { receiver: userId }] });
    return result;
}

async function send(params) {
    const sender = await User.findById(params.sender);
    const receiver = await User.findById(params.receiver);
    if (sender === null || receiver === null || receiver === sender) {
        return null;
    }

    const message = new Message();
    message.sender = params.sender;
    message.receiver = params.receiver;
    message.message = params.message;
    message.timestamp = new Date();
    message.isRead = false;
    await message.save();

    return 'successfully sent';
}

export default {
    send, getAllMessagesOfCurrentUser, getDialog,
};
