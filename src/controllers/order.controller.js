import OrderService from "../services/order.service.js";

const getOrder = (req, res) => {
  OrderService.read(req.params.id).then((order) => {
    if (order) {
      const response = JSON.parse(JSON.stringify(order))
      response.reqId = req.userId;
      res.status(200).json(response);
    } else {
      res.status(404).send('Resource not found');
    }
  });
}

async function updatePayment(req, res) {
  const { isReq, payment } = req.body;
  OrderService.updatePayment(req.params.id, isReq, req.userId, payment).then((status) => {
    res.setHeader('content-type', 'text/plain');
    res.status(status).send('ok');
  });
}

async function updateTrackingCode(req, res) {
  const { isReq, trackingCode } = req.body;
  OrderService.updateTrackingCode(req.params.id, isReq, req.userId, trackingCode). then((status) => {
    res.setHeader('content-type', 'text/plain');
    res.status(status).send('ok');
  });
}

export default {
  getOrder,
  updatePayment,
  updateTrackingCode,
}