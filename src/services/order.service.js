import Order from '../models/order.model.js';
import User from '../models/user.model.js';

const read = async (orderId) => {
    try {
        const order = await Order.findById(orderId)
            .populate('requester.wishList')
            .populate('responder.wishList')
            .exec();
        return order;
    }
    catch (err) {
        console.log(err);
        return null;
    }
};

const create = async (newOrder, reqId) => {
    const order = new Order(newOrder);
    order.requester.userId = reqId;
    order.requester.status = 2;
    order.responder.status = 2;
    order.orderStatus = 'Created';
    await order.save();
    
    const requester = await User.findById(reqId);
    requester.orders.push(order._id.toString());
    const responder = await User.findById(order.responder.userId);
    responder.orders.push(order._id.toString());
    await requester.save();
    await responder.save();
    return order;
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
        order.responder.payment = {
            ...payment,
        };
        order.responder.status += 1;
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
        order.responder.trackingCode = trackingCode;
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

const pickBooks = async (orderId, isReq, reqId, bookList) => {
    const order = await Order.findById(orderId);
    if (isReq) {
        if (order.requester.userId.toString() !== reqId) return 401;
        order.requester.wishList = bookList;
    }
    else {
        if (order.responder.userId.toString() !== reqId) return 401;
        order.responder.wishList = bookList;
    }
    order.requester.status += 1;
    order.responder.status += 1;
    await order.save();
    return 200;
};

const declineOrder = async (orderId, reqId) => {
    const order = await Order.findById(orderId);
    if (order.responder.userId.toString() !== reqId) return 401;
    order.orderStatus = 'Declined';
    await order.save();
    return 200;
};

export default {
    create,
    read,
    pickBooks,
    updatePayment,
    updateTrackingCode,
    confirmReceipt,
    declineOrder,
};
