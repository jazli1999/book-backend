import Order from '../models/order.model.js';
import User from '../models/user.model.js';
import MailService from './mail.service.js';

const getUserName = async (userId) => {
    const user = await User.findById(userId);
    return `${user.firstName} ${user.lastName}`;
};

const getUserEmail = async (userId) => {
    const user = await User.findById(userId);
    return user.email;
};

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
    const senderName = await getUserName(reqId);
    const receiverEmail = await getUserEmail(order.responder.userId);
    MailService.sendCreateOrderMail(senderName, receiverEmail);
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
    const senderName = await getUserName(isReq ? order.requester.userId : order.responder.userId);
    const receiverEmail = await getUserEmail(isReq ? order.responder.userId : order.requester.userId);
    MailService.sendUpdateOrderMail(senderName, receiverEmail, 'has completed payment', 'you can continue your order now!');
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
    const senderName = await getUserName(isReq ? order.requester.userId : order.responder.userId);
    const receiverEmail = await getUserEmail(isReq ? order.responder.userId : order.requester.userId);
    MailService.sendUpdateOrderMail(senderName, receiverEmail, 'has updated tracking code', 'you can track your package now');
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
    const senderName = await getUserName(isReq ? order.requester.userId : order.responder.userId);
    const receiverEmail = await getUserEmail(isReq ? order.responder.userId : order.requester.userId);
    MailService.sendUpdateOrderMail(senderName, receiverEmail, 'has confirmed receipt of your book(s)', 'tell us how is the exchange!');
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
    const senderName = await getUserName(isReq ? order.requester.userId : order.responder.userId);
    const receiverEmail = await getUserEmail(isReq ? order.responder.userId : order.requester.userId);
    MailService.sendUpdateOrderMail(senderName, receiverEmail, 'has accepted your exchange request', 'go to deopsit payment!');
    return 200;
};

const declineOrder = async (orderId, reqId) => {
    const order = await Order.findById(orderId);
    if (order.responder.userId.toString() !== reqId) return 401;
    order.orderStatus = 'Declined';
    await order.save();
    const senderName = await getUserName(order.responder.userId);
    const receiverEmail = await getUserEmail(reqId);
    MailService.sendUpdateOrderMail(senderName, receiverEmail, 'has declined your exchange request', 'go start new exchanges!');
    return 200;
};

const updateReview = async (orderId, userId) => {
    const order = await Order.findById(orderId);
    if (order.requester.userId.toString() === userId) {
        order.requester.isReviewed = true;
    }
    else if (order.responder.userId.toString() === userId) {
        order.responder.isReviewed = true;
    }
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
    updateReview,
};
