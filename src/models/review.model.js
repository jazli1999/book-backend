import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const reviewSchema = new Schema({
    order: { type: Schema.Types.ObjectId, ref: 'Order' },
    content: { type: String, index: true },
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    receiver: { type: Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

export default model('Review', reviewSchema);
