import { Router } from 'express';
import Middlewares from '../middlewares.js';
import  ReviewController from '../controllers/review.controller.js';

const router = Router();

router.get('/get/:userId', Middlewares.checkAuthentication, ReviewController.getAllReviews);
//router.get('/get/:orderId', Middlewares.checkAuthentication, ReviewController.getAllReviewsByOrder);
router.post('/send', Middlewares.checkAuthentication, ReviewController.sendReview);


export default router;
