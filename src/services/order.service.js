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

export default {
  read,
};
