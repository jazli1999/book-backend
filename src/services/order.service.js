import Order from '../models/order.model.js';

const read = async (orderId) => {
    try {
        const order = await Order.findById(orderId).exec();
        return order;
    }
    catch (err) {
        console.log(err);
        return null;
    }
};

const readUserOrders = async (userId) => {
    const orders = await Order.find({ userId })
        .populate('requester')
        .populate('responder')
        .exec();
    return orders;
};

const updatePayment = async (orderId, isReq, reqId, payment) => {
    const order = await Order.findById(orderId);
    if (isReq) {
        if (order.requester.userId.toString() !== reqId) return 401;
        order.requester.payment = {
            ...payment,
        };
        order.requester.status += 1;
    }
    else {
        if (order.responder.userId.toString() !== reqId) return 401;
        order.requester.payment = {
            ...payment,
        };
        order.requester.status += 1;
    }
    await order.save();
    return 200;
};

const updateTrackingCode = async (orderId, isReq, reqId, trackingCode) => {
    const order = await Order.findById(orderId);
    if (isReq) {
        if (order.requester.userId.toString() !== reqId) return 401;
        order.requester.trackingCode = trackingCode;
        order.requester.status += 1;
    }
    else {
        if (order.responder.userId.toString() !== reqId) return 401;
        order.responder.status += 1;
    }
    await order.save();
    return 200;
};

const confirmReceipt = async (orderId, isReq, reqId) => {
    const order = await Order.findById(orderId);
    if (isReq) {
        if (order.requester.userId.toString() !== reqId) return 401;
        order.requester.status += 1;
    }
    else {
        if (order.responder.userId.toString() !== reqId) return 401;
        order.responder.status += 1;
    }
    await order.save();
    return 200;
};

export default {
    readUserOrders,
    read,
    updatePayment,
    updateTrackingCode,
    confirmReceipt,
};
