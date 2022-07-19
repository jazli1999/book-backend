import { Router } from 'express';
import SubscriptionController from '../controllers/subscription.controller.js';
import Middlewares from '../middlewares.js';

const router = Router();

// Premium Features

router.put('/start/:subscriptionModel', Middlewares.checkAuthentication, SubscriptionController.createSubscription);
router.put('/update/:subscriptionModel', Middlewares.checkAuthentication, SubscriptionController.updateSubscription);
router.get('/cancel/', Middlewares.checkAuthentication, SubscriptionController.cancelSubscription);
router.get('/status/', Middlewares.checkAuthentication, SubscriptionController.getSubscription);
router.get('/details/', Middlewares.checkAuthentication, SubscriptionController.getSubscriptionDetails);

export default router;
