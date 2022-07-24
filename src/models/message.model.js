import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const messageSchema = new Schema({
    message: { type: String, index: true },
    receiver: { type: Schema.Types.ObjectId, ref: 'User' },
    sender: { type: Schema.Types.ObjectId, ref: 'User' },
    isRead: Boolean,
}, { timestamps: true });

export default model('Message', messageSchema);
