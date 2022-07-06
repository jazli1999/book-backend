import Order from '../models/order.model.js';

const read = async (orderId) => {
  try {
    let order = await Order.findById(orderId).exec();
    return order;
  } catch (err) {
    console.log(err);
    return null;
  }
}

const updatePayment = async (orderId, isReq, reqId, payment) => {
  const order = await Order.findById(orderId);
  if (isReq) {
    if (order.requester.userId.toString() !== reqId) return 401;
    order.requester.payment = {
      ...payment,
    };
    order.requester.status ++;
  } else {
    if (order.responder.userId.toString() !== reqId) return 401;
    order.requester.payment = {
      ...payment,
    };
    order.requester.status ++;
  }
  await order.save();
  return 200;
}

export default {
  read,
  updatePayment,
};
