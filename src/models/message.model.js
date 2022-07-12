import mongoose from 'mongoose';

const messageSchema = mongoose.Schema({
    recevierID: String,
    senderID: String, // change to userIDS for rec and senderID
    message: String,
    timestamp: String,
});


export default mongoose.model('messages', messageSchema);