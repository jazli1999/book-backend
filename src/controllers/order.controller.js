import OrderService from '../services/order.service.js';
import UserService from '../services/user.service.js';

import Book from '../models/book.model.js';

const createOrder = async (req, res) => {
    OrderService.create(req.body.order, req.userId).then((order) => {
        res.status(200).json(order);
    });
};

const getUserOrders = async (req, res) => {
    const user = await UserService.get(req.userId);
    const orderIds = user.orders;
    const orders = [];
    for (const id of orderIds) {
        const order = await OrderService.read(id);
        const bookmateId = order.requester.userId.toString() === req.userId
            ? order.responder.userId : order.requester.userId;
        const userDetail = order.requester.userId.toString() === req.userId 
            ? order.requester : order.responder;
        const reviewStatus = order.requester.userId.toString() === req.userId 
            ? order.requester.isReviewed : order.responder.isReviewed;
        const bookmate = await UserService.get(bookmateId);
        const listCovers = [];
        for (const bookId of userDetail.wishList) {
            const book = await Book.findById(bookId).exec();
            listCovers.push(book.image);
        }
        orders.push({
            id: order._id,
            bookmate: `${bookmate.firstName} ${bookmate.lastName}`,
            orderedBooks: listCovers,
            user_id: userDetail.userId,
            receiver_id: bookmateId,
            isReviewed: reviewStatus,
        });
    }
    res.status(200).json(orders);
};

const getOrder = (req, res) => {
    OrderService.read(req.params.id).then((order) => {
        if (order) {
            const response = JSON.parse(JSON.stringify(order));
            response.reqId = req.userId;
            res.status(200).json(response);
        }
        else {
            res.status(404).send('Resource not found');
        }
    });
};

async function updatePayment(req, res) {
    const { isReq, payment } = req.body;
    OrderService.updatePayment(req.params.id, isReq, req.userId, payment)
        .then((status) => {
            res.setHeader('content-type', 'text/plain');
            res.status(status).send('ok');
        });
}

async function updateTrackingCode(req, res) {
    const { isReq, trackingCode } = req.body;
    OrderService.updateTrackingCode(
        req.params.id, 
        isReq,
        req.userId, 
        trackingCode,
    ).then((status) => {
        res.setHeader('content-type', 'text/plain');
        res.status(status).send('ok');
    });
}

async function confirmReceipt(req, res) {
    const { isReq } = req.body;
    OrderService.confirmReceipt(
        req.params.id, 
        isReq, 
        req.userId,
    ).then((status) => {
        res.setHeader('content-type', 'text/plain');
        res.status(status).send('ok');
    });
}

async function pickBooks(req, res) {
    const { isReq, bookList } = req.body;
    OrderService.pickBooks(req.params.id, isReq, req.userId, bookList).then((status) => {
        res.setHeader('content-type', 'text/plain');
        res.status(status).send('ok');
    }); 
}

async function declineOrder(req, res) {
    OrderService.declineOrder(req.params.id, req.userId).then((status) => {
        res.setHeader('content-type', 'text/plain');
        res.status(status).send('ok');
    });
}

async function updateReview(req, res) {
    OrderService.updateReview(req.params.id, req.userId).then((status) => {
        res.setHeader('content-type', 'text/plain');
        res.status(status).send('ok');
    });
}
export default {
    createOrder,
    getUserOrders,
    getOrder,
    pickBooks,
    updatePayment,
    updateTrackingCode,
    confirmReceipt,
    declineOrder,
    updateReview,
};
