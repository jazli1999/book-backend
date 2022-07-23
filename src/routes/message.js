import { Router } from 'express';
import MessageController from '../controllers/message.controller.js';
import Middlewares from '../middlewares.js';


//dotenv.config();



var router = Router()
router.get('/get', Middlewares.checkAuthentication, MessageController.getMessages);
router.get('/get/all', Middlewares.checkAuthentication, MessageController.getAllMessagesOfCurrentUser);

router.post('/send', Middlewares.checkAuthentication, MessageController.sendMessage);

export default router;