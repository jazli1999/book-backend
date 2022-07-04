import OrderService from "../services/order.service.js";

const getOrder = (req, res) => {
  OrderService.read(req.params.id).then((order) => {
    if (order) {
      const response = JSON.parse(JSON.stringify(order))
      response.reqId = req.userId;
      console.log(response);
      res.status(200).json(response);
    } else {
      res.status(404).send('Resource not found');
    }
  });
}

export default {
  getOrder,
}