import { Router } from 'express';
import MessageController from '../controllers/message.controller.js';
import Middlewares from '../middlewares.js';


//dotenv.config();



var router = Router()
router.get('/sync', Middlewares.checkAuthentication, MessageController.getMessages);
router.post('/send', Middlewares.checkAuthentication, MessageController.sendMessages);

export default router;