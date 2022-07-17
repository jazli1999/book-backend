import { Router } from 'express';
import SubscriptionController from '../controllers/subscription.controller.js';
import Middlewares from '../middlewares.js';

const router = Router();

// Premium Features

router.put('/start/', Middlewares.checkAuthentication, SubscriptionController.createSubscription);
router.put('/update/', Middlewares.checkAuthentication, SubscriptionController.updateSubscription);
router.get('/cancel/:userId', Middlewares.checkAuthentication, SubscriptionController.cancelSubscription);
router.get('/status/:userId', Middlewares.checkAuthentication, SubscriptionController.getSubscription);
router.get('/details/:userId', Middlewares.checkAuthentication, SubscriptionController.getSubscriptionDetails);

export default router;