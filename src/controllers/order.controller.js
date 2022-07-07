import OrderService from '../services/order.service.js';
import UserService from '../services/user.service.js';

const getUserOrders = async (req, res) => {
    const user = await UserService.get(req.userId);
    const orderIds = user.orders;
    const orders = [];
    for (const id of orderIds) {
      const order = await OrderService.read(id);
      orders.push(order);
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
    OrderService.updateTrackingCode(req.params.id, isReq, req.userId, trackingCode)
        .then((status) => {
            res.setHeader('content-type', 'text/plain');
            res.status(status).send('ok');
        });
}

async function confirmReceipt(req, res) {
    const { isReq } = req.body;
    OrderService.confirmReceipt(req.params.id, isReq, req.userId).then((status) => {
        res.setHeader('content-type', 'text/plain');
        res.status(status).send('ok');
    });
}

export default {
    getUserOrders,
    getOrder,
    updatePayment,
    updateTrackingCode,
    confirmReceipt,
};
