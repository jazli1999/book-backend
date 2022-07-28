import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const paymentSchema = new Schema({
    orderId: String,
    payerId: String,
    amount: Number,
});

const userOrderSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    wishList: [{ type: Schema.Types.ObjectId, ref: 'Book' }],
    payment: paymentSchema,
    trackingCode: String,
    status: Number,
    isReviewed: {
        type: Boolean,
        default: false,
    },
}, { _id: false });

const orderSchema = new Schema({
    requester: userOrderSchema,
    responder: userOrderSchema,
    orderStatus: String,
});

export default model('Order', orderSchema);
