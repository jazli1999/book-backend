import { Router } from 'express';
import BookmateController from '../controllers/bookmate.controller.js';
import Middlewares from '../middlewares.js';

const router = Router();

router.get('/', Middlewares.checkAuthentication, BookmateController.matchBookmates); // get recommendation potential bookmates list for current user
router.get('/current', Middlewares.checkAuthentication, BookmateController.currentBookmates); // get current bookmates in the friend list
router.post('/send', Middlewares.checkAuthentication, BookmateController.sendRequest);
router.post('/accept', Middlewares.checkAuthentication, BookmateController.acceptRequest);
router.post('/decline', Middlewares.checkAuthentication, BookmateController.declineRequest);

export default router;
