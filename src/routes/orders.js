import { Router } from 'express';
import Middlewares from '../middlewares.js';
import OrderController from '../controllers/order.controller.js';

const router = Router();

router.get('/:id', Middlewares.checkAuthentication, OrderController.getOrder);
router.put('/payment/:id', Middlewares.checkAuthentication, OrderController.updatePayment);
router.put('/tracking/:id', Middlewares.checkAuthentication, OrderController.updateTrackingCode);
router.put('/receipt/:id', Middlewares.checkAuthentication, OrderController.confirmReceipt);

export default router;